import { Layout } from "@/components/Layout";
import {
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const HomePage = lazy(() => import("@/pages/HomePage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const AdminPage = lazy(() => import("@/pages/AdminPage"));
const AdminLoginPage = lazy(() => import("@/pages/AdminLoginPage"));

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

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: () => <ProfilePage />,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => <AdminPage />,
});

const adminLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin-login",
  component: () => <AdminLoginPage />,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  profileRoute,
  adminRoute,
  adminLoginRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
