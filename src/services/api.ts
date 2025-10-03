import { AppError } from "@utils/app.error";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.URL_API,
});

api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data?.message));
    } else {
      return Promise.reject(error);
    }
  }
);

export default api;
