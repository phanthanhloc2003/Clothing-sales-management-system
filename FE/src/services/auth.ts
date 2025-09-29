
import { post } from "@/lib/utils";
import { AuthResponse, LoginRequest } from "@/types/auth";

export const authService = {
  login: (data: LoginRequest) => post<AuthResponse, LoginRequest>("/auth/login", data),
  register: (data: LoginRequest) => post<AuthResponse, LoginRequest>("/auth/register", data),
};