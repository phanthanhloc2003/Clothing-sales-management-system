import { AxiosResponse } from "axios";
import apiClient from "./axios";

// GET
export const get = async <T>(url: string): Promise<T> => {
  const res: AxiosResponse<T> = await apiClient.get<T>(url);
  return res.data;
};

// POST
export const post = async <T, D>(url: string, data: D): Promise<T> => {
  const res: AxiosResponse<T> = await apiClient.post<T>(url, data);
  return res.data;
};

// PUT
export const put = async <T, D>(url: string, data: D): Promise<T> => {
  const res: AxiosResponse<T> = await apiClient.put<T>(url, data);
  return res.data;
};

// DELETE
export const del = async <T>(url: string): Promise<T> => {
  const res: AxiosResponse<T> = await apiClient.delete<T>(url);
  return res.data;
};