import { y as __toESM } from "./createServerFn-CIHAFgYl.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { P as useStore, j as timeAgo, l as NeedIcon, m as UrgencyBadge, o as NEED_META, p as StatusBadge, s as NEED_TYPES, t as Card, u as Page, y as cn } from "./sahyogi-DVucO51_.mjs";
import { t as MapView } from "./MapView-BEz3IXBN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/map-Dk-v6Ci_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MapPage() {
	const requests = useStore((s) => s.db.requests);
	const users = useStore((s) => s.db.users);
	const [heat, setHeat] = (0, import_react.useState)(false);
	const [showDone, setShowDone] = (0, import_react.useState)(false);
	const [need, setNeed] = (0, import_react.useState)("all");
	const [focus, setFocus] = (0, import_react.useState)(null);
	const shown = requests.filter((r) => (showDone || r.status !== "fulfilled" && r.status !== "cancelled") && (need === "all" || r.needType === need));
	const sorted = [...shown].sort((a, b) => b.priorityScore - a.priorityScore);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-end justify-between gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-4xl font-semibold",
			children: "Live relief map"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-muted-foreground",
			children: [
				shown.length,
				" requests · ",
				users.filter((u) => u.role === "ngo").length,
				" NGOs on the network"
			]
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap gap-2 text-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
					on: heat,
					set: setHeat,
					label: "Heatmap"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
					on: showDone,
					set: setShowDone,
					label: "Show fulfilled"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					className: "inp w-auto py-1.5",
					value: need,
					onChange: (e) => setNeed(e.target.value),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "all",
						children: "All needs"
					}), NEED_TYPES.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: n,
						children: NEED_META[n].label
					}, n))]
				})
			]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-6 grid gap-6 lg:grid-cols-[1fr_360px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "p-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapView, {
				requests: shown,
				ngos: users.filter((u) => u.role === "ngo"),
				heat,
				height: 620,
				focusId: focus
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "max-h-[636px] overflow-auto p-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-2 flex gap-3 px-2 text-xs",
					children: [
						"critical",
						"high",
						"medium",
						"low"
					].map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1 capitalize",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-2.5 rounded-full", `bg-${u}`) }), u]
					}, u))
				}),
				sorted.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setFocus(r.id),
					className: cn("mb-2 w-full rounded-xl border p-3 text-left hover:border-primary", focus === r.id && "border-primary bg-primary/5"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-2 font-semibold capitalize",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NeedIcon, {
									type: r.needType,
									className: "size-4 text-primary"
								}), r.needType]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UrgencyBadge, { u: r.urgencyLevel })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 text-xs text-muted-foreground",
							children: [
								r.area,
								" · ",
								timeAgo(r.createdAt)
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { s: r.status }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs",
								children: r.assignedNgoName ?? "Unmatched"
							})]
						})
					]
				}, r.id)),
				!sorted.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "p-4 text-sm text-muted-foreground",
					children: "No requests match."
				})
			]
		})]
	})] });
}
function Toggle({ on, set, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		onClick: () => set(!on),
		className: cn("rounded-full border px-3 py-1.5 font-semibold", on && "border-primary bg-primary text-primary-foreground"),
		children: label
	});
}
//#endregion
export { MapPage as component };
