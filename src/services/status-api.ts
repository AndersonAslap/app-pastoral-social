import api from "@helper/api";

const getStatusApi = async () => {
    try {
        const response = await api.get("/healthcheck");
        const { data } = response.data;
        if (data && data?.status && data?.status === "ok") return true;
        return false;
    } catch (error) {
        return false;
    }
};

export { getStatusApi };