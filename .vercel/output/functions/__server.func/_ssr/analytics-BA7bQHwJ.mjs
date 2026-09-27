import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { P as useStore, o as NEED_META, s as NEED_TYPES, t as Card, u as Page } from "./sahyogi-DVucO51_.mjs";
import { n as Doughnut, r as Line, t as Bar } from "../_libs/react-chartjs-2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/analytics-BA7bQHwJ.js
var import_jsx_runtime = require_jsx_runtime();
var C = [
	"#e8792b",
	"#1d8a92",
	"#d9382c",
	"#e3b43a",
	"#3c9d78",
	"#7b6fd6",
	"#b0567a",
	"#8a8f99"
];
function Analytics() {
	const requests = useStore((s) => s.db.requests);
	const users = useStore((s) => s.db.users);
	const byNeed = NEED_TYPES.map((n) => requests.filter((r) => r.needType === n).length);
	const urg = [
		"critical",
		"high",
		"medium",
		"low"
	].map((u) => requests.filter((r) => r.urgencyLevel === u).length);
	const days = Array.from({ length: 7 }, (_, i) => {
		const d = /* @__PURE__ */ new Date();
		d.setHours(0, 0, 0, 0);
		d.setDate(d.getDate() - (6 - i));
		return d;
	});
	const perDay = (f) => days.map((d) => requests.filter((r) => {
		const t = r.createdAt;
		return t >= d.getTime() && t < d.getTime() + 864e5 && f(t);
	}).length);
	const fulfilledPerDay = days.map((d) => requests.filter((r) => r.fulfilledAt && r.fulfilledAt >= d.getTime() && r.fulfilledAt < d.getTime() + 864e5).length);
	const vols = users.filter((u) => u.role === "volunteer").sort((a, b) => (b.points ?? 0) - (a.points ?? 0));
	const fulfilled = requests.filter((r) => r.status === "fulfilled").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-4xl font-semibold",
			children: "Impact analytics"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 grid grid-cols-2 gap-4 md:grid-cols-4",
			children: [
				["Total requests", requests.length],
				["Fulfilled", fulfilled],
				["People helped", requests.filter((r) => r.status === "fulfilled").reduce((a, r) => a + r.people, 0)],
				["NGOs", users.filter((u) => u.role === "ngo").length]
			].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-sm text-muted-foreground",
				children: k
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-display text-4xl font-semibold",
				children: v
			})] }, k))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-6 lg:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-4 text-xl font-semibold",
					children: "Requests by need"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
					data: {
						labels: NEED_TYPES.map((n) => NEED_META[n].label),
						datasets: [{
							data: byNeed,
							backgroundColor: C,
							borderRadius: 8
						}]
					},
					options: { plugins: { legend: { display: false } } }
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-4 text-xl font-semibold",
					children: "Urgency mix"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-xs",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Doughnut, { data: {
						labels: [
							"Critical",
							"High",
							"Medium",
							"Low"
						],
						datasets: [{
							data: urg,
							backgroundColor: [
								"#d9382c",
								"#e8792b",
								"#e3b43a",
								"#3c9d78"
							]
						}]
					} })
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-4 text-xl font-semibold",
					children: "Last 7 days"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, { data: {
					labels: days.map((d) => d.toLocaleDateString(void 0, { weekday: "short" })),
					datasets: [{
						label: "New",
						data: perDay(() => true),
						borderColor: "#e8792b",
						tension: .35
					}, {
						label: "Fulfilled",
						data: fulfilledPerDay,
						borderColor: "#3c9d78",
						tension: .35
					}]
				} })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-4 text-xl font-semibold",
					children: "Volunteer leaderboard"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
					className: "space-y-2",
					children: [vols.slice(0, 8).map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between rounded-lg bg-secondary px-3 py-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", {
							className: "mr-2 text-primary",
							children: ["#", i + 1]
						}), v.name] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							v.deliveries ?? 0,
							" deliveries · ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [v.points ?? 0, " pts"] })
						] })]
					}, v.id)), !vols.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "text-sm text-muted-foreground",
						children: "No volunteers yet."
					})]
				})] })
			]
		})
	] });
}
//#endregion
export { Analytics as component };
