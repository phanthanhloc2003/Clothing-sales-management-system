
import { post } from "@/lib/utils";
import { LoginRequest, RegisterRequest, User } from "@/types/auth";

export const authService = {
  login: (data: LoginRequest) => post<User, LoginRequest>("/auth/login", data),
  register: (data: RegisterRequest) => post<User, RegisterRequest>("/users/register", data),
};