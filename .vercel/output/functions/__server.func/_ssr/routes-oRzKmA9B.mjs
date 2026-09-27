import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { I as ArrowRight, M as Building2, N as Brain, T as HandHeart, k as Clock, l as Radio, n as Users, r as Truck, s as Send, y as MapPin } from "../_libs/lucide-react.mjs";
import { P as useStore, j as timeAgo, l as NeedIcon, o as NEED_META } from "./sahyogi-DVucO51_.mjs";
import { t as MapView } from "./MapView-BEz3IXBN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-oRzKmA9B.js
var import_jsx_runtime = require_jsx_runtime();
function Landing() {
	const requests = useStore((s) => s.db.requests);
	const users = useStore((s) => s.db.users);
	const activity = useStore((s) => s.db.activity);
	const fulfilled = requests.filter((r) => r.status === "fulfilled");
	const lives = fulfilled.reduce((a, r) => a + r.people, 0);
	const vols = users.filter((u) => u.role === "volunteer").length;
	const avgMin = fulfilled.length ? Math.round(fulfilled.reduce((a, r) => a + ((r.fulfilledAt ?? r.createdAt) - r.createdAt), 0) / fulfilled.length / 6e4) : 0;
	const rate = requests.length ? Math.round(fulfilled.length / requests.length * 100) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -right-40 -top-40 size-[36rem] rounded-full bg-primary/15 blur-3xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -bottom-40 -left-20 size-[28rem] rounded-full bg-accent/15 blur-3xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-14 lg:grid-cols-[1.1fr_1fr] lg:pt-20",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-semibold",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "size-3.5 text-critical" }),
								" Live relief network · ",
								requests.filter((r) => r.status !== "fulfilled" && r.status !== "cancelled").length,
								" active requests"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-6 text-5xl font-semibold leading-[1.02] md:text-7xl",
							children: [
								"When disaster strikes, ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
									className: "text-primary",
									children: "help"
								}),
								" shouldn't wait."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 max-w-xl text-lg text-muted-foreground",
							children: "Sahyogi turns a single request into coordinated action — AI triage ranks urgency, geo-matching finds the nearest NGO, and trained volunteers are dispatched to your door."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/request",
								className: "inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-bold text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90",
								children: ["Request help now ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/map",
								className: "inline-flex items-center gap-2 rounded-full border bg-card px-6 py-3.5 font-bold hover:bg-secondary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4" }), " View live map"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4",
							children: [
								{
									v: lives,
									l: "Lives helped",
									I: HandHeart
								},
								{
									v: `${avgMin}m`,
									l: "Avg response",
									I: Clock
								},
								{
									v: vols,
									l: "Volunteers",
									I: Users
								},
								{
									v: `${rate}%`,
									l: "Fulfilled",
									I: Truck
								}
							].map(({ v, l, I }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(I, { className: "size-4 text-primary" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-display mt-1 text-3xl font-semibold",
									children: v
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs font-medium text-muted-foreground",
									children: l
								})
							] }, l))
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-hidden rounded-3xl border bg-card p-2 shadow-xl",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapView, {
								requests,
								height: 380,
								heat: true
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 rounded-2xl border bg-card p-4 shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pulse-dot size-2 rounded-full bg-success" }), " Real-time activity"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "max-h-40 space-y-2 overflow-auto text-sm",
								children: [activity.slice(0, 6).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "first-letter:uppercase",
										children: a.text
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "shrink-0 text-xs text-muted-foreground",
										children: timeAgo(a.at)
									})]
								}, a.id)), !activity.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "text-muted-foreground",
									children: "No activity yet."
								})]
							})]
						})]
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-7xl px-4 py-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-4xl font-semibold",
					children: "One network, every kind of need"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-muted-foreground",
					children: "NGOs register the services they provide — requests route only to responders who can help."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid grid-cols-2 gap-4 md:grid-cols-4",
					children: Object.keys(NEED_META).slice(0, 8).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/request",
						className: "group rounded-2xl border bg-card p-5 transition hover:-translate-y-0.5 hover:border-primary",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NeedIcon, {
								type: t,
								className: "size-7 text-primary"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 font-bold",
								children: NEED_META[t].label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-muted-foreground",
								children: [requests.filter((r) => r.needType === t).length, " requests handled"]
							})
						]
					}, t))
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-ink py-20 text-ink-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-4xl font-semibold",
					children: "From request to recovery"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid gap-6 md:grid-cols-4",
					children: [
						{
							I: Send,
							t: "Submit request",
							d: "Describe your need in four quick steps — by typing or speaking."
						},
						{
							I: Brain,
							t: "AI triage",
							d: "Urgency is scored from your situation, not self-reported, so critical cases go first."
						},
						{
							I: MapPin,
							t: "Geo match",
							d: "Nearest NGOs offering that service within their coverage radius are matched."
						},
						{
							I: Truck,
							t: "Help dispatched",
							d: "The NGO assigns a linked volunteer who delivers and marks the mission fulfilled."
						}
					].map(({ I, t, d }, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-ink-foreground/10 p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(I, { className: "size-6 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-display text-4xl opacity-20",
									children: ["0", i + 1]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 text-lg font-bold",
								children: t
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm opacity-70",
								children: d
							})
						]
					}, t))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-7xl px-4 py-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-center text-4xl font-semibold",
				children: "How would you like to take part?"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-5 md:grid-cols-3",
				children: [
					{
						I: HandHeart,
						t: "I need help",
						d: "Request food, medicine, shelter, water or rescue for your family.",
						to: "/request",
						cta: "Request help"
					},
					{
						I: Building2,
						t: "I'm an NGO",
						d: "Run a command center: triaged requests, volunteer roster and live map.",
						to: "/signup",
						cta: "Register NGO"
					},
					{
						I: Users,
						t: "I'm a volunteer",
						d: "Join your NGO with an invite code, take missions and earn badges.",
						to: "/signup",
						cta: "Become a volunteer"
					}
				].map(({ I, t, d, to, cta }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col rounded-3xl border bg-card p-7",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(I, { className: "size-8 text-primary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-4 text-2xl font-semibold",
							children: t
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 flex-1 text-muted-foreground",
							children: d
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to,
							className: "mt-6 inline-flex items-center gap-2 font-bold text-primary",
							children: [
								cta,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })
							]
						})
					]
				}, t))
			})]
		})
	] });
}
//#endregion
export { Landing as component };
