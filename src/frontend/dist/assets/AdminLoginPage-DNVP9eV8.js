import { c as createLucideIcon, u as useAuthStore, a as useNavigate, r as reactExports, j as jsxRuntimeExports, S as Sparkles } from "./index-CHi37tro.js";
import { L as Label, I as Input, B as Button } from "./label-CNghvoXP.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const EyeOff = createLucideIcon("eye-off", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Eye = createLucideIcon("eye", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" }]
];
const Mail = createLucideIcon("mail", __iconNode);
function AdminLoginPage() {
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const handleSubmit = async (e) => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen flex items-center justify-center px-4",
      style: { background: "oklch(0.06 0 0)" },
      "data-ocid": "admin_login.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "fixed inset-0 pointer-events-none",
            style: {
              background: "radial-gradient(ellipse 60% 40% at 50% 0%, oklch(0.68 0.28 264 / 0.07) 0%, transparent 70%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md relative z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4",
                style: {
                  background: "oklch(0.68 0.28 264 / 0.15)",
                  border: "1px solid oklch(0.68 0.28 264 / 0.35)",
                  boxShadow: "0 0 24px oklch(0.68 0.28 264 / 0.2)"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Sparkles,
                  {
                    className: "w-7 h-7",
                    style: { color: "oklch(0.72 0.27 200)" }
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h1",
              {
                className: "text-2xl font-bold font-display mb-1",
                style: { color: "oklch(0.95 0.01 240)" },
                children: "TrendEdit Admin"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: { color: "oklch(0.58 0.01 260)" }, children: "Sign in to manage templates" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "rounded-2xl p-8",
              style: {
                background: "oklch(0.12 0.01 265 / 0.8)",
                border: "1px solid oklch(0.25 0.01 265 / 0.6)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 24px 60px rgba(0,0,0,0.5)"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Label,
                    {
                      htmlFor: "email",
                      className: "text-sm font-medium",
                      style: { color: "oklch(0.78 0.01 260)" },
                      children: "Email Address"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Mail,
                      {
                        className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4",
                        style: { color: "oklch(0.52 0.01 260)" }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "email",
                        type: "email",
                        "data-ocid": "admin_login.email",
                        value: email,
                        onChange: (e) => setEmail(e.target.value),
                        placeholder: "admin@test.com",
                        required: true,
                        className: "pl-10 text-foreground placeholder:text-muted-foreground",
                        style: {
                          background: "oklch(0.16 0.01 265)",
                          borderColor: error ? "oklch(0.65 0.25 25)" : "oklch(0.28 0.01 265)"
                        }
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Label,
                    {
                      htmlFor: "password",
                      className: "text-sm font-medium",
                      style: { color: "oklch(0.78 0.01 260)" },
                      children: "Password"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Lock,
                      {
                        className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4",
                        style: { color: "oklch(0.52 0.01 260)" }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "password",
                        type: showPassword ? "text" : "password",
                        "data-ocid": "admin_login.password",
                        value: password,
                        onChange: (e) => setPassword(e.target.value),
                        placeholder: "123456",
                        required: true,
                        className: "pl-10 pr-10 text-foreground placeholder:text-muted-foreground",
                        style: {
                          background: "oklch(0.16 0.01 265)",
                          borderColor: error ? "oklch(0.65 0.25 25)" : "oklch(0.28 0.01 265)"
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        "data-ocid": "admin_login.toggle_password",
                        onClick: () => setShowPassword((v) => !v),
                        className: "absolute right-3 top-1/2 -translate-y-1/2",
                        style: { color: "oklch(0.52 0.01 260)" },
                        "aria-label": showPassword ? "Hide password" : "Show password",
                        children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                      }
                    )
                  ] })
                ] }),
                error && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    "data-ocid": "admin_login.error_state",
                    className: "flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm",
                    style: {
                      background: "oklch(0.55 0.28 25 / 0.12)",
                      border: "1px solid oklch(0.55 0.28 25 / 0.35)",
                      color: "oklch(0.78 0.18 25)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: "⚠️" }),
                      error
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "submit",
                    "data-ocid": "admin_login.submit_button",
                    disabled: loading,
                    className: "w-full font-semibold h-11 mt-1",
                    style: {
                      background: loading ? "oklch(0.52 0.20 264)" : "oklch(0.72 0.27 200)",
                      color: "oklch(0.06 0 0)"
                    },
                    children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "w-4 h-4 rounded-full border-2 border-t-transparent animate-spin",
                          style: {
                            borderColor: "oklch(0.06 0 0 / 0.3)",
                            borderTopColor: "oklch(0.06 0 0)"
                          }
                        }
                      ),
                      "Signing in…"
                    ] }) : "Sign In"
                  }
                )
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "p",
            {
              className: "text-center text-xs mt-6",
              style: { color: "oklch(0.40 0.01 260)" },
              children: [
                "© ",
                (/* @__PURE__ */ new Date()).getFullYear(),
                " TrendEdit AI — Admin Portal"
              ]
            }
          )
        ] })
      ]
    }
  );
}
export {
  AdminLoginPage as default
};
