import { create } from "zustand";

interface AuthStore {
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

function loadAuth(): boolean {
  try {
    return localStorage.getItem("promptvault_auth") === "true";
  } catch {
    return false;
  }
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: loadAuth(),

  login: (email, password) => {
    if (email === "admin@test.com" && password === "123456") {
      localStorage.setItem("promptvault_auth", "true");
      set({ isAuthenticated: true });
      return true;
    }
    return false;
  },

  logout: () => {
    localStorage.removeItem("promptvault_auth");
    set({ isAuthenticated: false });
  },
}));
