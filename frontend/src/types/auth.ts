export interface LoginRequest {
    email: string;
    password: string;
  }
  
  export interface SignupRequest {
    username: string;
    email: string;
    password: string;
  }
  
  export interface AuthResponse {
    token: string; // JWT Token
  }
  