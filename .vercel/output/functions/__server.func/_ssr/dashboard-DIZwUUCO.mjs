import { y as __toESM } from "./createServerFn-CIHAFgYl.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { F as Award, O as Copy, a as Star, c as RefreshCw, d as Plus, f as Phone, j as ChartColumn, n as Users, r as Truck, y as MapPin } from "../_libs/lucide-react.mjs";
import { E as setAvailability, N as useSession, O as startMission, P as useStore, _ as cancelRequest, b as fulfillRequest, d as RequireAuth, f as STATUS_STEPS, g as badgeFor, h as assignVolunteer, j as timeAgo, l as NeedIcon, m as UrgencyBadge, p as StatusBadge, t as Card, u as Page, v as claimForNgo, w as regenerateInvite, y as cn } from "./sahyogi-DVucO51_.mjs";
import { t as MapView } from "./MapView-BEz3IXBN.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-DIZwUUCO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Dashboard() {
	const user = useSession();
	if (user.role === "ngo") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NgoDashboard, { me: user });
	if (user.role === "volunteer") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolunteerDashboard, { me: user });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserDashboard, { me: user });
}
var act = (fn, ok) => {
	try {
		fn();
		toast.success(ok);
	} catch (e) {
		toast.error(e.message);
	}
};
function NgoDashboard({ me }) {
	const requests = useStore((s) => s.db.requests);
	const users = useStore((s) => s.db.users);
	const [tab, setTab] = (0, import_react.useState)("active");
	const [showMap, setShowMap] = (0, import_react.useState)(false);
	const [focus, setFocus] = (0, import_react.useState)(null);
	const volunteers = users.filter((u) => u.role === "volunteer" && u.parentNgoId === me.id).map((v) => ({
		...v,
		id: String(v.id)
	}));
	const available = volunteers.filter((v) => v.availableNow !== false);
	const mine = requests.filter((r) => r.assignedNgoId === me.id || r.matchedNgoIds.includes(me.id) && !r.assignedNgoId);
	const open = requests.filter((r) => !r.assignedNgoId && r.status === "pending");
	const list = (tab === "active" ? mine.filter((r) => r.status !== "fulfilled" && r.status !== "cancelled") : tab === "open" ? open : mine.filter((r) => r.status === "fulfilled")).sort((a, b) => b.priorityScore - a.priorityScore);
	const stats = [
		{
			k: "Pending",
			v: mine.filter((r) => r.status === "pending").length + open.length
		},
		{
			k: "Matched",
			v: mine.filter((r) => r.status === "matched").length
		},
		{
			k: "Critical",
			v: mine.filter((r) => r.urgencyLevel === "critical" && r.status !== "fulfilled").length,
			c: "text-critical"
		},
		{
			k: "Fulfilled",
			v: mine.filter((r) => r.status === "fulfilled").length,
			c: "text-success"
		},
		{
			k: "Volunteers",
			v: volunteers.length
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-end justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold text-primary",
					children: me.orgName
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-4xl font-semibold",
					children: "NGO Command Center"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: "Manage requests, assign volunteers, track fulfillment."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/analytics",
					className: "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "size-4" }), "Analytics"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setShowMap(!showMap),
					className: "inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-ink-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4" }), "Live Map"]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 grid grid-cols-2 gap-3 md:grid-cols-5",
			children: stats.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs font-semibold uppercase text-muted-foreground",
					children: s.k
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("font-display text-3xl font-semibold", s.c),
					children: s.v
				})]
			}, s.k))
		}),
		showMap && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "mt-6 p-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapView, {
				requests: mine.concat(open),
				ngos: [me],
				height: 420,
				heat: true,
				focusId: focus
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-6 lg:grid-cols-[1fr_320px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-4 flex gap-2",
				children: [
					["active", `Active (${mine.filter((r) => r.status !== "fulfilled" && r.status !== "cancelled").length})`],
					["open", `Unclaimed nearby (${open.length})`],
					["done", "Fulfilled"]
				].map(([k, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setTab(k),
					className: cn("rounded-full px-4 py-1.5 text-sm font-semibold", tab === k ? "bg-primary text-primary-foreground" : "bg-secondary"),
					children: l
				}, k))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [list.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NgoRequestCard, {
					r,
					me,
					volunteers,
					available,
					onMap: () => {
						setShowMap(true);
						setFocus(r.id);
					}
				}, r.id)), !list.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "text-center text-muted-foreground",
					children: "Nothing here right now."
				})]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm font-semibold",
						children: "Volunteer Invite Code"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
								className: "flex-1 rounded-lg bg-secondary px-3 py-2 text-center font-mono text-lg font-bold tracking-widest",
								children: me.inviteCode
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								"aria-label": "Copy invite code",
								onClick: () => {
									navigator.clipboard?.writeText(me.inviteCode ?? "");
									toast.success("Invite code copied");
								},
								className: "rounded-lg border p-2.5 hover:bg-secondary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								"aria-label": "Regenerate invite code",
								onClick: () => act(regenerateInvite, "New invite code generated"),
								className: "rounded-lg border p-2.5 hover:bg-secondary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-4" })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted-foreground",
						children: "Volunteers enter this at signup to join your NGO."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-semibold",
							children: "Volunteer snapshot"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4 text-muted-foreground" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid grid-cols-2 gap-2 text-center text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg bg-success/10 p-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-2xl font-bold text-success",
								children: available.length
							}), "Available"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg bg-muted p-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-2xl font-bold",
								children: volunteers.length - available.length
							}), "Busy / off"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-4 space-y-2",
						children: [volunteers.map((v) => {
							const load = requests.filter((r) => r.assignedVolunteerId === v.id && (r.status === "assigned" || r.status === "in_progress")).length;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center justify-between text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-2 rounded-full", v.availableNow !== false ? "bg-success" : "bg-muted-foreground") }), v.name]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs text-muted-foreground",
									children: [
										load,
										" active · ",
										v.deliveries ?? 0,
										" done"
									]
								})]
							}, v.id);
						}), !volunteers.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "text-sm text-muted-foreground",
							children: "No volunteers linked yet. Share your invite code!"
						})]
					})
				] })]
			})]
		})
	] });
}
function NgoRequestCard({ r, me, volunteers, available, onMap }) {
	const [sel, setSel] = (0, import_react.useState)("");
	const owned = r.assignedNgoId === me.id;
	const assignable = owned && (r.status === "matched" || r.status === "pending" || r.status === "assigned");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: cn(r.urgencyLevel === "critical" && r.status !== "fulfilled" && "border-critical/50"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-10 place-items-center rounded-xl bg-primary/10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NeedIcon, {
							type: r.needType,
							className: "size-5 text-primary"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "font-semibold capitalize",
						children: [
							r.needType,
							" · ",
							r.name
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs text-muted-foreground",
						children: [
							r.area,
							" ",
							r.pincode,
							" · ",
							r.people,
							" people · ",
							timeAgo(r.createdAt)
						]
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UrgencyBadge, { u: r.urgencyLevel }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { s: r.status })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm",
				children: r.description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 rounded-lg bg-secondary px-3 py-2 text-xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: ["AI score ", r.aiScore] }),
					" · ",
					Math.round(r.confidenceScore * 100),
					"% confidence · ",
					r.aiAction
				]
			}),
			r.assignedVolunteerName && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 text-sm",
				children: [
					"Assigned volunteer: ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: r.assignedVolunteerName }),
					r.assignedAt && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-muted-foreground",
						children: [" · ", timeAgo(r.assignedAt)]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap items-center gap-2",
				children: [
					!r.assignedNgoId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => act(() => claimForNgo(r.id), "Request accepted"),
						className: "rounded-full bg-accent px-4 py-2 text-sm font-bold text-accent-foreground",
						children: "Accept request"
					}),
					assignable && (volunteers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-muted-foreground",
						children: "No volunteers linked yet. Share your invite code!"
					}) : available.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-muted-foreground",
						children: "No available volunteers right now."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						"aria-label": "Assign volunteer",
						className: "inp w-auto py-2",
						value: sel,
						onChange: (e) => setSel(e.target.value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: r.assignedVolunteerId ? "Reassign volunteer…" : "Assign Volunteer…"
						}), available.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: v.id,
							children: [v.name, v.skills?.length ? ` — ${v.skills.join(", ")}` : ""]
						}, v.id))]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						disabled: !sel,
						onClick: () => act(() => {
							assignVolunteer(r.id, { volunteerId: sel });
							setSel("");
						}, "Volunteer assigned"),
						className: "rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground disabled:opacity-40",
						children: "Assign"
					})] })),
					owned && r.status !== "fulfilled" && r.status !== "cancelled" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => act(() => fulfillRequest(r.id), "Marked fulfilled"),
						className: "rounded-full border px-4 py-2 text-sm font-semibold",
						children: "Mark fulfilled"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: onMap,
						className: "ml-auto inline-flex items-center gap-1 text-sm font-semibold text-accent",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4" }), "Map"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: `tel:${r.phone}`,
						className: "inline-flex items-center gap-1 text-sm font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4" }), "Call"]
					})
				]
			})
		]
	});
}
function VolunteerDashboard({ me }) {
	const requests = useStore((s) => s.db.requests);
	const users = useStore((s) => s.db.users);
	const [focus, setFocus] = (0, import_react.useState)(null);
	const ngo = users.find((u) => u.id === me.parentNgoId);
	const missions = requests.filter((r) => r.assignedVolunteerId === me.id);
	const active = missions.filter((r) => r.status === "assigned" || r.status === "in_progress").sort((a, b) => b.priorityScore - a.priorityScore);
	const done = missions.filter((r) => r.status === "fulfilled");
	const badge = badgeFor(me.deliveries);
	const pct = badge.next ? Math.min(100, (me.deliveries ?? 0) / badge.next * 100) : 100;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-[320px_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display grid size-14 place-items-center rounded-2xl bg-primary text-2xl text-primary-foreground",
						children: me.name[0]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-lg font-bold",
						children: me.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm text-muted-foreground",
						children: ngo ? ngo.orgName : "Independent volunteer"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid grid-cols-3 gap-2 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg bg-secondary p-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "mx-auto size-4 text-primary" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-bold",
									children: me.points ?? 0
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[11px]",
									children: "Points"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg bg-secondary p-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "mx-auto size-4 text-primary" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-bold",
									children: me.deliveries ?? 0
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[11px]",
									children: "Deliveries"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg bg-secondary p-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "mx-auto size-4 text-primary" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-bold",
									children: badge.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[11px]",
									children: "Badge"
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-4 flex items-center justify-between rounded-xl border p-3 text-sm font-semibold",
					children: [me.availableNow !== false ? "Available for missions" : "Unavailable", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						className: "size-5 accent-[var(--color-primary)]",
						checked: me.availableNow !== false,
						onChange: (e) => act(() => setAvailability(e.target.checked), e.target.checked ? "You're available" : "You're off duty")
					})]
				}),
				!ngo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-xs text-muted-foreground",
					children: "You're not linked to an NGO yet. Ask an NGO for their invite code and sign up with it to receive missions."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm font-semibold",
					children: "Badge progress"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 h-2 overflow-hidden rounded-full bg-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-full bg-primary",
						style: { width: `${pct}%` }
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-muted-foreground",
					children: badge.next ? `${badge.next - (me.deliveries ?? 0)} more deliveries to the next badge` : "Top badge unlocked!"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex gap-2 text-[11px] font-bold uppercase",
					children: [
						"Rookie",
						"Responder",
						"Hero",
						"Guardian"
					].map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("rounded-full px-2 py-0.5", b === badge.name ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"),
						children: b
					}, b))
				})
			] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-4xl font-semibold",
				children: "My Missions"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-muted-foreground",
				children: [
					active.length,
					" active · ",
					done.length,
					" completed"
				]
			}),
			active.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "mt-4 p-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapView, {
					requests: active,
					height: 300,
					focusId: focus
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 space-y-3",
				children: [active.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NeedIcon, {
								type: r.needType,
								className: "size-6 text-primary"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-semibold capitalize",
								children: [
									r.needType,
									" for ",
									r.name
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-muted-foreground",
								children: [
									r.area,
									" ",
									r.pincode,
									" · ",
									r.people,
									" people · assigned ",
									r.assignedAt ? timeAgo(r.assignedAt) : ""
								]
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UrgencyBadge, { u: r.urgencyLevel }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { s: r.status })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm",
						children: r.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 text-xs text-muted-foreground",
						children: ["Action: ", r.aiAction]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: [
							r.status === "assigned" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => act(() => startMission(r.id), "Mission started"),
								className: "rounded-full bg-accent px-4 py-2 text-sm font-bold text-accent-foreground",
								children: "Start mission"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => act(() => fulfillRequest(r.id), "Mission fulfilled — great work!"),
								className: "rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground",
								children: "Mark fulfilled"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setFocus(r.id),
								className: "inline-flex items-center gap-1 rounded-full border px-4 py-2 text-sm font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4" }), "View map"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: `tel:${r.phone}`,
								className: "inline-flex items-center gap-1 rounded-full border px-4 py-2 text-sm font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4" }), r.phone]
							})
						]
					})
				] }, r.id)), !active.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "text-center text-muted-foreground",
					children: ["No active missions. ", me.availableNow === false ? "Turn on availability to receive missions." : "Your NGO will assign you soon."]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-10 text-2xl font-semibold",
				children: "Completed missions"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 space-y-2",
				children: [done.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between rounded-xl border bg-card px-4 py-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "capitalize",
						children: [
							r.needType,
							" · ",
							r.area
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: r.fulfilledAt && timeAgo(r.fulfilledAt)
					})]
				}, r.id)), !done.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "None yet."
				})]
			})
		] })]
	}) });
}
function UserDashboard({ me }) {
	const mine = useStore((s) => s.db.requests).filter((r) => r.userId === me.id || !r.userId && r.phone === me.phone);
	const active = mine.filter((r) => r.status !== "fulfilled" && r.status !== "cancelled");
	const history = mine.filter((r) => r.status === "fulfilled" || r.status === "cancelled");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-end justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm font-semibold text-primary",
					children: ["Namaste, ", me.name]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-4xl font-semibold",
					children: "My requests"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-muted-foreground",
					children: [
						me.area,
						" · household of ",
						me.people ?? 1
					]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/request",
				className: "inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-bold text-primary-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "New request"]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid grid-cols-3 gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs font-semibold uppercase text-muted-foreground",
						children: "Total"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-3xl font-semibold",
						children: mine.length
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs font-semibold uppercase text-muted-foreground",
						children: "Active"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-3xl font-semibold text-primary",
						children: active.length
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs font-semibold uppercase text-muted-foreground",
						children: "Fulfilled"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-3xl font-semibold text-success",
						children: mine.filter((r) => r.status === "fulfilled").length
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 space-y-4",
			children: [active.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NeedIcon, {
							type: r.needType,
							className: "size-6 text-primary"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "font-semibold capitalize",
							children: [r.needType, " request"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs text-muted-foreground",
							children: [
								r.area,
								" · ",
								timeAgo(r.createdAt)
							]
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UrgencyBadge, { u: r.urgencyLevel }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { s: r.status })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-5 grid grid-cols-5 gap-1",
					children: STATUS_STEPS.map((s, i) => {
						const reached = STATUS_STEPS.indexOf(r.status) >= i;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "text-[11px] font-semibold capitalize",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("h-1.5 rounded-full", reached ? "bg-primary" : "bg-muted") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("mt-1 block", !reached && "text-muted-foreground"),
								children: s.replace("_", " ")
							})]
						}, s);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid gap-2 text-sm sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["NGO matched: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: r.assignedNgoName ?? "Searching nearby…" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Assigned Volunteer: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: r.assignedVolunteerName ?? "Awaiting assignment" })] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-muted-foreground",
					children: r.aiSummary
				}),
				(r.status === "pending" || r.status === "matched") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => act(() => cancelRequest(r.id), "Request cancelled"),
					className: "mt-3 text-sm font-semibold text-destructive",
					children: "Cancel request"
				})
			] }, r.id)), !active.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "text-center text-muted-foreground",
				children: "No active requests. Need help? Submit a new request anytime."
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-10 text-2xl font-semibold",
			children: "History"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 space-y-2",
			children: [history.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-2 rounded-xl border bg-card px-4 py-3 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "capitalize",
						children: [
							r.needType,
							" · ",
							r.area
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: r.assignedVolunteerName ? `by ${r.assignedVolunteerName}` : ""
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { s: r.status })
				]
			}, r.id)), !history.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "No past requests."
			})]
		})
	] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dashboard, {}) });
//#endregion
export { SplitComponent as component };
