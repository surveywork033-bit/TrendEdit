import { useAuthStore } from "@/store/useAuthStore";
import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Settings, User } from "lucide-react";
import { Toaster } from "sonner";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isAdminPage = pathname === "/admin" || pathname === "/admin-login";

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "oklch(0.06 0 0)" }}
    >
      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Caffeine attribution */}
      <div className="pb-20 flex justify-center py-4">
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] text-muted-foreground/50 hover:text-muted-foreground/80 transition-colors duration-200"
        >
          Built with love using caffeine.ai
        </a>
      </div>

      {/* Admin shortcut — top right floating, hidden on admin pages */}
      {!isAdminPage && (
        <div className="fixed top-4 right-4 z-40">
          <Link
            to={isAuthenticated ? "/admin" : "/admin-login"}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold font-display transition-smooth"
            style={{
              background: "oklch(0.12 0.01 265 / 0.7)",
              border: "1px solid oklch(0.28 0.02 265 / 0.3)",
              color: "oklch(0.60 0.02 260)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
            data-ocid="nav.admin_link"
          >
            <Settings size={12} />
            Admin
          </Link>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav
        className="fixed bottom-0 inset-x-0 z-50 flex items-center justify-around px-8 py-2"
        style={{
          background: "oklch(0.09 0.015 265 / 0.92)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderTop: "1px solid oklch(0.22 0.01 265 / 0.4)",
          boxShadow: "0 -8px 32px oklch(0.04 0 0 / 0.6)",
        }}
        data-ocid="nav.bottom"
      >
        <NavItem
          to="/"
          label="Home"
          icon={<Home className="w-5 h-5" />}
          active={pathname === "/"}
          dataOcid="nav.home_link"
        />
        <NavItem
          to="/profile"
          label="Profile"
          icon={<User className="w-5 h-5" />}
          active={pathname === "/profile"}
          dataOcid="nav.profile_link"
        />
      </nav>

      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "oklch(0.12 0.015 265)",
            border: "1px solid oklch(0.28 0.02 265 / 0.4)",
            color: "oklch(0.92 0.01 240)",
          },
        }}
      />
    </div>
  );
}

function NavItem({
  to,
  label,
  icon,
  active,
  dataOcid,
}: {
  to: string;
  label: string;
  icon: React.ReactNode;
  active: boolean;
  dataOcid: string;
}) {
  return (
    <Link
      to={to}
      className="flex flex-col items-center gap-1 min-w-[60px] py-1.5 px-4 rounded-xl transition-smooth"
      style={{
        color: active ? "oklch(0.75 0.28 280)" : "oklch(0.50 0.01 260)",
        background: active ? "oklch(0.75 0.28 280 / 0.10)" : "transparent",
        boxShadow: active ? "0 0 16px oklch(0.75 0.28 280 / 0.15)" : "none",
      }}
      data-ocid={dataOcid}
    >
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </Link>
  );
}
