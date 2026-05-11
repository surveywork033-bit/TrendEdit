import { r as reactExports, b as useRouter, j as jsxRuntimeExports } from "./index-CuhmJBMl.js";
const ADMIN_EMAIL = "admin@test.com";
const ADMIN_PASSWORD = "123456";
function AdminLoginPage() {
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [error, setError] = reactExports.useState("");
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem("promptvault_admin", "true");
      router.navigate({ to: "/admin" });
    } else {
      setError("Invalid email or password");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-screen flex items-center justify-center p-4",
      style: { background: "oklch(0.06 0 0)" },
      "data-ocid": "admin-login.page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "w-full max-w-sm rounded-2xl p-8",
          style: {
            background: "oklch(0.1 0.01 265 / 0.95)",
            border: "1px solid oklch(0.22 0.02 265 / 0.35)",
            boxShadow: "0 0 40px oklch(0.75 0.28 280 / 0.15)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl font-bold gradient-text-purple", children: "PromptVault" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 font-body", children: "Admin Access" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "admin-email",
                    className: "block text-xs font-semibold text-muted-foreground uppercase tracking-wider",
                    children: "Email"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "admin-email",
                    type: "email",
                    value: email,
                    onChange: (e) => setEmail(e.target.value),
                    className: "input-glass w-full rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50",
                    placeholder: "admin@test.com",
                    required: true,
                    "data-ocid": "admin-login.email_input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "admin-password",
                    className: "block text-xs font-semibold text-muted-foreground uppercase tracking-wider",
                    children: "Password"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "admin-password",
                    type: "password",
                    value: password,
                    onChange: (e) => setPassword(e.target.value),
                    className: "input-glass w-full rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50",
                    placeholder: "••••••",
                    required: true,
                    "data-ocid": "admin-login.password_input"
                  }
                )
              ] }),
              error && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs font-medium rounded-lg px-3 py-2",
                  style: {
                    color: "oklch(0.75 0.22 25)",
                    background: "oklch(0.55 0.22 25 / 0.12)",
                    border: "1px solid oklch(0.55 0.22 25 / 0.25)"
                  },
                  "data-ocid": "admin-login.error_state",
                  children: error
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "submit",
                  className: "w-full py-3 rounded-xl font-display font-semibold text-sm mt-2",
                  style: {
                    background: "oklch(0.72 0.26 264)",
                    color: "oklch(0.06 0 0)",
                    boxShadow: "0 0 24px oklch(0.72 0.26 264 / 0.5)"
                  },
                  "data-ocid": "admin-login.submit_button",
                  children: "Sign In"
                }
              )
            ] })
          ]
        }
      )
    }
  );
}
export {
  AdminLoginPage as default
};
