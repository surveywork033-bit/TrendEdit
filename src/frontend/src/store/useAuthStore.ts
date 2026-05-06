import { create } from "zustand";

const STORAGE_KEY = "admin_authenticated";
const ADMIN_EMAIL = "admin@test.com";
const ADMIN_PASSWORD = "123456";

interface AuthStore {
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>(() => ({
  isAuthenticated: localStorage.getItem(STORAGE_KEY) === "true",

  login: (email, password) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem(STORAGE_KEY, "true");
      useAuthStore.setState({ isAuthenticated: true });
      return true;
    }
    return false;
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEY);
    useAuthStore.setState({ isAuthenticated: false });
  },
}));
