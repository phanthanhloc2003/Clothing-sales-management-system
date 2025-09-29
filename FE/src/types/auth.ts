export interface LoginRequest {
    phone: string;
    password: string;
  }

  export interface RegisterRequest {
    phone: string;
    password: string;
    fullName: string;
  }


export interface AuthResponse {
    token: string;
    success:string;
    message:string;
    user: {
      id: string;
      email: string;
      fullName: string;
    };
  }
  