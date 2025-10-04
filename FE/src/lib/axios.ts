import axios, { AxiosError, AxiosInstance } from "axios";

const axiosClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, 
});

// Request Interceptor
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => response.data,
  async (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status;
      const data = (error.response.data as { message?: string }) || {};

      if (status === 401) {
        console.warn("Unauthorized - redirect to login");
      }

      return Promise.reject({
        status,
        message: data.message || "Something went wrong",
      });
    }
    return Promise.reject(error);
  }
);

export default axiosClient;