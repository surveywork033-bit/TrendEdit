import { useRouter } from "@tanstack/react-router";
import { useState } from "react";

const ADMIN_EMAIL = "admin@test.com";
const ADMIN_PASSWORD = "123456";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem("promptvault_admin", "true");
      router.navigate({ to: "/admin" });
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "oklch(0.06 0 0)" }}
      data-ocid="admin-login.page"
    >
      <div
        className="w-full max-w-sm rounded-2xl p-8"
        style={{
          background: "oklch(0.1 0.01 265 / 0.95)",
          border: "1px solid oklch(0.22 0.02 265 / 0.35)",
          boxShadow: "0 0 40px oklch(0.75 0.28 280 / 0.15)",
        }}
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <span className="font-display text-2xl font-bold gradient-text-purple">
            PromptVault
          </span>
          <p className="text-sm text-muted-foreground mt-1 font-body">
            Admin Access
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="admin-email"
              className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider"
            >
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-glass w-full rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50"
              placeholder="admin@test.com"
              required
              data-ocid="admin-login.email_input"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="admin-password"
              className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider"
            >
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-glass w-full rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50"
              placeholder="••••••"
              required
              data-ocid="admin-login.password_input"
            />
          </div>

          {error && (
            <p
              className="text-xs font-medium rounded-lg px-3 py-2"
              style={{
                color: "oklch(0.75 0.22 25)",
                background: "oklch(0.55 0.22 25 / 0.12)",
                border: "1px solid oklch(0.55 0.22 25 / 0.25)",
              }}
              data-ocid="admin-login.error_state"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-display font-semibold text-sm mt-2"
            style={{
              background: "oklch(0.72 0.26 264)",
              color: "oklch(0.06 0 0)",
              boxShadow: "0 0 24px oklch(0.72 0.26 264 / 0.5)",
            }}
            data-ocid="admin-login.submit_button"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
