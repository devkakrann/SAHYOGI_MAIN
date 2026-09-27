import { y as __toESM } from "./createServerFn-CIHAFgYl.mjs";
import { _ as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { M as Building2, T as HandHeart, n as Users } from "../_libs/lucide-react.mjs";
import { D as setMode, P as useStore, S as loginAs, i as Field, n as DEMO_ACCOUNTS, r as DEMO_PASSWORD, t as Card, u as Page, x as login } from "./sahyogi-DVucO51_.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-D-Bgx1os.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ICON = {
	ngo: Building2,
	volunteer: Users,
	user: HandHeart
};
function LoginPage() {
	const [phone, setPhone] = (0, import_react.useState)("");
	const [pw, setPw] = (0, import_react.useState)("");
	const nav = useNavigate();
	const mode = useStore((s) => s.mode);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		className: "grid max-w-5xl gap-6 md:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-semibold",
					children: "Welcome back"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Log in with your phone number."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-6 space-y-4",
					onSubmit: (e) => {
						e.preventDefault();
						try {
							login(phone, pw);
							toast.success("Logged in");
							nav({ to: "/dashboard" });
						} catch (err) {
							toast.error(err.message);
						}
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Phone",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "inp",
								value: phone,
								onChange: (e) => setPhone(e.target.value),
								placeholder: "10-digit mobile",
								required: true
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Password",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "inp",
								type: "password",
								value: pw,
								onChange: (e) => setPw(e.target.value),
								required: true
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "w-full rounded-full bg-primary py-3 font-bold text-primary-foreground",
							children: "Log in"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-sm text-muted-foreground",
					children: ["New here? ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/signup",
						className: "font-semibold text-primary",
						children: "Create an account"
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "bg-secondary p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-semibold",
					children: "Demo quick login"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: ["For judges: jump straight into any role with pre-seeded data. Password for all demo accounts: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
						className: "font-bold",
						children: DEMO_PASSWORD
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 space-y-3",
					children: DEMO_ACCOUNTS.map((a) => {
						const I = ICON[a.role];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => {
								if (mode !== "demo") setMode("demo");
								loginAs(a.id);
								toast.success(`Signed in as ${a.label}`);
								nav({ to: "/dashboard" });
							},
							className: "flex w-full items-center gap-3 rounded-xl border bg-card p-4 text-left hover:border-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(I, { className: "size-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block font-semibold",
								children: a.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: a.phone
							})] })]
						}, a.id);
					})
				})
			]
		})]
	});
}
//#endregion
export { LoginPage as component };
