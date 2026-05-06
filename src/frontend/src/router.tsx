import { Layout } from "@/components/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import {
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const HomePage = lazy(() => import("@/pages/HomePage"));
const AdminLoginPage = lazy(() => import("@/pages/AdminLoginPage"));
const AdminPage = lazy(() => import("@/pages/AdminPage"));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div
      className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
      style={{
        borderColor: "oklch(0.68 0.28 264 / 0.3)",
        borderTopColor: "oklch(0.68 0.28 264)",
      }}
    />
  </div>
);

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </Layout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <HomePage />,
});

const adminLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin-login",
  component: () => <AdminLoginPage />,
});

const protectedRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "protected",
  component: ProtectedRoute,
});

const adminRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/admin",
  component: () => <AdminPage />,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  adminLoginRoute,
  protectedRoute.addChildren([adminRoute]),
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
