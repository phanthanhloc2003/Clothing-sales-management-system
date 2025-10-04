
import { post } from "@/lib/utils";
import { AuthResponse, LoginRequest, RegisterRequest } from "@/types/auth";

export const authService = {
  login: (data: LoginRequest) => post<AuthResponse, LoginRequest>("/auth/login", data),
  register: (data: RegisterRequest) => post<AuthResponse, RegisterRequest>("/users/register", data),
};