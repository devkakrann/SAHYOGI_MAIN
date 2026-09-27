import { y as __toESM } from "./createServerFn-CIHAFgYl.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/MapView-BEz3IXBN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var loadLiveMap = () => {
	throw new Error("createClientOnlyFn() functions can only be called on the client!");
};
function MapView(props) {
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setMounted(true);
	}, []);
	const fallback = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: { height: props.height ?? 480 },
		className: "w-full animate-pulse rounded-2xl bg-muted"
	});
	if (!mounted) return fallback;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
		fallback,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientMap, {
			props,
			fallback
		})
	});
}
function ClientMap({ props, fallback }) {
	const [Component, setComponent] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		loadLiveMap().then((module) => {
			setComponent(() => module.LiveMap);
		});
	}, []);
	if (!Component) return fallback;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, { ...props });
}
//#endregion
export { MapView as t };
