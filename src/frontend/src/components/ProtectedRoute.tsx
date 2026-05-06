import { useAuthStore } from "@/store/useAuthStore";
import { Navigate, Outlet } from "@tanstack/react-router";

export function ProtectedRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/admin-login" />;
  }
  return <Outlet />;
}
