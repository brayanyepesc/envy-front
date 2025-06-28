// DTOs (Data Transfer Objects)
export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  names: string;
  lastnames: string;
  nickname: string;
  email: string;
  city: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  message?: string;
}

export interface User {
  id: string;
  names: string;
  lastnames: string;
  nickname: string;
  email: string;
  city: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthError {
  message: string;
  code?: string;
  field?: string;
}

export interface IAuthService {
  login(input: LoginInput): Promise<AuthResponse>;
  register(input: RegisterInput): Promise<AuthResponse>;
  logout(): Promise<void>;
  refreshToken(): Promise<AuthResponse>;
  validateToken(token: string): Promise<boolean>;
}

export interface IAuthRepository {
  login(input: LoginInput): Promise<AuthResponse>;
  register(input: RegisterInput): Promise<AuthResponse>;
  refreshToken(token: string): Promise<AuthResponse>;
  validateToken(token: string): Promise<boolean>;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: AuthError | null;
}

export interface AuthActions {
  login: (input: LoginInput) => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}
