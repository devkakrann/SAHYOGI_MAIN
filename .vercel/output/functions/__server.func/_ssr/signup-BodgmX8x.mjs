import { y as __toESM } from "./createServerFn-CIHAFgYl.mjs";
import { _ as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { M as Building2, T as HandHeart, n as Users } from "../_libs/lucide-react.mjs";
import { F as verifyOtp, T as resendOtp, i as Field, k as startSignup, o as NEED_META, s as NEED_TYPES, t as Card, u as Page, y as cn } from "./sahyogi-DVucO51_.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as findArea, t as AREAS } from "./areas-TZDsUsck.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/signup-BodgmX8x.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ROLES = [
	{
		r: "user",
		label: "Need help",
		I: HandHeart
	},
	{
		r: "volunteer",
		label: "Volunteer",
		I: Users
	},
	{
		r: "ngo",
		label: "NGO",
		I: Building2
	}
];
function SignupPage() {
	const nav = useNavigate();
	const [role, setRole] = (0, import_react.useState)("user");
	const [f, setF] = (0, import_react.useState)({
		name: "",
		phone: "",
		password: "",
		area: "",
		people: 1,
		skills: "",
		inviteCode: "",
		orgName: "",
		regNo: ""
	});
	const [domains, setDomains] = (0, import_react.useState)(["food"]);
	const [otp, setOtp] = (0, import_react.useState)(null);
	const set = (k) => (e) => setF({
		...f,
		[k]: k === "people" ? Number(e.target.value) : e.target.value
	});
	if (otp) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OtpStep, {
		otp,
		setOtp,
		onDone: () => {
			toast.success("Account verified!");
			nav({ to: "/dashboard" });
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {
		className: "max-w-2xl",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-semibold",
					children: "Create your Sahyogi account"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 grid grid-cols-3 gap-2",
					children: ROLES.map(({ r, label, I }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setRole(r),
						className: cn("rounded-xl border p-3 text-sm font-semibold", role === r ? "border-primary bg-primary/10 text-primary" : "hover:bg-secondary"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(I, { className: "mx-auto mb-1 size-5" }), label]
					}, r))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-6 grid gap-4 sm:grid-cols-2",
					onSubmit: async (e) => {
						e.preventDefault();
						const a = findArea(f.area) ?? AREAS[0];
						try {
							const res = await startSignup({
								role,
								name: f.name,
								phone: f.phone,
								password: f.password,
								area: f.area || a.name,
								lat: a.lat,
								lng: a.lng,
								people: f.people,
								skills: f.skills.split(",").map((s) => s.trim()).filter(Boolean),
								inviteCode: f.inviteCode,
								orgName: f.orgName,
								regNo: f.regNo,
								domains
							});
							setOtp(res);
						} catch (err) {
							toast.error(err.message);
						}
					},
					children: [
						role === "ngo" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Organization name",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "inp",
								required: true,
								value: f.orgName,
								onChange: set("orgName")
							})
						}),
						role === "ngo" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Registration number",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "inp",
								value: f.regNo,
								onChange: set("regNo")
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: role === "ngo" ? "Contact person" : "Full name",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "inp",
								required: true,
								value: f.name,
								onChange: set("name")
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Phone",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "inp",
								required: true,
								inputMode: "tel",
								value: f.phone,
								onChange: set("phone"),
								placeholder: "10-digit mobile"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Password",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "inp",
								required: true,
								type: "password",
								minLength: 6,
								value: f.password,
								onChange: set("password")
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
							label: "Area / city",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "inp",
								required: true,
								list: "areas",
								value: f.area,
								onChange: set("area"),
								placeholder: "e.g. Saket or 110017"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("datalist", {
								id: "areas",
								children: AREAS.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: a.name }, a.pincode))
							})]
						}),
						role === "user" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Number of people",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "inp",
								type: "number",
								min: 1,
								value: f.people,
								onChange: set("people")
							})
						}),
						role === "volunteer" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Skills",
							hint: "Comma separated",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "inp",
								value: f.skills,
								onChange: set("skills"),
								placeholder: "First aid, Driving"
							})
						}),
						role === "volunteer" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "NGO invite code (optional)",
							hint: "Links you to your NGO so they can assign you missions.",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "inp font-mono uppercase",
								value: f.inviteCode,
								onChange: set("inviteCode"),
								placeholder: "SEVA2026"
							})
						}),
						role === "ngo" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "sm:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-2 block text-sm font-semibold",
								children: "Services you provide"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2",
								children: NEED_TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setDomains(domains.includes(t) ? domains.filter((d) => d !== t) : [...domains, t]),
									className: cn("rounded-full border px-3 py-1 text-sm", domains.includes(t) ? "border-primary bg-primary text-primary-foreground" : ""),
									children: NEED_META[t].label
								}, t))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "rounded-full bg-primary py-3 font-bold text-primary-foreground sm:col-span-2",
							children: "Send OTP"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-sm text-muted-foreground",
					children: ["Already have an account? ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						className: "font-semibold text-primary",
						children: "Log in"
					})]
				})
			]
		})
	});
}
function OtpStep({ otp, setOtp, onDone }) {
	const [d, setD] = (0, import_react.useState)([
		"",
		"",
		"",
		""
	]);
	const refs = (0, import_react.useRef)([]);
	const [left, setLeft] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const t = setInterval(() => setLeft(Math.max(0, Math.round((otp.expiresAt - Date.now()) / 1e3))), 500);
		refs.current[0]?.focus();
		return () => clearInterval(t);
	}, [otp.expiresAt]);
	const submit = async () => {
		try {
			await verifyOtp(otp.phone, d.join(""));
			onDone();
		} catch (e) {
			toast.error(e.message);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {
		className: "max-w-md",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "p-8 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-semibold",
					children: "Verify your phone"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: ["Enter the 4-digit code sent to +91 ", otp.phone]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 rounded-xl border border-dashed border-accent bg-accent/10 p-3 text-sm",
					children: ["Demo mode — SMS simulated. Your code is ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
						className: "font-mono text-lg tracking-widest",
						children: otp.devOtp
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 flex justify-center gap-3",
					children: d.map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: (el) => {
							refs.current[i] = el;
						},
						value: v,
						inputMode: "numeric",
						maxLength: 1,
						"aria-label": `Digit ${i + 1}`,
						className: "size-14 rounded-xl border-2 bg-background text-center font-mono text-2xl font-bold outline-none focus:border-primary",
						onChange: (e) => {
							const c = e.target.value.replace(/\D/g, "").slice(-1);
							const n = [...d];
							n[i] = c;
							setD(n);
							if (c && i < 3) refs.current[i + 1]?.focus();
						},
						onKeyDown: (e) => {
							if (e.key === "Backspace" && !d[i] && i > 0) refs.current[i - 1]?.focus();
							if (e.key === "Enter") submit();
						},
						onPaste: (e) => {
							const p = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
							if (p.length === 4) {
								e.preventDefault();
								setD(p.split(""));
							}
						}
					}, i))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-xs text-muted-foreground",
					children: left > 0 ? `Code expires in ${Math.floor(left / 60)}:${String(left % 60).padStart(2, "0")}` : "Code expired"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: submit,
					disabled: d.join("").length < 4,
					className: "mt-6 w-full rounded-full bg-primary py-3 font-bold text-primary-foreground disabled:opacity-50",
					children: "Verify"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => {
						try {
							setOtp(resendOtp(otp.phone));
							setD([
								"",
								"",
								"",
								""
							]);
							toast.success("New code sent");
						} catch (e) {
							toast.error(e.message);
						}
					},
					className: "mt-3 text-sm font-semibold text-primary",
					children: "Resend OTP"
				})
			]
		})
	});
}
//#endregion
export { SignupPage as component };
