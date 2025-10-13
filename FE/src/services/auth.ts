
import { get, post } from "@/lib/utils";
import {  LoginRequest, RegisterRequest, LoginResponse, User, ApiResponse } from "@/types/auth";

export const authService = {
  login: (data: LoginRequest) => post<LoginResponse, LoginRequest>("/auth/login", data),
  register: (data: RegisterRequest) => post<User, RegisterRequest>("/users/register", data),
  getCurrentUser: () => get<User>("/auth/me"),
  getRefreshToken: () => get<LoginResponse>("/auth/refresh"),
};