import { api } from "../../../api/axios.api";
import type { 
  IAuthRepository, 
  LoginInput, 
  RegisterInput, 
  AuthResponse 
} from "../interfaces/auth.interface";

export class AuthRepository implements IAuthRepository {
  private readonly baseUrl = "/auth";

  private cleanRegisterData(input: RegisterInput) {
    return {
      names: input.names,
      lastnames: input.lastnames,
      nickname: input.nickname,
      email: input.email,
      city: input.city,
      password: input.password,
    };
  }

  async login(input: LoginInput): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>(`${this.baseUrl}/login`, input);
      return response.data;
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  async register(input: RegisterInput): Promise<AuthResponse> {
    try {
      const registerData = this.cleanRegisterData(input);
      const response = await api.post<AuthResponse>(`${this.baseUrl}/register`, registerData);
      return response.data;
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  async refreshToken(token: string): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>(`${this.baseUrl}/refresh`, { token });
      return response.data;
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  async validateToken(token: string): Promise<boolean> {
    try {
      await api.get(`${this.baseUrl}/validate`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return true;
    } catch {
      return false;
    }
  }

  private handleApiError(error: unknown): Error {
    if (error && typeof error === 'object' && 'response' in error) {
      const apiError = error as { response?: { data?: { message?: string } } };
      if (apiError.response?.data?.message) {
        return new Error(apiError.response.data.message);
      }
    }
    if (error instanceof Error) {
      return new Error(error.message);
    }
    return new Error("Error de conexión");
  }
} 