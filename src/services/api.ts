import { storageAuthTokenGetRefreshToken, storageAuthTokenSave } from "@storage/storageAuthToken";
import { AppError } from "@utils/app.error";
import axios, { AxiosInstance, AxiosError } from "axios";

type SignOut = () => void;

type PromiseType = {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
}

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void;
};

const api = axios.create({
  baseURL: "http://192.168.0.107:5000",
}) as APIInstanceProps;

let failedQueue: PromiseType[] = [];
let isRefreshing = false;

api.registerInterceptTokenManager = (signOut) => {
  const interceptTokenManager = api.interceptors.response.use(
    (response) => response,

    async (requestError) => {

      console.log(`Request error: ${JSON.stringify(requestError, null, 2)}`);

      if (requestError?.response?.status === 401) {
        if (requestError.response.data?.message === "token.expired" 
          || requestError.response.data?.message === "token.invalid"
          || requestError.response.data?.message === "Não Autorizado"
        ) {
          const refreshToken = await storageAuthTokenGetRefreshToken();

          if (!refreshToken) {
            signOut();
            return Promise.reject(requestError);
          }

          const originalRequestConfig = requestError.config;

          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueue.push({
                onSuccess: (token: string) => { 
                  if (originalRequestConfig.headers) {
                    originalRequestConfig.headers['Authorization'] = `Bearer ${token}`;
                    resolve(api(originalRequestConfig));
                  }
                },
                onFailure: (error: AxiosError) => { 
                  reject(error); 
                }
              });
            });
          }

          isRefreshing = true;
          
          return new Promise(async (resolve, reject) => {
            try {
              const response = await api.post("/security/refresh/token", { refreshToken });
              const { data } = response.data;
              await storageAuthTokenSave(data);
              if (originalRequestConfig.data) {
                originalRequestConfig.data = JSON.parse(originalRequestConfig.data);
              }
              if (originalRequestConfig.headers) {
                originalRequestConfig.headers['Authorization'] = `Bearer ${data.accessToken}`;
              }
              api.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`; 
              failedQueue.forEach(request => request.onSuccess(data.accessToken));
              resolve(api(originalRequestConfig));
            }
            catch (error) {
              failedQueue.forEach(request => request.onFailure(error as AxiosError));
              signOut();
              reject(error);
            }
            finally {
              isRefreshing = false;
              failedQueue = [];
            }
          });
        }

        signOut();
      }

      if (requestError.response && requestError.response.data) {
        return Promise.reject(new AppError(requestError.response.data?.message));
      } else {
        return Promise.reject(requestError);
      }
    }
  );

  return () => {
    api.interceptors.response.eject(interceptTokenManager);
  }
}

export default api;
