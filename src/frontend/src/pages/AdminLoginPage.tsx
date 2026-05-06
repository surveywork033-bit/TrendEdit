import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Lock, Mail, Sparkles } from "lucide-react";
import { useState } from "react";

export default function AdminLoginPage() {
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const ok = login(email, password);
    setLoading(false);
    if (ok) {
      navigate({ to: "/admin" });
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "oklch(0.06 0 0)" }}
      data-ocid="admin_login.page"
    >
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, oklch(0.68 0.28 264 / 0.07) 0%, transparent 70%)",
        }}
      />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
            style={{
              background: "oklch(0.68 0.28 264 / 0.15)",
              border: "1px solid oklch(0.68 0.28 264 / 0.35)",
              boxShadow: "0 0 24px oklch(0.68 0.28 264 / 0.2)",
            }}
          >
            <Sparkles
              className="w-7 h-7"
              style={{ color: "oklch(0.72 0.27 200)" }}
            />
          </div>
          <h1
            className="text-2xl font-bold font-display mb-1"
            style={{ color: "oklch(0.95 0.01 240)" }}
          >
            TrendEdit Admin
          </h1>
          <p className="text-sm" style={{ color: "oklch(0.58 0.01 260)" }}>
            Sign in to manage templates
          </p>
        </div>

        <div
          className="rounded-2xl p-8"
          style={{
            background: "oklch(0.12 0.01 265 / 0.8)",
            border: "1px solid oklch(0.25 0.01 265 / 0.6)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label
                htmlFor="email"
                className="text-sm font-medium"
                style={{ color: "oklch(0.78 0.01 260)" }}
              >
                Email Address
              </Label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: "oklch(0.52 0.01 260)" }}
                />
                <Input
                  id="email"
                  type="email"
                  data-ocid="admin_login.email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@test.com"
                  required
                  className="pl-10 text-foreground placeholder:text-muted-foreground"
                  style={{
                    background: "oklch(0.16 0.01 265)",
                    borderColor: error
                      ? "oklch(0.65 0.25 25)"
                      : "oklch(0.28 0.01 265)",
                  }}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="password"
                className="text-sm font-medium"
                style={{ color: "oklch(0.78 0.01 260)" }}
              >
                Password
              </Label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: "oklch(0.52 0.01 260)" }}
                />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  data-ocid="admin_login.password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="123456"
                  required
                  className="pl-10 pr-10 text-foreground placeholder:text-muted-foreground"
                  style={{
                    background: "oklch(0.16 0.01 265)",
                    borderColor: error
                      ? "oklch(0.65 0.25 25)"
                      : "oklch(0.28 0.01 265)",
                  }}
                />
                <button
                  type="button"
                  data-ocid="admin_login.toggle_password"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "oklch(0.52 0.01 260)" }}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div
                data-ocid="admin_login.error_state"
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm"
                style={{
                  background: "oklch(0.55 0.28 25 / 0.12)",
                  border: "1px solid oklch(0.55 0.28 25 / 0.35)",
                  color: "oklch(0.78 0.18 25)",
                }}
              >
                <span className="text-base">⚠️</span>
                {error}
              </div>
            )}

            <Button
              type="submit"
              data-ocid="admin_login.submit_button"
              disabled={loading}
              className="w-full font-semibold h-11 mt-1"
              style={{
                background: loading
                  ? "oklch(0.52 0.20 264)"
                  : "oklch(0.72 0.27 200)",
                color: "oklch(0.06 0 0)",
              }}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span
                    className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin"
                    style={{
                      borderColor: "oklch(0.06 0 0 / 0.3)",
                      borderTopColor: "oklch(0.06 0 0)",
                    }}
                  />
                  Signing in…
                </span>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </div>

        <p
          className="text-center text-xs mt-6"
          style={{ color: "oklch(0.40 0.01 260)" }}
        >
          © {new Date().getFullYear()} TrendEdit AI — Admin Portal
        </p>
      </div>
    </div>
  );
}
