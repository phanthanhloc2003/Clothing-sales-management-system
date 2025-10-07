import { AxiosError } from "axios";
import apiClient from "./axios";
import { ApiResponse } from "@/types/auth";


const handleApiError = <T>(error: unknown): ApiResponse<T> => {
  const err = error as AxiosError<ApiResponse<T>>;
  if (err.response?.data) {
    return err.response.data;
  }
  
  return {
    success: false,
    message: "Network error or server unavailable",
    status: err.response?.status || 500,
    timestamp: new Date().toISOString(),
    error: err.message
  };
};

export const post = async <T, D>(url: string, data: D): Promise<ApiResponse<T>> => {
  try {
    const res = await apiClient.post(url, data) as ApiResponse<T>;
    return res;
  } catch (error) {
    return handleApiError<T>(error);
  }
};

export const get = async <T>(url: string): Promise<ApiResponse<T>> => {
  try {
    const res = await apiClient.get(url) as ApiResponse<T>;
    return res;
  } catch (error) {
    return handleApiError<T>(error);
  }
};

export const put = async <T, D>(url: string, data: D): Promise<ApiResponse<T>> => {
  try {
    const res = await apiClient.put(url, data) as ApiResponse<T>;
    return res;
  } catch (error) {
    return handleApiError<T>(error);
  }
};

export const del = async <T>(url: string): Promise<ApiResponse<T>> => {
  try {
    const res = await apiClient.delete(url) as ApiResponse<T>;
    return res;
  } catch (error) {
    return handleApiError<T>(error);
  }
};