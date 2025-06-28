import { useCallback } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../store/auth.store";
import type { LoginInput, RegisterInput } from "../interfaces/auth.interface";

export const useAuth = () => {
  const navigate = useNavigate();
  const {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login: storeLogin,
    register: storeRegister,
    logout: storeLogout,
    clearError,
  } = useAuthStore();

  const login = useCallback(
    async (input: LoginInput) => {
      try {
        await storeLogin(input);
        navigate("/dashboard");
      } catch (error) {
        console.error("Login failed:", error);
      }
    },
    [storeLogin, navigate]
  );

  const register = useCallback(
    async (input: RegisterInput) => {
      try {
        await storeRegister(input);
        navigate("/dashboard");
      } catch (error) {
        console.error("Register failed:", error);
      }
    },
    [storeRegister, navigate]
  );

  const logout = useCallback(() => {
    storeLogout();
    navigate("/auth");
  }, [storeLogout, navigate]);

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
  };
};
