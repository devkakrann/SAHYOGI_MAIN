import { y as __toESM } from "./createServerFn-CIHAFgYl.mjs";
import { c as HeadContent, d as Outlet, f as lazyRouteComponent, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { a as Footer, c as Navbar } from "./sahyogi-DVucO51_.mjs";
import { a as Chart, c as LineElement, d as plugin_legend, f as plugin_tooltip, i as CategoryScale, l as LinearScale, r as BarElement, t as ArcElement, u as PointElement } from "../_libs/chart.js.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DYJ1qsib.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-B7uCkV15.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-[60vh] items-center justify-center px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$7 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Sahyogi — Real-time disaster relief coordination" },
			{
				name: "description",
				content: "Sahyogi by Binary Minds connects people in need with NGOs and volunteers in real time."
			},
			{
				name: "author",
				content: "Binary Minds"
			},
			{
				property: "og:title",
				content: "Sahyogi — Real-time disaster relief coordination"
			},
			{
				property: "og:description",
				content: "Sahyogi by Binary Minds connects people in need with NGOs and volunteers in real time."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.svg",
				type: "image/svg+xml"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Manrope:wght@400;500;600;700;800&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", { dangerouslySetInnerHTML: { __html: `try{var t=localStorage.getItem('sahyogi-theme')||'auto';if(t==='dark'||(t==='auto'&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}` } })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$7.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				richColors: true,
				position: "top-right"
			})
		]
	});
}
var $$splitComponentImporter$6 = () => import("./routes-oRzKmA9B.mjs");
var Route$6 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Sahyogi — Help reaches faster when everyone is connected" },
		{
			name: "description",
			content: "Request food, medical, shelter, water or rescue help. AI triage and geo-matching route you to nearby NGOs and volunteers in minutes."
		},
		{
			property: "og:title",
			content: "Sahyogi — Real-time disaster relief"
		},
		{
			property: "og:description",
			content: "AI-triaged help requests matched to nearby NGOs and volunteers, live on the map."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./analytics-BA7bQHwJ.mjs");
Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, LineElement, PointElement, plugin_tooltip, plugin_legend);
var Route$5 = createFileRoute("/analytics")({
	head: () => ({ meta: [
		{ title: "Impact analytics — Sahyogi" },
		{
			name: "description",
			content: "Request volume, urgency mix, fulfillment and volunteer leaderboard across the Sahyogi network."
		},
		{
			property: "og:title",
			content: "Impact analytics — Sahyogi"
		},
		{
			property: "og:description",
			content: "Live impact metrics for the relief network."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./dashboard-DIZwUUCO.mjs");
var Route$4 = createFileRoute("/dashboard")({
	head: () => ({ meta: [
		{ title: "Dashboard — Sahyogi" },
		{
			name: "description",
			content: "Your Sahyogi dashboard: requests, missions and NGO command center."
		},
		{
			property: "og:title",
			content: "Dashboard — Sahyogi"
		},
		{
			property: "og:description",
			content: "Track requests, assign volunteers and complete missions."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./login-D-Bgx1os.mjs");
var Route$3 = createFileRoute("/login")({
	head: () => ({ meta: [
		{ title: "Log in — Sahyogi" },
		{
			name: "description",
			content: "Log in to Sahyogi as a citizen, volunteer or NGO admin."
		},
		{
			property: "og:title",
			content: "Log in — Sahyogi"
		},
		{
			property: "og:description",
			content: "Access your Sahyogi dashboard."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./map-Dk-v6Ci_.mjs");
var Route$2 = createFileRoute("/map")({
	head: () => ({ meta: [
		{ title: "Live relief map — Sahyogi" },
		{
			name: "description",
			content: "Live map of help requests, urgency heatmap and NGO coverage across the city."
		},
		{
			property: "og:title",
			content: "Live relief map — Sahyogi"
		},
		{
			property: "og:description",
			content: "See every active help request and responding NGO in real time."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./request-Cz9rRzc6.mjs");
var Route$1 = createFileRoute("/request")({
	head: () => ({ meta: [
		{ title: "Request help — Sahyogi" },
		{
			name: "description",
			content: "Submit a help request for food, medical, shelter, water, rescue and more. AI triage ranks urgency and matches nearby NGOs."
		},
		{
			property: "og:title",
			content: "Request help — Sahyogi"
		},
		{
			property: "og:description",
			content: "Four quick steps to get help from nearby NGOs and volunteers."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./signup-BodgmX8x.mjs");
var Route = createFileRoute("/signup")({
	head: () => ({ meta: [
		{ title: "Sign up — Sahyogi" },
		{
			name: "description",
			content: "Join Sahyogi as a citizen, volunteer or NGO. Volunteers can link to their NGO with an invite code."
		},
		{
			property: "og:title",
			content: "Join Sahyogi"
		},
		{
			property: "og:description",
			content: "Create a Sahyogi account as citizen, volunteer or NGO."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$6.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$7
	}),
	AnalyticsRoute: Route$5.update({
		id: "/analytics",
		path: "/analytics",
		getParentRoute: () => Route$7
	}),
	DashboardRoute: Route$4.update({
		id: "/dashboard",
		path: "/dashboard",
		getParentRoute: () => Route$7
	}),
	LoginRoute: Route$3.update({
		id: "/login",
		path: "/login",
		getParentRoute: () => Route$7
	}),
	MapRoute: Route$2.update({
		id: "/map",
		path: "/map",
		getParentRoute: () => Route$7
	}),
	RequestRoute: Route$1.update({
		id: "/request",
		path: "/request",
		getParentRoute: () => Route$7
	}),
	SignupRoute: Route.update({
		id: "/signup",
		path: "/signup",
		getParentRoute: () => Route$7
	})
};
var routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
