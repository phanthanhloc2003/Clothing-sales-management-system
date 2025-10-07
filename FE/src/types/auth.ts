export interface LoginRequest {
  phone: string;
  password: string;
}

export interface RegisterRequest {
  phone: string;
  password: string;
  fullName: string;
}

export interface User {
  id: number;
  fullName: string;
  phone: string;
  role: "USER" | "ADMIN"; 
  status: "ACTIVE" | "INACTIVE" | "BANNED"; 
  avatar?: string | null;
  createdAt: string; 
  updatedAt: string; 
}


export interface ApiResponse<T> {
  success: boolean;
  message: string;
  status: number;
  timestamp: string;
  data?: T;
  error?: string;
}