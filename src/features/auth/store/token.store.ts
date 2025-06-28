import { create } from "zustand";

interface TokenState {
  token: string | null;
  setToken: (token: string) => void;
  removeToken: () => void;
}

export const useTokenStore = create<TokenState>((set) => ({
  token: localStorage.getItem("token"),
  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token });
  },
  removeToken: () => {
    localStorage.removeItem("token");
    set({ token: null });
  },
}));
