import { c as createServerFn, i as TSS_SERVER_FUNCTION, y as __toESM } from "./createServerFn-CIHAFgYl.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-D4KygfdD.mjs";
import { _ as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { C as House, E as Droplets, L as Apple, P as BookOpen, S as LifeBuoy, T as HandHeart, b as LogOut, h as Monitor, i as Sun, m as Moon, o as Shirt, p as Package, t as X, v as Menu, w as HeartPulse } from "../_libs/lucide-react.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sahyogi-DVucO51_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CRITICAL = [
	"trapped",
	"unconscious",
	"not breathing",
	"bleeding",
	"drowning",
	"collapsed",
	"fire",
	"heart attack",
	"stroke",
	"flood water rising",
	"stuck",
	"dying",
	"severe",
	"emergency",
	"pregnant",
	"labour",
	"labor"
];
var HIGH = [
	"injured",
	"child",
	"children",
	"baby",
	"infant",
	"elderly",
	"old",
	"fever",
	"no food",
	"starving",
	"disabled",
	"sick",
	"urgent",
	"days",
	"rain",
	"cold",
	"insulin",
	"medicine"
];
var MEDIUM = [
	"need",
	"help",
	"shortage",
	"running out",
	"family",
	"hungry",
	"thirsty",
	"homeless"
];
var BASE = {
	rescue: 40,
	medical: 35,
	water: 25,
	food: 22,
	shelter: 22,
	clothing: 10,
	education: 5,
	other: 10
};
var ACTIONS = {
	rescue: "Dispatch rescue-trained volunteers immediately and alert local emergency services.",
	medical: "Send a first-aid capable volunteer; escalate to nearest hospital if symptoms worsen.",
	water: "Deliver packaged drinking water and purification tablets within hours.",
	food: "Dispatch dry ration kits or cooked meals sized for household.",
	shelter: "Coordinate temporary shelter placement with nearest relief camp.",
	clothing: "Arrange clothing and blanket kit from NGO inventory.",
	education: "Connect family with NGO education program for study materials.",
	other: "NGO coordinator to call requester and assess needs."
};
/** Deterministic local triage. Users cannot pick their own priority. */
function triage(needType, description, people = 1) {
	const d = description.toLowerCase();
	const hits = (list) => list.filter((k) => d.includes(k));
	const c = hits(CRITICAL), h = hits(HIGH), m = hits(MEDIUM);
	let score = BASE[needType] + c.length * 22 + h.length * 9 + m.length * 3 + Math.min(people, 20) * 1.2;
	score = Math.max(5, Math.min(100, Math.round(score)));
	const urgencyLevel = score >= 75 ? "critical" : score >= 50 ? "high" : score >= 28 ? "medium" : "low";
	const signals = [...c, ...h].slice(0, 3);
	const confidenceScore = Math.min(.97, .55 + (c.length + h.length + m.length) * .07 + (description.length > 60 ? .1 : 0));
	return {
		aiCategory: needType,
		urgencyLevel,
		confidenceScore: Math.round(confidenceScore * 100) / 100,
		aiSummary: `${people} ${people === 1 ? "person" : "people"} need ${needType} support${signals.length ? ` — signals: ${signals.join(", ")}` : ""}.`,
		aiAction: ACTIONS[needType],
		aiScore: score,
		priorityScore: score + (urgencyLevel === "critical" ? 20 : 0)
	};
}
var DEMO_PASSWORD = "demo1234";
var DEMO_ACCOUNTS = [
	{
		id: "ngo-1",
		label: "NGO Admin — Seva Relief Foundation",
		role: "ngo",
		phone: "9000000001"
	},
	{
		id: "vol-1",
		label: "Volunteer — Aarav Mehta",
		role: "volunteer",
		phone: "9100000001"
	},
	{
		id: "usr-1",
		label: "Citizen — Priya Sharma",
		role: "user",
		phone: "9200000001"
	}
];
function buildSeed() {
	const now = Date.now();
	const base = {
		passwordHash: hash(DEMO_PASSWORD),
		verified: true,
		createdAt: now - 1728e6
	};
	const ngo = (id, orgName, name, phone, area, lat, lng, domains, inviteCode) => ({
		...base,
		id,
		role: "ngo",
		orgName,
		name,
		phone,
		area,
		lat,
		lng,
		domains,
		inviteCode,
		regNo: "NGO/DL/" + phone.slice(-4),
		radiusKm: 30,
		available: true
	});
	const vol = (id, name, phone, area, lat, lng, parentNgoId, skills, deliveries, availableNow = true) => ({
		...base,
		id,
		role: "volunteer",
		name,
		phone,
		area,
		lat,
		lng,
		parentNgoId,
		skills,
		deliveries,
		points: deliveries * 25,
		availableNow
	});
	const usr = (id, name, phone, area, lat, lng, people) => ({
		...base,
		id,
		role: "user",
		name,
		phone,
		area,
		lat,
		lng,
		people
	});
	const users = [
		ngo("ngo-1", "Seva Relief Foundation", "Meera Iyer", "9000000001", "Connaught Place, Delhi", 28.6315, 77.2167, [
			"food",
			"medical",
			"water",
			"shelter",
			"rescue"
		], "SEVA2026"),
		ngo("ngo-2", "Annapurna Food Network", "Rohit Khanna", "9000000002", "Karol Bagh, Delhi", 28.6519, 77.1909, [
			"food",
			"water",
			"clothing"
		], "ANNA7788"),
		ngo("ngo-3", "Vidya Rise Trust", "Sana Qureshi", "9000000003", "Saket, Delhi", 28.5245, 77.2066, [
			"education",
			"clothing",
			"shelter"
		], "VIDYA123"),
		vol("vol-1", "Aarav Mehta", "9100000001", "Rajouri Garden", 28.6415, 77.1209, "ngo-1", ["First aid", "Driving"], 7),
		vol("vol-2", "Ishita Rao", "9100000002", "Lajpat Nagar", 28.5677, 77.2433, "ngo-1", ["Nursing", "Hindi"], 12),
		vol("vol-3", "Kabir Singh", "9100000003", "Dwarka", 28.5921, 77.046, "ngo-1", ["Rescue", "Swimming"], 2, false),
		vol("vol-4", "Neha Gupta", "9100000004", "Karol Bagh", 28.6519, 77.1909, "ngo-2", ["Cooking", "Logistics"], 5),
		vol("vol-5", "Farhan Ali", "9100000005", "Paharganj", 28.6448, 77.2167, "ngo-2", ["Driving"], 1),
		vol("vol-6", "Ananya Das", "9100000006", "Saket", 28.5245, 77.2066, "ngo-3", ["Teaching"], 9),
		usr("usr-1", "Priya Sharma", "9200000001", "Yamuna Pushta, Delhi", 28.6608, 77.2466, 5),
		usr("usr-2", "Ramesh Kumar", "9200000002", "Seelampur, Delhi", 28.6695, 77.2687, 3),
		usr("usr-3", "Lakshmi Devi", "9200000003", "Okhla, Delhi", 28.5355, 77.271, 6)
	];
	const R = (i, userId, name, needType, description, area, pincode, lat, lng, people, status, ngoId, volId, hoursAgo) => {
		const ng = users.find((u) => u.id === ngoId);
		const v = users.find((u) => u.id === volId);
		const created = now - hoursAgo * 36e5;
		return {
			...triage(needType, description, people),
			id: `req-${i}`,
			userId,
			name,
			phone: users.find((u) => u.id === userId)?.phone ?? "9876500000",
			needType,
			description,
			area,
			pincode,
			lat,
			lng,
			people,
			status,
			matchedNgoIds: ngoId ? [ngoId] : [],
			assignedNgoId: ngoId,
			assignedNgoName: ng?.orgName ?? null,
			assignedVolunteerId: volId,
			assignedVolunteerName: v?.name ?? null,
			assignedAt: volId ? created + 18e5 : null,
			fulfilledAt: status === "fulfilled" ? created + 54e5 : null,
			createdAt: created
		};
	};
	return {
		users,
		requests: [
			R(1, "usr-1", "Priya Sharma", "water", "Flood water entered our lane, no drinking water for 2 days, two children and elderly mother at home.", "Yamuna Pushta", "110006", 28.6608, 77.2466, 5, "matched", "ngo-1", null, 1),
			R(2, "usr-2", "Ramesh Kumar", "medical", "My father collapsed and has severe fever, we need medicine and someone with first aid urgently.", "Seelampur", "110053", 28.6695, 77.2687, 3, "assigned", "ngo-1", "vol-1", 3),
			R(3, "usr-3", "Lakshmi Devi", "food", "Family of six, daily wage work stopped due to rain, running out of food.", "Okhla", "110020", 28.5355, 77.271, 6, "in_progress", "ngo-1", "vol-2", 6),
			R(4, "usr-1", "Priya Sharma", "shelter", "Roof collapsed partially after heavy rain, need temporary shelter.", "Yamuna Pushta", "110006", 28.6628, 77.2436, 5, "fulfilled", "ngo-1", "vol-1", 48),
			R(5, "usr-2", "Ramesh Kumar", "rescue", "Neighbour trapped in waterlogged basement, water rising fast, emergency!", "Shahdara", "110032", 28.6733, 77.2894, 2, "pending", null, null, .3),
			R(6, "usr-3", "Lakshmi Devi", "education", "Children need notebooks and school bags for new term.", "Okhla", "110020", 28.5375, 77.269, 3, "matched", "ngo-3", null, 20),
			R(7, "usr-2", "Ramesh Kumar", "clothing", "Need blankets and warm clothes for family, cold nights.", "Karol Bagh", "110005", 28.6539, 77.1889, 4, "assigned", "ngo-2", "vol-4", 10),
			R(8, "usr-1", "Priya Sharma", "food", "Community kitchen ran out of rations, 20 people waiting.", "Paharganj", "110055", 28.6448, 77.2127, 20, "matched", "ngo-1", null, 2),
			R(9, "usr-3", "Lakshmi Devi", "medical", "Pregnant woman in labour, no transport available.", "Jamia Nagar", "110025", 28.5616, 77.2803, 1, "matched", "ngo-1", null, .5),
			R(10, "usr-2", "Ramesh Kumar", "water", "Water tanker did not come for a week.", "Mustafabad", "110094", 28.7122, 77.2724, 8, "fulfilled", "ngo-2", "vol-5", 72),
			R(11, "usr-1", "Priya Sharma", "food", "Need ration kit for elderly couple.", "Daryaganj", "110002", 28.6448, 77.2403, 2, "fulfilled", "ngo-1", "vol-2", 30),
			R(12, "usr-3", "Lakshmi Devi", "education", "Tuition support for class 10 student.", "Saket", "110017", 28.5265, 77.2086, 1, "fulfilled", "ngo-3", "vol-6", 96)
		],
		activity: [
			{
				t: "New critical rescue request in Shahdara",
				k: "request",
				h: .3
			},
			{
				t: "Seva Relief Foundation matched to medical request in Jamia Nagar",
				k: "match",
				h: .5
			},
			{
				t: "Seva Relief Foundation assigned Aarav Mehta to medical request in Seelampur",
				k: "assign",
				h: 2.5
			},
			{
				t: "food request in Daryaganj fulfilled by Ishita Rao",
				k: "fulfill",
				h: 28
			},
			{
				t: "Ananya Das joined Vidya Rise Trust as a volunteer",
				k: "join",
				h: 50
			}
		].map((a, i) => ({
			id: `act-${i}`,
			at: now - a.h * 36e5,
			text: a.t,
			kind: a.k
		}))
	};
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getUserByPhone = createServerFn({ method: "GET" }).inputValidator((phone) => phone).handler(createSsrRpc("c9878e09acc8ec03fd4a87e0075018a4682f89ee245e3a6ffe9088adfd9ca430"));
createServerFn({ method: "GET" }).inputValidator((id) => id).handler(createSsrRpc("ce652d1b63b6598c4ed0a0a65c5f731a483e92d5219e79af45740a09b65e7b77"));
var createMongoUser = createServerFn({ method: "POST" }).inputValidator((user) => user).handler(createSsrRpc("b400316880114efdb275589967ec0f9d86e5cdbb34a86773ef3ea7044d21db91"));
createServerFn({ method: "GET" }).handler(createSsrRpc("ae8dd8af6f9c1da0919daef80257e107089a273b7b59cb2bf335e9e90dab42f3"));
createServerFn({ method: "POST" }).handler(createSsrRpc("c5d49b1247a1db401a0803b6ee8ac14afe558b14fed70862e703ab6acf5a107e"));
var getNgoByInviteCode = createServerFn({ method: "GET" }).inputValidator((inviteCode) => inviteCode).handler(createSsrRpc("c23cf2c859a70d68076359be9fa5e705b8948a1fb37f0e8a75f20c4dbca8ca40"));
var NEED_TYPES = [
	"food",
	"medical",
	"shelter",
	"water",
	"rescue",
	"education",
	"clothing",
	"other"
];
var MODE_KEY = "sahyogi-mode";
var dbKey = (m) => `sahyogi-db-${m}`;
var sessKey = (m) => `sahyogi-session-${m}`;
function hash(s) {
	let h1 = 3735928559 ^ s.length, h2 = 1103547991 ^ s.length;
	for (let i = 0; i < s.length; i++) {
		const c = s.charCodeAt(i);
		h1 = Math.imul(h1 ^ c, 2654435761);
		h2 = Math.imul(h2 ^ c, 1597334677);
	}
	h1 = Math.imul(h1 ^ h1 >>> 16, 2246822507) ^ Math.imul(h2 ^ h2 >>> 13, 3266489909);
	h2 = Math.imul(h2 ^ h2 >>> 16, 2246822507) ^ Math.imul(h1 ^ h1 >>> 13, 3266489909);
	return "h" + (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36);
}
var uid = (p = "") => p + Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
var empty = {
	users: [],
	requests: [],
	activity: []
};
var state = {
	mode: "demo",
	db: empty,
	sessionUserId: null,
	connected: false
};
var listeners = /* @__PURE__ */ new Set();
var channel = null;
var initialized = false;
function emit() {
	listeners.forEach((l) => l());
}
function loadDb(mode) {
	const raw = localStorage.getItem(dbKey(mode));
	if (raw) try {
		return JSON.parse(raw);
	} catch {}
	const db = mode === "demo" ? buildSeed() : {
		...empty,
		users: [],
		requests: [],
		activity: []
	};
	localStorage.setItem(dbKey(mode), JSON.stringify(db));
	return db;
}
function init() {
	if (initialized || typeof window === "undefined") return;
	initialized = true;
	const mode = localStorage.getItem(MODE_KEY) || "demo";
	state = {
		mode,
		db: loadDb(mode),
		sessionUserId: localStorage.getItem(sessKey(mode)),
		connected: true
	};
	if ("BroadcastChannel" in window) {
		channel = new BroadcastChannel("sahyogi-live");
		channel.onmessage = () => {
			const m = localStorage.getItem(MODE_KEY) || "demo";
			state = {
				...state,
				mode: m,
				db: loadDb(m),
				sessionUserId: localStorage.getItem(sessKey(m))
			};
			emit();
		};
	}
	window.addEventListener("online", () => {
		state = {
			...state,
			connected: true
		};
		emit();
	});
	window.addEventListener("offline", () => {
		state = {
			...state,
			connected: false
		};
		emit();
	});
}
function commit(mut) {
	const db = mut(structuredClone(state.db));
	state = {
		...state,
		db
	};
	localStorage.setItem(dbKey(state.mode), JSON.stringify(db));
	channel?.postMessage("update");
	emit();
}
function log(db, text, kind) {
	db.activity.unshift({
		id: uid("a"),
		at: Date.now(),
		text,
		kind
	});
	db.activity = db.activity.slice(0, 60);
}
var serverSnapshot = {
	mode: "demo",
	db: empty,
	sessionUserId: null,
	connected: false
};
function useStore(sel) {
	return (0, import_react.useSyncExternalStore)((l) => {
		init();
		listeners.add(l);
		return () => {
			listeners.delete(l);
		};
	}, () => {
		init();
		return sel(state);
	}, () => sel(serverSnapshot));
}
function useSession() {
	const id = useStore((s) => s.sessionUserId);
	return useStore((s) => s.db.users).find((u) => u.id === id) ?? null;
}
function badgeFor(deliveries = 0) {
	if (deliveries >= 25) return {
		name: "Guardian",
		next: null
	};
	if (deliveries >= 10) return {
		name: "Hero",
		next: 25
	};
	if (deliveries >= 3) return {
		name: "Responder",
		next: 10
	};
	return {
		name: "Rookie",
		next: 3
	};
}
function distanceKm(a, b) {
	const R = 6371, dLat = (b.lat - a.lat) * Math.PI / 180, dLng = (b.lng - a.lng) * Math.PI / 180;
	const x = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * Math.PI / 180) * Math.cos(b.lat * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
	return 2 * R * Math.asin(Math.sqrt(x));
}
function matchNgos(db, p) {
	return db.users.filter((u) => u.role === "ngo" && u.available !== false).map((n) => ({
		n,
		d: distanceKm(p, n),
		serves: (n.domains ?? []).includes(p.needType)
	})).filter((x) => x.serves && x.d <= (x.n.radiusKm ?? 25)).sort((a, b) => a.d - b.d);
}
var ApiError = class extends Error {};
var otps = /* @__PURE__ */ new Map();
async function startSignup(input) {
	const phone = input.phone.replace(/\D/g, "");
	if (phone.length < 10) throw new ApiError("Enter a valid 10-digit phone number.");
	if (input.password.length < 6) throw new ApiError("Password must be at least 6 characters.");
	if (state.mode === "demo") {
		if (state.db.users.some((u) => u.phone === phone)) throw new ApiError("An account with this phone already exists.");
	} else if (await getUserByPhone({ data: phone })) throw new ApiError("An account with this phone already exists.");
	if (input.role === "volunteer" && input.inviteCode?.trim()) {
		if (!findNgoByCode(input.inviteCode)) throw new ApiError("Invalid NGO invite code.");
	}
	if (input.role === "ngo" && !input.orgName?.trim()) throw new ApiError("Organization name is required.");
	return sendOtp({
		...input,
		phone
	});
}
function sendOtp(input) {
	const code = String(Math.floor(1e3 + Math.random() * 9e3));
	otps.set(input.phone, {
		code,
		exp: Date.now() + 3e5,
		input
	});
	return {
		phone: input.phone,
		devOtp: code,
		expiresAt: Date.now() + 3e5
	};
}
function resendOtp(phone) {
	const e = otps.get(phone);
	if (!e) throw new ApiError("Session expired. Please sign up again.");
	return sendOtp(e.input);
}
function findNgoByCode(code) {
	const c = code.trim().toUpperCase();
	return state.db.users.find((u) => u.role === "ngo" && u.inviteCode === c) ?? null;
}
function makeInviteCode(db) {
	const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
	let code = "";
	do
		code = Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * 32)]).join("");
	while (db.users.some((u) => u.inviteCode === code));
	return code;
}
async function verifyOtp(phone, code) {
	const e = otps.get(phone);
	if (!e) throw new ApiError("No OTP pending for this number.");
	if (Date.now() > e.exp) throw new ApiError("OTP expired. Tap resend.");
	if (e.code !== code) throw new ApiError("Incorrect OTP.");
	otps.delete(phone);
	const i = e.input;
	const id = uid("u");
	const parent = i.role === "volunteer" && i.inviteCode?.trim() ? await getNgoByInviteCode({ data: i.inviteCode }) : null;
	const user = {
		id,
		role: i.role,
		name: i.name.trim(),
		phone: i.phone,
		passwordHash: hash(i.password),
		area: i.area,
		lat: i.lat,
		lng: i.lng,
		verified: true,
		createdAt: Date.now()
	};
	if (i.role === "user") user.people = i.people ?? 1;
	if (i.role === "volunteer") Object.assign(user, {
		skills: i.skills ?? [],
		parentNgoId: parent?.id ?? null,
		availableNow: true,
		points: 0,
		deliveries: 0
	});
	if (i.role === "ngo") Object.assign(user, {
		orgName: i.orgName,
		regNo: i.regNo,
		domains: i.domains ?? [],
		inviteCode: makeInviteCode(state.db),
		radiusKm: 25,
		available: true
	});
	if (state.mode === "live") await createMongoUser({ data: user });
	commit((db) => {
		db.users.push(user);
		log(db, i.role === "volunteer" && parent ? `${user.name} joined ${parent.orgName} as a volunteer` : `${user.orgName ?? user.name} joined Sahyogi as ${i.role}`, "join");
		return db;
	});
	setSession(id);
	return id;
}
async function login(phone, password) {
	const p = phone.replace(/\D/g, "");
	const u = state.mode === "live" ? await getUserByPhone({ data: p }) : state.db.users.find((x) => x.phone === p);
	if (!u || u.passwordHash !== hash(password)) throw new ApiError("Invalid phone or password.");
	setSession(u.id);
	return u;
}
function loginAs(id) {
	setSession(id);
}
function setSession(id) {
	if (id) localStorage.setItem(sessKey(state.mode), id);
	else localStorage.removeItem(sessKey(state.mode));
	state = {
		...state,
		sessionUserId: id
	};
	emit();
}
var logout = () => setSession(null);
function setMode(mode) {
	localStorage.setItem(MODE_KEY, mode);
	state = {
		...state,
		mode,
		db: loadDb(mode),
		sessionUserId: localStorage.getItem(sessKey(mode))
	};
	channel?.postMessage("mode");
	emit();
}
function resetDemo() {
	localStorage.removeItem(dbKey("demo"));
	localStorage.removeItem(sessKey("demo"));
	if (state.mode === "demo") state = {
		...state,
		db: loadDb("demo"),
		sessionUserId: null
	};
	channel?.postMessage("reset");
	emit();
}
function submitRequest(input, t) {
	const id = uid("r");
	commit((db) => {
		const matches = matchNgos(db, input);
		const top = matches[0]?.n;
		const req = {
			...t,
			...input,
			id,
			userId: state.sessionUserId,
			status: top ? "matched" : "pending",
			matchedNgoIds: matches.slice(0, 3).map((m) => m.n.id),
			assignedNgoId: top?.id ?? null,
			assignedNgoName: top?.orgName ?? null,
			assignedVolunteerId: null,
			assignedVolunteerName: null,
			assignedAt: null,
			fulfilledAt: null,
			createdAt: Date.now()
		};
		db.requests.unshift(req);
		log(db, `New ${t.urgencyLevel} ${input.needType} request in ${input.area}`, "request");
		if (top) log(db, `${top.orgName} matched to ${input.needType} request in ${input.area}`, "match");
		return db;
	});
	return id;
}
/** PATCH /request/:id/assign equivalent with full server-side validation */
function assignVolunteer(requestId, body) {
	const me = state.db.users.find((u) => u.id === state.sessionUserId);
	if (!me || me.role !== "ngo") throw new ApiError("Only NGO admins can assign volunteers.");
	const volunteerId = body?.volunteerId?.trim();
	if (!volunteerId) throw new ApiError("Please select a volunteer from the list.");
	const v = state.db.users.find((u) => u.id === volunteerId);
	if (!v) throw new ApiError("Selected volunteer no longer exists.");
	if (v.role !== "volunteer") throw new ApiError("Selected user is not a volunteer.");
	if (v.parentNgoId !== me.id) throw new ApiError("This volunteer is not linked to your NGO.");
	if (v.availableNow === false) throw new ApiError(`${v.name} is currently unavailable.`);
	const r = state.db.requests.find((x) => x.id === requestId);
	if (!r) throw new ApiError("Request not found.");
	if (r.assignedNgoId && r.assignedNgoId !== me.id) throw new ApiError("This request is handled by another NGO.");
	if (r.status === "fulfilled" || r.status === "cancelled") throw new ApiError("This request is already closed.");
	commit((db) => {
		const x = db.requests.find((q) => q.id === requestId);
		Object.assign(x, {
			assignedVolunteerId: v.id,
			assignedVolunteerName: v.name,
			assignedAt: Date.now(),
			assignedNgoId: me.id,
			assignedNgoName: me.orgName ?? me.name,
			status: "assigned"
		});
		log(db, `${me.orgName} assigned ${v.name} to ${x.needType} request in ${x.area}`, "assign");
		return db;
	});
	return state.db.requests.find((x) => x.id === requestId);
}
function claimForNgo(requestId) {
	const me = state.db.users.find((u) => u.id === state.sessionUserId);
	if (!me || me.role !== "ngo") throw new ApiError("Only NGOs can accept requests.");
	commit((db) => {
		const x = db.requests.find((q) => q.id === requestId);
		if (!x) throw new ApiError("Request not found.");
		if (x.assignedNgoId && x.assignedNgoId !== me.id) throw new ApiError("Handled by another NGO.");
		Object.assign(x, {
			assignedNgoId: me.id,
			assignedNgoName: me.orgName,
			status: "matched"
		});
		log(db, `${me.orgName} accepted ${x.needType} request in ${x.area}`, "match");
		return db;
	});
}
function startMission(requestId) {
	const me = state.db.users.find((u) => u.id === state.sessionUserId);
	const r = state.db.requests.find((x) => x.id === requestId);
	if (!me || !r || r.assignedVolunteerId !== me.id) throw new ApiError("This mission is not assigned to you.");
	commit((db) => {
		db.requests.find((q) => q.id === requestId).status = "in_progress";
		return db;
	});
}
function fulfillRequest(requestId) {
	const me = state.db.users.find((u) => u.id === state.sessionUserId);
	const r = state.db.requests.find((x) => x.id === requestId);
	if (!r) throw new ApiError("Request not found.");
	if (!me) throw new ApiError("Please log in.");
	if (!(me.role === "volunteer" && r.assignedVolunteerId === me.id || me.role === "ngo" && r.assignedNgoId === me.id)) throw new ApiError("You are not allowed to fulfill this request.");
	if (r.status === "fulfilled") throw new ApiError("Already fulfilled.");
	commit((db) => {
		const x = db.requests.find((q) => q.id === requestId);
		x.status = "fulfilled";
		x.fulfilledAt = Date.now();
		if (x.assignedVolunteerId) {
			const v = db.users.find((u) => u.id === x.assignedVolunteerId);
			if (v) {
				v.deliveries = (v.deliveries ?? 0) + 1;
				v.points = (v.points ?? 0) + {
					critical: 50,
					high: 30,
					medium: 20,
					low: 10
				}[x.urgencyLevel];
			}
		}
		log(db, `${x.needType} request in ${x.area} fulfilled${x.assignedVolunteerName ? ` by ${x.assignedVolunteerName}` : ""}`, "fulfill");
		return db;
	});
}
function cancelRequest(requestId) {
	const r = state.db.requests.find((x) => x.id === requestId);
	if (!r || r.userId !== state.sessionUserId) throw new ApiError("You can only cancel your own requests.");
	commit((db) => {
		db.requests.find((q) => q.id === requestId).status = "cancelled";
		return db;
	});
}
function setAvailability(available) {
	const id = state.sessionUserId;
	commit((db) => {
		const u = db.users.find((x) => x.id === id);
		if (u) u.availableNow = available;
		return db;
	});
}
function regenerateInvite() {
	const id = state.sessionUserId;
	commit((db) => {
		const u = db.users.find((x) => x.id === id);
		if (u?.role === "ngo") u.inviteCode = makeInviteCode(db);
		return db;
	});
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var NEED_META = {
	food: {
		label: "Food",
		icon: Apple
	},
	medical: {
		label: "Medical",
		icon: HeartPulse
	},
	shelter: {
		label: "Shelter",
		icon: House
	},
	water: {
		label: "Water",
		icon: Droplets
	},
	rescue: {
		label: "Rescue",
		icon: LifeBuoy
	},
	education: {
		label: "Education",
		icon: BookOpen
	},
	clothing: {
		label: "Clothing",
		icon: Shirt
	},
	other: {
		label: "Other",
		icon: Package
	}
};
function NeedIcon({ type, className }) {
	const I = NEED_META[type].icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(I, { className });
}
function timeAgo(t) {
	const s = Math.max(1, Math.floor((Date.now() - t) / 1e3));
	if (s < 60) return `${s}s ago`;
	if (s < 3600) return `${Math.floor(s / 60)}m ago`;
	if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
	return `${Math.floor(s / 86400)}d ago`;
}
var URG = {
	critical: "bg-critical/15 text-critical border-critical/30",
	high: "bg-high/15 text-high border-high/30",
	medium: "bg-medium/20 text-foreground border-medium/40",
	low: "bg-low/15 text-low border-low/30"
};
function UrgencyBadge({ u }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide", URG[u]),
		children: [u === "critical" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pulse-dot size-1.5 rounded-full bg-critical" }), u]
	});
}
var STATUS = {
	pending: "bg-muted text-muted-foreground",
	matched: "bg-accent/15 text-accent",
	assigned: "bg-primary/15 text-primary",
	in_progress: "bg-high/15 text-high",
	fulfilled: "bg-success/15 text-success",
	cancelled: "bg-destructive/10 text-destructive"
};
function StatusBadge({ s }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize", STATUS[s]),
		children: s.replace("_", " ")
	});
}
var STATUS_STEPS = [
	"pending",
	"matched",
	"assigned",
	"in_progress",
	"fulfilled"
];
function applyTheme(t) {
	const dark = t === "dark" || t === "auto" && window.matchMedia("(prefers-color-scheme: dark)").matches;
	document.documentElement.classList.toggle("dark", dark);
}
function ThemeToggle() {
	const [t, setT] = (0, import_react.useState)("auto");
	(0, import_react.useEffect)(() => {
		const saved = localStorage.getItem("sahyogi-theme") || "auto";
		setT(saved);
		applyTheme(saved);
		const mq = window.matchMedia("(prefers-color-scheme: dark)");
		const on = () => applyTheme(localStorage.getItem("sahyogi-theme") || "auto");
		mq.addEventListener("change", on);
		return () => mq.removeEventListener("change", on);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex rounded-full border bg-card p-0.5",
		children: [
			{
				v: "light",
				I: Sun,
				label: "Light"
			},
			{
				v: "auto",
				I: Monitor,
				label: "Auto"
			},
			{
				v: "dark",
				I: Moon,
				label: "Dark"
			}
		].map(({ v, I, label }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			"aria-label": `${label} theme`,
			title: label,
			onClick: () => {
				setT(v);
				localStorage.setItem("sahyogi-theme", v);
				applyTheme(v);
			},
			className: cn("rounded-full p-1.5 transition", t === v ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(I, { className: "size-3.5" })
		}, v))
	});
}
function Logo({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/",
		className: cn("flex items-center gap-2", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HandHeart, { className: "size-5" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "leading-none",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-display block text-xl font-semibold",
				children: "Sahyogi"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground",
				children: "by Binary Minds"
			})]
		})]
	});
}
function Navbar() {
	const user = useSession();
	const connected = useStore((s) => s.connected);
	const mode = useStore((s) => s.mode);
	const [open, setOpen] = (0, import_react.useState)(false);
	const nav = useNavigate();
	const links = [
		{
			to: "/",
			label: "Home"
		},
		{
			to: "/map",
			label: "Live Map"
		},
		{
			to: "/request",
			label: "Request Help"
		},
		{
			to: "/analytics",
			label: "Analytics"
		},
		...user ? [{
			to: "/dashboard",
			label: "Dashboard"
		}] : []
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-[1000] border-b bg-background/85 backdrop-blur",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-7xl items-center gap-4 px-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "ml-6 hidden items-center gap-1 lg:flex",
					children: links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: l.to,
						activeOptions: { exact: l.to === "/" },
						className: "rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground",
						activeProps: { className: "bg-secondary !text-foreground" },
						children: l.label
					}, l.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ml-auto hidden items-center gap-3 md:flex",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1.5 text-xs font-medium text-muted-foreground",
							title: "Live connection",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-2 rounded-full", connected ? "pulse-dot bg-success" : "bg-destructive") }), connected ? "Live" : "Offline"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoSwitch, { mode }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}),
						user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/dashboard",
								className: "text-right leading-tight",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-sm font-semibold",
									children: user.orgName ?? user.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-[11px] capitalize text-muted-foreground",
									children: user.role === "ngo" ? "NGO Admin" : user.role === "user" ? "Citizen" : "Volunteer"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								"aria-label": "Log out",
								onClick: () => {
									logout();
									nav({ to: "/" });
								},
								className: "rounded-full border p-2 hover:bg-secondary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" })
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							className: "text-sm font-semibold hover:text-primary",
							children: "Log in"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/request",
							className: "rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-sm hover:opacity-90",
							children: "Get Help"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "ml-auto md:hidden",
					onClick: () => setOpen(!open),
					"aria-label": "Menu",
					children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {})
				})
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3 border-t bg-background p-4 md:hidden",
			children: [
				links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: l.to,
					onClick: () => setOpen(false),
					className: "block font-medium",
					children: l.label
				}, l.to)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoSwitch, { mode })]
				}),
				user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => {
						logout();
						setOpen(false);
						nav({ to: "/" });
					},
					className: "font-semibold text-destructive",
					children: [
						"Log out (",
						user.orgName ?? user.name,
						")"
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/login",
					onClick: () => setOpen(false),
					className: "block font-semibold text-primary",
					children: "Log in"
				})
			]
		})]
	});
}
function DemoSwitch({ mode }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center rounded-full border bg-card p-0.5 text-[11px] font-bold uppercase",
		children: ["demo", "live"].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: () => setMode(m),
			title: m === "demo" ? "Pre-seeded demo data" : "Your own clean workspace",
			className: cn("rounded-full px-2.5 py-1", mode === m ? m === "demo" ? "bg-accent text-accent-foreground" : "bg-ink text-ink-foreground" : "text-muted-foreground"),
			children: m
		}, m))
	});
}
function Footer() {
	const [sub, setSub] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "mt-24 bg-ink text-ink-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "md:col-span-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-2xl font-semibold",
							children: "Sahyogi"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm opacity-70",
							children: "Real-time disaster relief coordination connecting people in need, NGOs and volunteers."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-xs font-semibold uppercase tracking-widest opacity-60",
							children: "Built by Binary Minds"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "font-sans text-sm font-bold uppercase tracking-wider opacity-60",
					children: "Quick links"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-3 space-y-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/request",
							children: "Request help"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/map",
							children: "Live map"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/signup",
							children: "Join as NGO"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/signup",
							children: "Volunteer"
						}) })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "font-sans text-sm font-bold uppercase tracking-wider opacity-60",
					children: "Resources"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-3 space-y-2 text-sm opacity-90",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Emergency: 112" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Disaster helpline: 1078" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Ambulance: 108" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "underline",
							onClick: () => {
								resetDemo();
							},
							children: "Reset demo data"
						}) })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "font-sans text-sm font-bold uppercase tracking-wider opacity-60",
					children: "Alerts & updates"
				}), sub ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm",
					children: "You're subscribed to area alerts."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-3 flex gap-2",
					onSubmit: (e) => {
						e.preventDefault();
						setSub(true);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						required: true,
						type: "tel",
						placeholder: "Phone number",
						className: "min-w-0 flex-1 rounded-lg bg-ink-foreground/10 px-3 py-2 text-sm outline-none placeholder:opacity-50"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "rounded-lg bg-primary px-3 py-2 text-sm font-bold text-primary-foreground",
						children: "Subscribe"
					})]
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-ink-foreground/10 py-4 text-center text-xs opacity-60",
			children: "© 2026 Sahyogi · Binary Minds"
		})]
	});
}
function Page({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: cn("mx-auto max-w-7xl px-4 py-8", className),
		children
	});
}
function Card({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("rounded-2xl border bg-card p-5 shadow-sm", className),
		children
	});
}
function RequireAuth({ children }) {
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setReady(true), []);
	const user = useSession();
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-64 animate-pulse rounded-2xl bg-muted" }) });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {
		className: "grid min-h-[50vh] place-items-center text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-semibold",
				children: "Please log in"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted-foreground",
				children: "You need an account to view this page."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/login",
				className: "mt-6 inline-block rounded-full bg-primary px-6 py-2.5 font-bold text-primary-foreground",
				children: "Log in"
			})
		] })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function Field({ label, children, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mb-1 block text-sm font-semibold",
				children: label
			}),
			children,
			hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-1 block text-xs text-muted-foreground",
				children: hint
			})
		]
	});
}
//#endregion
export { submitRequest as A, matchNgos as C, setMode as D, setAvailability as E, verifyOtp as F, triage as M, useSession as N, startMission as O, useStore as P, loginAs as S, resendOtp as T, cancelRequest as _, Footer as a, fulfillRequest as b, Navbar as c, RequireAuth as d, STATUS_STEPS as f, badgeFor as g, assignVolunteer as h, Field as i, timeAgo as j, startSignup as k, NeedIcon as l, UrgencyBadge as m, DEMO_ACCOUNTS as n, NEED_META as o, StatusBadge as p, DEMO_PASSWORD as r, NEED_TYPES as s, Card as t, Page as u, claimForNgo as v, regenerateInvite as w, login as x, cn as y };
