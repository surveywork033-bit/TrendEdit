import { Link, useRouterState } from "@tanstack/react-router";
import { Sparkles, Zap } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const routerState = useRouterState();
  const isAdminRoute = routerState.location.pathname.startsWith("/admin");

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "oklch(0.06 0 0)" }}
    >
      {/* Header */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{
          background: "oklch(0.10 0.01 265 / 0.9)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderColor: "oklch(0.22 0.01 265 / 0.4)",
        }}
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 group"
            data-ocid="header.logo_link"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.68 0.28 264), oklch(0.75 0.28 280))",
              }}
            >
              <Zap className="w-4 h-4" style={{ color: "oklch(0.06 0 0)" }} />
            </div>
            <span
              className="font-display font-bold text-lg tracking-tight"
              style={{ color: "oklch(0.95 0.01 240)" }}
            >
              Trend<span style={{ color: "oklch(0.68 0.28 264)" }}>Edit</span>
              <span
                className="ml-1 text-xs font-mono"
                style={{ color: "oklch(0.75 0.28 280)" }}
              >
                AI
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            {!isAdminRoute && (
              <Link
                to="/admin"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-smooth"
                style={{
                  color: "oklch(0.75 0.28 280)",
                  border: "1px solid oklch(0.75 0.28 280 / 0.3)",
                }}
                data-ocid="header.admin_link"
              >
                <Sparkles className="w-3 h-3" />
                Admin
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer
        className="border-t py-6 text-center text-sm"
        style={{
          background: "oklch(0.09 0.01 265)",
          borderColor: "oklch(0.22 0.01 265 / 0.4)",
          color: "oklch(0.55 0.01 260)",
        }}
      >
        © {new Date().getFullYear()}. Built with love using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "oklch(0.68 0.28 264)" }}
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
