import { create } from "zustand";
import { AuthService } from "../services/auth.service";
import type { 
  AuthState, 
  AuthActions, 
  LoginInput, 
  RegisterInput, 
  AuthError 
} from "../interfaces/auth.interface";

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  isLoading: false,
  error: null,
  login: async (input: LoginInput) => {
    const authService = new AuthService();
    set({ isLoading: true, error: null });
    try {
      const response = await authService.login(input);
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      set({
        token: response.token,
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const authError: AuthError = {
        message: error instanceof Error ? error.message : "Error de autenticación",
        code: "LOGIN_ERROR",
      };
      
      set({
        isLoading: false,
        error: authError,
      });
      
      throw error;
    }
  },
  register: async (input: RegisterInput) => {
    const authService = new AuthService();
    
    set({ isLoading: true, error: null });
    
    try {
      const response = await authService.register(input);
      
      // Store token and user data
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      
      set({
        token: response.token,
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const authError: AuthError = {
        message: error instanceof Error ? error.message : "Error de registro",
        code: "REGISTER_ERROR",
      };
      
      set({
        isLoading: false,
        error: authError,
      });
      
      throw error;
    }
  },
  logout: () => {
    const authService = new AuthService();
    authService.logout();
    
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  },
  clearError: () => {
    set({ error: null });
  },
  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },
})); 