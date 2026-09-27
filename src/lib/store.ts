import { useSyncExternalStore } from "react";
import { triage, type TriageResult } from "./triage";
import { buildSeed } from "./seed";
import {
  getUserByPhone,
  getUserById,
  createMongoUser,
  getNgoByInviteCode,
} from "./mongo.functions";

export type Role = "user" | "volunteer" | "ngo";
export type NeedType =
  | "food" | "medical" | "shelter" | "water" | "rescue" | "education" | "clothing" | "other";
export type Status = "pending" | "matched" | "assigned" | "in_progress" | "fulfilled" | "cancelled";
export type Urgency = "low" | "medium" | "high" | "critical";

export const NEED_TYPES: NeedType[] = [
  "food", "medical", "shelter", "water", "rescue", "education", "clothing", "other",
];

export interface User {
  id: string;
  role: Role;
  name: string;
  phone: string;
  passwordHash: string;
  area: string;
  lat: number;
  lng: number;
  verified: boolean;
  createdAt: number;
  people?: number;
  skills?: string[];
  parentNgoId?: string | null;
  availableNow?: boolean;
  points?: number;
  deliveries?: number;
  orgName?: string;
  regNo?: string;
  domains?: NeedType[];
  inviteCode?: string;
  radiusKm?: number;
  available?: boolean;
}

export interface HelpRequest extends TriageResult {
  id: string;
  userId: string | null;
  name: string;
  phone: string;
  needType: NeedType;
  description: string;
  area: string;
  pincode: string;
  lat: number;
  lng: number;
  people: number;
  status: Status;
  matchedNgoIds: string[];
  assignedNgoId: string | null;
  assignedNgoName: string | null;
  assignedVolunteerId: string | null;
  assignedVolunteerName: string | null;
  assignedAt: number | null;
  fulfilledAt: number | null;
  createdAt: number;
}

export interface Activity {
  id: string;
  at: number;
  text: string;
  kind: "request" | "assign" | "fulfill" | "join" | "match";
}

export interface DB {
  users: User[];
  requests: HelpRequest[];
  activity: Activity[];
}

interface State {
  mode: "demo" | "live";
  db: DB;
  sessionUserId: string | null;
  connected: boolean;
}

const MODE_KEY = "sahyogi-mode";
const dbKey = (m: string) => `sahyogi-db-${m}`;
const sessKey = (m: string) => `sahyogi-session-${m}`;

export function hash(s: string): string {
  let h1 = 0xdeadbeef ^ s.length, h2 = 0x41c6ce57 ^ s.length;
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    h1 = Math.imul(h1 ^ c, 2654435761);
    h2 = Math.imul(h2 ^ c, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return "h" + (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36);
}

export const uid = (p = "") => p + Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);

const empty: DB = { users: [], requests: [], activity: [] };
let state: State = { mode: "demo", db: empty, sessionUserId: null, connected: false };
const listeners = new Set<() => void>();
let channel: BroadcastChannel | null = null;
let initialized = false;

function emit() {
  listeners.forEach((l) => l());
}

function loadDb(mode: "demo" | "live"): DB {
  const raw = localStorage.getItem(dbKey(mode));
  if (raw) {
    try { return JSON.parse(raw) as DB; } catch { /* reseed */ }
  }
  const db = mode === "demo" ? buildSeed() : { ...empty, users: [], requests: [], activity: [] };
  localStorage.setItem(dbKey(mode), JSON.stringify(db));
  return db;
}

function init() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;
  const mode = (localStorage.getItem(MODE_KEY) as "demo" | "live") || "demo";
  state = { mode, db: loadDb(mode), sessionUserId: localStorage.getItem(sessKey(mode)), connected: true };
  if ("BroadcastChannel" in window) {
    channel = new BroadcastChannel("sahyogi-live");
    channel.onmessage = () => {
      const m = (localStorage.getItem(MODE_KEY) as "demo" | "live") || "demo";
      state = { ...state, mode: m, db: loadDb(m), sessionUserId: localStorage.getItem(sessKey(m)) };
      emit();
    };
  }
  window.addEventListener("online", () => { state = { ...state, connected: true }; emit(); });
  window.addEventListener("offline", () => { state = { ...state, connected: false }; emit(); });
}

function commit(mut: (db: DB) => DB) {
  const db = mut(structuredClone(state.db));
  state = { ...state, db };
  localStorage.setItem(dbKey(state.mode), JSON.stringify(db));
  channel?.postMessage("update");
  emit();
}

function log(db: DB, text: string, kind: Activity["kind"]) {
  db.activity.unshift({ id: uid("a"), at: Date.now(), text, kind });
  db.activity = db.activity.slice(0, 60);
}

const serverSnapshot: State = { mode: "demo", db: empty, sessionUserId: null, connected: false };

export function useStore<T>(sel: (s: State) => T): T {
  return useSyncExternalStore(
    (l) => { init(); listeners.add(l); return () => { listeners.delete(l); }; },
    () => { init(); return sel(state); },
    () => sel(serverSnapshot),
  );
}

export function useSession() {
  const id = useStore((s) => s.sessionUserId);
  const users = useStore((s) => s.db.users);
  return users.find((u) => u.id === id) ?? null;
}

// ----------------------------- badges -----------------------------
export function badgeFor(deliveries = 0) {
  if (deliveries >= 25) return { name: "Guardian", next: null as number | null };
  if (deliveries >= 10) return { name: "Hero", next: 25 };
  if (deliveries >= 3) return { name: "Responder", next: 10 };
  return { name: "Rookie", next: 3 };
}

// ----------------------------- geo -----------------------------
export function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371, dLat = ((b.lat - a.lat) * Math.PI) / 180, dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const x = Math.sin(dLat / 2) ** 2 + Math.cos((a.lat * Math.PI) / 180) * Math.cos((b.lat * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
}

export function matchNgos(db: DB, p: { lat: number; lng: number; needType: NeedType }) {
  return db.users
    .filter((u) => u.role === "ngo" && u.available !== false)
    .map((n) => ({ n, d: distanceKm(p, n), serves: (n.domains ?? []).includes(p.needType) }))
    .filter((x) => x.serves && x.d <= (x.n.radiusKm ?? 25))
    .sort((a, b) => a.d - b.d);
}

// ----------------------------- auth -----------------------------
export class ApiError extends Error {}

export interface SignupInput {
  role: Role; name: string; phone: string; password: string; area: string;
  lat: number; lng: number; people?: number; skills?: string[]; inviteCode?: string;
  orgName?: string; regNo?: string; domains?: NeedType[];
}

const otps = new Map<string, { code: string; exp: number; input: SignupInput }>();

export async function startSignup(input: SignupInput) {
  const phone = input.phone.replace(/\D/g, "");
  if (phone.length < 10) throw new ApiError("Enter a valid 10-digit phone number.");
  if (input.password.length < 6) throw new ApiError("Password must be at least 6 characters.");
  if (state.mode === "demo") {
  if (state.db.users.some((u) => u.phone === phone)) {
    throw new ApiError("An account with this phone already exists.");
  }
} else {
  const existing = await getUserByPhone({ data: phone });
  if (existing) {
    throw new ApiError("An account with this phone already exists.");
  }
}
  if (input.role === "volunteer" && input.inviteCode?.trim()) {
    const ngo = findNgoByCode(input.inviteCode);
    if (!ngo) throw new ApiError("Invalid NGO invite code.");
  }
  if (input.role === "ngo" && !input.orgName?.trim()) throw new ApiError("Organization name is required.");
  return sendOtp({ ...input, phone });
}

function sendOtp(input: SignupInput) {
  const code = String(Math.floor(1000 + Math.random() * 9000));
  otps.set(input.phone, { code, exp: Date.now() + 5 * 60_000, input });
  return { phone: input.phone, devOtp: code, expiresAt: Date.now() + 5 * 60_000 };
}

export function resendOtp(phone: string) {
  const e = otps.get(phone);
  if (!e) throw new ApiError("Session expired. Please sign up again.");
  return sendOtp(e.input);
}

function findNgoByCode(code: string) {
  const c = code.trim().toUpperCase();
  return state.db.users.find((u) => u.role === "ngo" && u.inviteCode === c) ?? null;
}

export function makeInviteCode(db: DB) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  do { code = Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join(""); }
  while (db.users.some((u) => u.inviteCode === code));
  return code;
}

export async function verifyOtp(phone: string, code: string) {
  const e = otps.get(phone);
  if (!e) throw new ApiError("No OTP pending for this number.");
  if (Date.now() > e.exp) throw new ApiError("OTP expired. Tap resend.");
  if (e.code !== code) throw new ApiError("Incorrect OTP.");

  otps.delete(phone);

  const i = e.input;
  const id = uid("u");

  const parent =
    i.role === "volunteer" && i.inviteCode?.trim()
      ? await getNgoByInviteCode({ data: i.inviteCode })
      : null;

  const user: User = {
    id,
    role: i.role,
    name: i.name.trim(),
    phone: i.phone,
    passwordHash: hash(i.password),
    area: i.area,
    lat: i.lat,
    lng: i.lng,
    verified: true,
    createdAt: Date.now(),
  };

  if (i.role === "user") {
    user.people = i.people ?? 1;
  }

  if (i.role === "volunteer") {
    Object.assign(user, {
      skills: i.skills ?? [],
      parentNgoId: parent?.id ?? null,
      availableNow: true,
      points: 0,
      deliveries: 0,
    });
  }

  if (i.role === "ngo") {
    Object.assign(user, {
      orgName: i.orgName,
      regNo: i.regNo,
      domains: i.domains ?? [],
      inviteCode: makeInviteCode(state.db),
      radiusKm: 25,
      available: true,
    });
  }

  if (state.mode === "live") {
    await createMongoUser({ data: user });
  }

  commit((db) => {
    db.users.push(user);

    log(
      db,
      i.role === "volunteer" && parent
        ? `${user.name} joined ${parent.orgName} as a volunteer`
        : `${user.orgName ?? user.name} joined Sahyogi as ${i.role}`,
      "join",
    );

    return db;
  });

  setSession(id);
  return id;
}

export async function login(phone: string, password: string) {
  const p = phone.replace(/\D/g, "");

  const u =
    state.mode === "live"
      ? await getUserByPhone({ data: p })
      : state.db.users.find((x) => x.phone === p);

  if (!u || u.passwordHash !== hash(password)) {
    throw new ApiError("Invalid phone or password.");
  }

  setSession(u.id);

  return u;
}

export function loginAs(id: string) { setSession(id); }

function setSession(id: string | null) {
  if (id) localStorage.setItem(sessKey(state.mode), id); else localStorage.removeItem(sessKey(state.mode));
  state = { ...state, sessionUserId: id };
  emit();
}
export const logout = () => setSession(null);

export function setMode(mode: "demo" | "live") {
  localStorage.setItem(MODE_KEY, mode);
  state = { ...state, mode, db: loadDb(mode), sessionUserId: localStorage.getItem(sessKey(mode)) };
  channel?.postMessage("mode");
  emit();
}

export function resetDemo() {
  localStorage.removeItem(dbKey("demo"));
  localStorage.removeItem(sessKey("demo"));
  if (state.mode === "demo") { state = { ...state, db: loadDb("demo"), sessionUserId: null }; }
  channel?.postMessage("reset");
  emit();
}

// ----------------------------- requests -----------------------------
export interface RequestInput {
  needType: NeedType; description: string; name: string; phone: string; area: string;
  pincode: string; lat: number; lng: number; people: number;
}

export function submitRequest(input: RequestInput, t: TriageResult) {
  const id = uid("r");
  commit((db) => {
    const matches = matchNgos(db, input);
    const top = matches[0]?.n;
    const req: HelpRequest = {
      ...t, ...input, id, userId: state.sessionUserId,
      status: top ? "matched" : "pending",
      matchedNgoIds: matches.slice(0, 3).map((m) => m.n.id),
      assignedNgoId: top?.id ?? null, assignedNgoName: top?.orgName ?? null,
      assignedVolunteerId: null, assignedVolunteerName: null, assignedAt: null, fulfilledAt: null,
      createdAt: Date.now(),
    };
    db.requests.unshift(req);
    log(db, `New ${t.urgencyLevel} ${input.needType} request in ${input.area}`, "request");
    if (top) log(db, `${top.orgName} matched to ${input.needType} request in ${input.area}`, "match");
    return db;
  });
  return id;
}

/** PATCH /request/:id/assign equivalent with full server-side validation */
export function assignVolunteer(requestId: string, body: { volunteerId: string }) {
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
    const x = db.requests.find((q) => q.id === requestId)!;
    Object.assign(x, {
      assignedVolunteerId: v.id, assignedVolunteerName: v.name, assignedAt: Date.now(),
      assignedNgoId: me.id, assignedNgoName: me.orgName ?? me.name, status: "assigned" as Status,
    });
    log(db, `${me.orgName} assigned ${v.name} to ${x.needType} request in ${x.area}`, "assign");
    return db;
  });
  return state.db.requests.find((x) => x.id === requestId)!;
}

export function claimForNgo(requestId: string) {
  const me = state.db.users.find((u) => u.id === state.sessionUserId);
  if (!me || me.role !== "ngo") throw new ApiError("Only NGOs can accept requests.");
  commit((db) => {
    const x = db.requests.find((q) => q.id === requestId);
    if (!x) throw new ApiError("Request not found.");
    if (x.assignedNgoId && x.assignedNgoId !== me.id) throw new ApiError("Handled by another NGO.");
    Object.assign(x, { assignedNgoId: me.id, assignedNgoName: me.orgName, status: "matched" as Status });
    log(db, `${me.orgName} accepted ${x.needType} request in ${x.area}`, "match");
    return db;
  });
}

export function startMission(requestId: string) {
  const me = state.db.users.find((u) => u.id === state.sessionUserId);
  const r = state.db.requests.find((x) => x.id === requestId);
  if (!me || !r || r.assignedVolunteerId !== me.id) throw new ApiError("This mission is not assigned to you.");
  commit((db) => { db.requests.find((q) => q.id === requestId)!.status = "in_progress"; return db; });
}

export function fulfillRequest(requestId: string) {
  const me = state.db.users.find((u) => u.id === state.sessionUserId);
  const r = state.db.requests.find((x) => x.id === requestId);
  if (!r) throw new ApiError("Request not found.");
  if (!me) throw new ApiError("Please log in.");
  const allowed = (me.role === "volunteer" && r.assignedVolunteerId === me.id) || (me.role === "ngo" && r.assignedNgoId === me.id);
  if (!allowed) throw new ApiError("You are not allowed to fulfill this request.");
  if (r.status === "fulfilled") throw new ApiError("Already fulfilled.");
  commit((db) => {
    const x = db.requests.find((q) => q.id === requestId)!;
    x.status = "fulfilled"; x.fulfilledAt = Date.now();
    if (x.assignedVolunteerId) {
      const v = db.users.find((u) => u.id === x.assignedVolunteerId);
      if (v) {
        v.deliveries = (v.deliveries ?? 0) + 1;
        v.points = (v.points ?? 0) + ({ critical: 50, high: 30, medium: 20, low: 10 }[x.urgencyLevel]);
      }
    }
    log(db, `${x.needType} request in ${x.area} fulfilled${x.assignedVolunteerName ? ` by ${x.assignedVolunteerName}` : ""}`, "fulfill");
    return db;
  });
}

export function cancelRequest(requestId: string) {
  const r = state.db.requests.find((x) => x.id === requestId);
  if (!r || r.userId !== state.sessionUserId) throw new ApiError("You can only cancel your own requests.");
  commit((db) => { db.requests.find((q) => q.id === requestId)!.status = "cancelled"; return db; });
}

export function setAvailability(available: boolean) {
  const id = state.sessionUserId;
  commit((db) => { const u = db.users.find((x) => x.id === id); if (u) u.availableNow = available; return db; });
}

export function regenerateInvite() {
  const id = state.sessionUserId;
  commit((db) => { const u = db.users.find((x) => x.id === id); if (u?.role === "ngo") u.inviteCode = makeInviteCode(db); return db; });
}

export { triage };
