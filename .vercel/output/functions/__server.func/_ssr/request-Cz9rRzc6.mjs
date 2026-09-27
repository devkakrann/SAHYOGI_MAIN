import { y as __toESM } from "./createServerFn-CIHAFgYl.mjs";
import { _ as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { A as Check, D as Crosshair, N as Brain, _ as MicOff, g as Mic, u as Radar, x as LoaderCircle } from "../_libs/lucide-react.mjs";
import { A as submitRequest, C as matchNgos, M as triage, N as useSession, P as useStore, i as Field, l as NeedIcon, m as UrgencyBadge, o as NEED_META, s as NEED_TYPES, t as Card, u as Page, y as cn } from "./sahyogi-DVucO51_.mjs";
import { t as MapView } from "./MapView-BEz3IXBN.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as findArea, t as AREAS } from "./areas-TZDsUsck.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/request-Cz9rRzc6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STEPS = [
	"Choose need",
	"Situation",
	"Contact",
	"AI review"
];
function RequestPage() {
	const user = useSession();
	const db = useStore((s) => s.db);
	const nav = useNavigate();
	const [step, setStep] = (0, import_react.useState)(0);
	const [need, setNeed] = (0, import_react.useState)(null);
	const [desc, setDesc] = (0, import_react.useState)("");
	const [c, setC] = (0, import_react.useState)({
		name: "",
		phone: "",
		area: "",
		pincode: "",
		people: 1
	});
	const [pos, setPos] = (0, import_react.useState)(null);
	const [t, setT] = (0, import_react.useState)(null);
	const [listening, setListening] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (user && !c.name) setC((p) => ({
			...p,
			name: user.name,
			phone: user.phone,
			area: user.area,
			people: user.people ?? 1
		}));
	}, [user]);
	const resolveArea = (v) => {
		const a = findArea(v);
		if (a) {
			setPos({
				lat: a.lat,
				lng: a.lng
			});
			setC((p) => ({
				...p,
				pincode: p.pincode || a.pincode
			}));
		}
	};
	const speak = () => {
		const W = window;
		const SR = W.SpeechRecognition ?? W.webkitSpeechRecognition;
		if (!SR) {
			toast.error("Speech input isn't supported in this browser.");
			return;
		}
		const r = new SR();
		r.lang = "en-IN";
		r.interimResults = false;
		r.onresult = (e) => setDesc((d) => (d ? d + " " : "") + e.results[0][0].transcript);
		r.onend = () => setListening(false);
		setListening(true);
		r.start();
	};
	const runTriage = () => {
		if (!pos) {
			const a = findArea(c.pincode) ?? findArea(c.area);
			if (a) setPos({
				lat: a.lat,
				lng: a.lng
			});
			else {
				toast.error("Pick your location on the map or choose a known area.");
				return;
			}
		}
		setT(null);
		setStep(3);
		setTimeout(() => setT(triage(need, desc, c.people)), 1400);
	};
	const matches = need && pos ? matchNgos(db, {
		...pos,
		needType: need
	}) : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		className: "max-w-4xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-4xl font-semibold",
				children: "Request help"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-muted-foreground",
				children: "Your request is triaged instantly and routed to the nearest NGO offering this service."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-8 grid grid-cols-4 gap-2",
				children: STEPS.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "text-xs font-semibold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("h-1.5 rounded-full", i <= step ? "bg-primary" : "bg-muted") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: cn("mt-2 block", i === step ? "text-foreground" : "text-muted-foreground"),
						children: [
							i + 1,
							". ",
							s
						]
					})]
				}, s))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "mt-6 p-6 md:p-8",
				children: [
					step === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl font-semibold",
							children: "What do you need?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5 grid grid-cols-2 gap-3 md:grid-cols-4",
							children: NEED_TYPES.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setNeed(n),
								className: cn("rounded-2xl border p-5 text-left transition", need === n ? "border-primary bg-primary/10" : "hover:border-primary/50"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NeedIcon, {
									type: n,
									className: "size-7 text-primary"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 font-bold",
									children: NEED_META[n].label
								})]
							}, n))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {
							next: () => setStep(1),
							disabled: !need
						})
					] }),
					step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl font-semibold",
							children: "Describe the situation"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Mention who is affected, injuries, children or elderly, and how long you've waited. Priority is decided by AI from your description."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative mt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								className: "inp min-h-40",
								value: desc,
								onChange: (e) => setDesc(e.target.value),
								placeholder: "e.g. Water entered our home, elderly mother has fever, no drinking water since yesterday…"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: speak,
								"aria-label": "Speak",
								className: cn("absolute bottom-3 right-3 rounded-full p-2.5", listening ? "bg-critical text-primary-foreground" : "bg-secondary"),
								children: listening ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MicOff, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-4" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {
							back: () => setStep(0),
							next: () => setStep(2),
							disabled: desc.trim().length < 10
						})
					] }),
					step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl font-semibold",
							children: "Contact & location"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 grid gap-4 md:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Name",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "inp",
										value: c.name,
										onChange: (e) => setC({
											...c,
											name: e.target.value
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Phone",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "inp",
										value: c.phone,
										onChange: (e) => setC({
											...c,
											phone: e.target.value
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
									label: "Area / locality",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "inp",
										list: "areas-r",
										value: c.area,
										onChange: (e) => {
											setC({
												...c,
												area: e.target.value
											});
											resolveArea(e.target.value);
										}
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("datalist", {
										id: "areas-r",
										children: AREAS.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: a.name }, a.pincode))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Pincode",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "inp",
										value: c.pincode,
										onChange: (e) => {
											setC({
												...c,
												pincode: e.target.value
											});
											resolveArea(e.target.value);
										}
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Number of people",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "inp",
										type: "number",
										min: 1,
										value: c.people,
										onChange: (e) => setC({
											...c,
											people: Math.max(1, Number(e.target.value))
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-end",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										className: "inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold hover:bg-secondary",
										onClick: () => navigator.geolocation?.getCurrentPosition((p) => setPos({
											lat: p.coords.latitude,
											lng: p.coords.longitude
										}), () => toast.error("Couldn't get your location")),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crosshair, { className: "size-4" }), " Use my location"]
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 text-xs text-muted-foreground",
							children: ["Tap the map to set your exact location. ", pos && `(${pos.lat.toFixed(4)}, ${pos.lng.toFixed(4)})`]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapView, {
								requests: [],
								ngos: db.users.filter((u) => u.role === "ngo"),
								height: 280,
								zoom: pos ? 13 : 11,
								pick: pos,
								onPick: setPos
							}, pos ? "p" : "n")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {
							back: () => setStep(1),
							next: runTriage,
							nextLabel: "Run AI triage",
							disabled: !c.name || c.phone.replace(/\D/g, "").length < 10 || !c.area
						})
					] }),
					step === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: !t ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "py-16 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brain, { className: "mx-auto size-10 animate-pulse text-primary" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-lg font-semibold",
								children: "AI triage in progress…"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "Analyzing need, keywords and emergency indicators"
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-2xl font-semibold",
								children: "AI priority assessment"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UrgencyBadge, { u: t.urgencyLevel })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 grid gap-3 sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									k: "Category",
									v: NEED_META[need].label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									k: "Priority score",
									v: `${t.aiScore}/100`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									k: "Confidence",
									v: `${Math.round(t.confidenceScore * 100)}%`
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 rounded-xl bg-secondary p-4 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Summary:" }),
								" ",
								t.aiSummary,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Recommended action:" }),
								" ",
								t.aiAction
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex items-start gap-3 rounded-xl border p-4 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, { className: "mt-0.5 size-5 shrink-0 text-accent" }), matches.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Nearby responders identified: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: matches.slice(0, 3).map((m) => `${m.n.orgName} (${m.d.toFixed(1)} km)`).join(", ") })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"No NGO offering ",
								need,
								" within coverage yet — your request will be broadcast to all NGOs as pending."
							] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 text-sm text-muted-foreground",
							children: [
								c.name,
								" · ",
								c.phone,
								" · ",
								c.area,
								" ",
								c.pincode,
								" · ",
								c.people,
								" people"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {
							back: () => setStep(2),
							nextLabel: "Submit request",
							next: () => {
								const id = submitRequest({
									needType: need,
									description: desc,
									...c,
									lat: pos.lat,
									lng: pos.lng
								}, t);
								toast.success("Request submitted — help is being coordinated.");
								if (user) nav({ to: "/dashboard" });
								else {
									setStep(4);
									setDone(id);
								}
							}
						})
					] }) }),
					step === 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "py-10 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mx-auto size-12 rounded-full bg-success/15 p-2 text-success" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-4 text-2xl font-semibold",
								children: "Request submitted"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-muted-foreground",
								children: [
									"Reference: ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: doneId }),
									". Create an account with the same phone to track progress."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 flex justify-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/map",
									className: "rounded-full border px-5 py-2.5 font-semibold",
									children: "See live map"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/signup",
									className: "rounded-full bg-primary px-5 py-2.5 font-bold text-primary-foreground",
									children: "Create account"
								})]
							})
						]
					})
				]
			})
		]
	});
}
var doneId = "";
function setDone(id) {
	doneId = id;
}
function Stat({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-xs text-muted-foreground",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-display text-2xl font-semibold",
			children: v
		})]
	});
}
function Nav({ back, next, disabled, nextLabel = "Continue" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-8 flex justify-between",
		children: [back ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: back,
			className: "rounded-full border px-5 py-2.5 font-semibold",
			children: "Back"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: next,
			disabled,
			className: "inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 font-bold text-primary-foreground disabled:opacity-40",
			children: [nextLabel === "Run AI triage" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "hidden size-4" }), nextLabel]
		})]
	});
}
//#endregion
export { RequestPage as component };
