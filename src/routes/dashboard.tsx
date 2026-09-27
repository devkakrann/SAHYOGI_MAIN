import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Award, BarChart3, Copy, MapPin, Phone, Plus, RefreshCw, Star, Truck, Users } from "lucide-react";
import { Card, NeedIcon, Page, RequireAuth, STATUS_STEPS, StatusBadge, UrgencyBadge, timeAgo } from "@/components/sahyogi";
import { MapView } from "@/components/MapView";
import {
  assignVolunteer, badgeFor, cancelRequest, claimForNgo, fulfillRequest, regenerateInvite, setAvailability, startMission,
  useSession, useStore, type HelpRequest, type User,
} from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Sahyogi" },
      { name: "description", content: "Your Sahyogi dashboard: requests, missions and NGO command center." },
      { property: "og:title", content: "Dashboard — Sahyogi" },
      { property: "og:description", content: "Track requests, assign volunteers and complete missions." },
    ],
  }),
  component: () => <RequireAuth><Dashboard /></RequireAuth>,
});

function Dashboard() {
  const user = useSession()!;
  if (user.role === "ngo") return <NgoDashboard me={user} />;
  if (user.role === "volunteer") return <VolunteerDashboard me={user} />;
  return <UserDashboard me={user} />;
}

const act = (fn: () => void, ok: string) => { try { fn(); toast.success(ok); } catch (e) { toast.error((e as Error).message); } };

// ============================ NGO ============================
function NgoDashboard({ me }: { me: User }) {
  const requests = useStore((s) => s.db.requests);
  const users = useStore((s) => s.db.users);
  const [tab, setTab] = useState<"active" | "open" | "done">("active");
  const [showMap, setShowMap] = useState(false);
  const [focus, setFocus] = useState<string | null>(null);
  const volunteers = users.filter((u) => u.role === "volunteer" && u.parentNgoId === me.id).map((v) => ({ ...v, id: String(v.id) }));
  const available = volunteers.filter((v) => v.availableNow !== false);
  const mine = requests.filter((r) => r.assignedNgoId === me.id || (r.matchedNgoIds.includes(me.id) && !r.assignedNgoId));
  const open = requests.filter((r) => !r.assignedNgoId && r.status === "pending");
  const list = (tab === "active" ? mine.filter((r) => r.status !== "fulfilled" && r.status !== "cancelled") : tab === "open" ? open : mine.filter((r) => r.status === "fulfilled"))
    .sort((a, b) => b.priorityScore - a.priorityScore);
  const stats = [
    { k: "Pending", v: mine.filter((r) => r.status === "pending").length + open.length },
    { k: "Matched", v: mine.filter((r) => r.status === "matched").length },
    { k: "Critical", v: mine.filter((r) => r.urgencyLevel === "critical" && r.status !== "fulfilled").length, c: "text-critical" },
    { k: "Fulfilled", v: mine.filter((r) => r.status === "fulfilled").length, c: "text-success" },
    { k: "Volunteers", v: volunteers.length },
  ];
  return (
    <Page>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-primary">{me.orgName}</p>
          <h1 className="text-4xl font-semibold">NGO Command Center</h1>
          <p className="text-muted-foreground">Manage requests, assign volunteers, track fulfillment.</p>
        </div>
        <div className="flex gap-2">
          <Link to="/analytics" className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold"><BarChart3 className="size-4" />Analytics</Link>
          <button onClick={() => setShowMap(!showMap)} className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-ink-foreground"><MapPin className="size-4" />Live Map</button>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-5">
        {stats.map((s) => <Card key={s.k} className="p-4"><div className="text-xs font-semibold uppercase text-muted-foreground">{s.k}</div><div className={cn("font-display text-3xl font-semibold", s.c)}>{s.v}</div></Card>)}
      </div>
      {showMap && <Card className="mt-6 p-2"><MapView requests={mine.concat(open)} ngos={[me]} height={420} heat focusId={focus} /></Card>}

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div>
          <div className="mb-4 flex gap-2">
            {([["active", `Active (${mine.filter((r) => r.status !== "fulfilled" && r.status !== "cancelled").length})`], ["open", `Unclaimed nearby (${open.length})`], ["done", "Fulfilled"]] as const).map(([k, l]) => (
              <button key={k} onClick={() => setTab(k)} className={cn("rounded-full px-4 py-1.5 text-sm font-semibold", tab === k ? "bg-primary text-primary-foreground" : "bg-secondary")}>{l}</button>
            ))}
          </div>
          <div className="space-y-3">
            {list.map((r) => <NgoRequestCard key={r.id} r={r} me={me} volunteers={volunteers} available={available} onMap={() => { setShowMap(true); setFocus(r.id); }} />)}
            {!list.length && <Card className="text-center text-muted-foreground">Nothing here right now.</Card>}
          </div>
        </div>
        <aside className="space-y-4">
          <Card>
            <div className="text-sm font-semibold">Volunteer Invite Code</div>
            <div className="mt-2 flex items-center gap-2">
              <code className="flex-1 rounded-lg bg-secondary px-3 py-2 text-center font-mono text-lg font-bold tracking-widest">{me.inviteCode}</code>
              <button aria-label="Copy invite code" onClick={() => { navigator.clipboard?.writeText(me.inviteCode ?? ""); toast.success("Invite code copied"); }} className="rounded-lg border p-2.5 hover:bg-secondary"><Copy className="size-4" /></button>
              <button aria-label="Regenerate invite code" onClick={() => act(regenerateInvite, "New invite code generated")} className="rounded-lg border p-2.5 hover:bg-secondary"><RefreshCw className="size-4" /></button>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Volunteers enter this at signup to join your NGO.</p>
          </Card>
          <Card>
            <div className="flex items-center justify-between"><span className="text-sm font-semibold">Volunteer snapshot</span><Users className="size-4 text-muted-foreground" /></div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-center text-sm">
              <div className="rounded-lg bg-success/10 p-2"><div className="text-2xl font-bold text-success">{available.length}</div>Available</div>
              <div className="rounded-lg bg-muted p-2"><div className="text-2xl font-bold">{volunteers.length - available.length}</div>Busy / off</div>
            </div>
            <ul className="mt-4 space-y-2">
              {volunteers.map((v) => {
                const load = requests.filter((r) => r.assignedVolunteerId === v.id && (r.status === "assigned" || r.status === "in_progress")).length;
                return (
                  <li key={v.id} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2"><span className={cn("size-2 rounded-full", v.availableNow !== false ? "bg-success" : "bg-muted-foreground")} />{v.name}</span>
                    <span className="text-xs text-muted-foreground">{load} active · {v.deliveries ?? 0} done</span>
                  </li>
                );
              })}
              {!volunteers.length && <li className="text-sm text-muted-foreground">No volunteers linked yet. Share your invite code!</li>}
            </ul>
          </Card>
        </aside>
      </div>
    </Page>
  );
}

function NgoRequestCard({ r, me, volunteers, available, onMap }: { r: HelpRequest; me: User; volunteers: User[]; available: User[]; onMap: () => void }) {
  const [sel, setSel] = useState("");
  const owned = r.assignedNgoId === me.id;
  const assignable = owned && (r.status === "matched" || r.status === "pending" || r.status === "assigned");
  return (
    <Card className={cn(r.urgencyLevel === "critical" && r.status !== "fulfilled" && "border-critical/50")}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-primary/10"><NeedIcon type={r.needType} className="size-5 text-primary" /></span>
          <div>
            <div className="font-semibold capitalize">{r.needType} · {r.name}</div>
            <div className="text-xs text-muted-foreground">{r.area} {r.pincode} · {r.people} people · {timeAgo(r.createdAt)}</div>
          </div>
        </div>
        <div className="flex items-center gap-2"><UrgencyBadge u={r.urgencyLevel} /><StatusBadge s={r.status} /></div>
      </div>
      <p className="mt-3 text-sm">{r.description}</p>
      <div className="mt-3 rounded-lg bg-secondary px-3 py-2 text-xs"><b>AI score {r.aiScore}</b> · {Math.round(r.confidenceScore * 100)}% confidence · {r.aiAction}</div>
      {r.assignedVolunteerName && <div className="mt-3 text-sm">Assigned volunteer: <b>{r.assignedVolunteerName}</b>{r.assignedAt && <span className="text-muted-foreground"> · {timeAgo(r.assignedAt)}</span>}</div>}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {!r.assignedNgoId && <button onClick={() => act(() => claimForNgo(r.id), "Request accepted")} className="rounded-full bg-accent px-4 py-2 text-sm font-bold text-accent-foreground">Accept request</button>}
        {assignable && (
          volunteers.length === 0 ? <span className="text-sm text-muted-foreground">No volunteers linked yet. Share your invite code!</span>
          : available.length === 0 ? <span className="text-sm text-muted-foreground">No available volunteers right now.</span>
          : (
            <>
              <select aria-label="Assign volunteer" className="inp w-auto py-2" value={sel} onChange={(e) => setSel(e.target.value)}>
                <option value="">{r.assignedVolunteerId ? "Reassign volunteer…" : "Assign Volunteer…"}</option>
                {available.map((v) => <option key={v.id} value={v.id}>{v.name}{v.skills?.length ? ` — ${v.skills.join(", ")}` : ""}</option>)}
              </select>
              <button disabled={!sel} onClick={() => act(() => { assignVolunteer(r.id, { volunteerId: sel }); setSel(""); }, "Volunteer assigned")}
                className="rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground disabled:opacity-40">Assign</button>
            </>
          )
        )}
        {owned && r.status !== "fulfilled" && r.status !== "cancelled" && <button onClick={() => act(() => fulfillRequest(r.id), "Marked fulfilled")} className="rounded-full border px-4 py-2 text-sm font-semibold">Mark fulfilled</button>}
        <button onClick={onMap} className="ml-auto inline-flex items-center gap-1 text-sm font-semibold text-accent"><MapPin className="size-4" />Map</button>
        <a href={`tel:${r.phone}`} className="inline-flex items-center gap-1 text-sm font-semibold"><Phone className="size-4" />Call</a>
      </div>
    </Card>
  );
}

// ============================ VOLUNTEER ============================
function VolunteerDashboard({ me }: { me: User }) {
  const requests = useStore((s) => s.db.requests);
  const users = useStore((s) => s.db.users);
  const [focus, setFocus] = useState<string | null>(null);
  const ngo = users.find((u) => u.id === me.parentNgoId);
  const missions = requests.filter((r) => r.assignedVolunteerId === me.id);
  const active = missions.filter((r) => r.status === "assigned" || r.status === "in_progress").sort((a, b) => b.priorityScore - a.priorityScore);
  const done = missions.filter((r) => r.status === "fulfilled");
  const badge = badgeFor(me.deliveries);
  const pct = badge.next ? Math.min(100, ((me.deliveries ?? 0) / badge.next) * 100) : 100;
  return (
    <Page>
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <aside className="space-y-4">
          <Card>
            <div className="flex items-center gap-3">
              <span className="font-display grid size-14 place-items-center rounded-2xl bg-primary text-2xl text-primary-foreground">{me.name[0]}</span>
              <div><div className="text-lg font-bold">{me.name}</div><div className="text-sm text-muted-foreground">{ngo ? ngo.orgName : "Independent volunteer"}</div></div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg bg-secondary p-2"><Star className="mx-auto size-4 text-primary" /><div className="font-bold">{me.points ?? 0}</div><div className="text-[11px]">Points</div></div>
              <div className="rounded-lg bg-secondary p-2"><Truck className="mx-auto size-4 text-primary" /><div className="font-bold">{me.deliveries ?? 0}</div><div className="text-[11px]">Deliveries</div></div>
              <div className="rounded-lg bg-secondary p-2"><Award className="mx-auto size-4 text-primary" /><div className="font-bold">{badge.name}</div><div className="text-[11px]">Badge</div></div>
            </div>
            <label className="mt-4 flex items-center justify-between rounded-xl border p-3 text-sm font-semibold">
              {me.availableNow !== false ? "Available for missions" : "Unavailable"}
              <input type="checkbox" className="size-5 accent-[var(--color-primary)]" checked={me.availableNow !== false} onChange={(e) => act(() => setAvailability(e.target.checked), e.target.checked ? "You're available" : "You're off duty")} />
            </label>
            {!ngo && <p className="mt-3 text-xs text-muted-foreground">You're not linked to an NGO yet. Ask an NGO for their invite code and sign up with it to receive missions.</p>}
          </Card>
          <Card>
            <div className="text-sm font-semibold">Badge progress</div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full bg-primary" style={{ width: `${pct}%` }} /></div>
            <p className="mt-2 text-xs text-muted-foreground">{badge.next ? `${badge.next - (me.deliveries ?? 0)} more deliveries to the next badge` : "Top badge unlocked!"}</p>
            <div className="mt-3 flex gap-2 text-[11px] font-bold uppercase">{["Rookie", "Responder", "Hero", "Guardian"].map((b) => <span key={b} className={cn("rounded-full px-2 py-0.5", b === badge.name ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground")}>{b}</span>)}</div>
          </Card>
        </aside>
        <div>
          <h1 className="text-4xl font-semibold">My Missions</h1>
          <p className="text-muted-foreground">{active.length} active · {done.length} completed</p>
          {active.length > 0 && <Card className="mt-4 p-2"><MapView requests={active} height={300} focusId={focus} /></Card>}
          <div className="mt-4 space-y-3">
            {active.map((r) => (
              <Card key={r.id}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex gap-3"><NeedIcon type={r.needType} className="size-6 text-primary" /><div><div className="font-semibold capitalize">{r.needType} for {r.name}</div><div className="text-xs text-muted-foreground">{r.area} {r.pincode} · {r.people} people · assigned {r.assignedAt ? timeAgo(r.assignedAt) : ""}</div></div></div>
                  <div className="flex gap-2"><UrgencyBadge u={r.urgencyLevel} /><StatusBadge s={r.status} /></div>
                </div>
                <p className="mt-3 text-sm">{r.description}</p>
                <div className="mt-2 text-xs text-muted-foreground">Action: {r.aiAction}</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {r.status === "assigned" && <button onClick={() => act(() => startMission(r.id), "Mission started")} className="rounded-full bg-accent px-4 py-2 text-sm font-bold text-accent-foreground">Start mission</button>}
                  <button onClick={() => act(() => fulfillRequest(r.id), "Mission fulfilled — great work!")} className="rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">Mark fulfilled</button>
                  <button onClick={() => setFocus(r.id)} className="inline-flex items-center gap-1 rounded-full border px-4 py-2 text-sm font-semibold"><MapPin className="size-4" />View map</button>
                  <a href={`tel:${r.phone}`} className="inline-flex items-center gap-1 rounded-full border px-4 py-2 text-sm font-semibold"><Phone className="size-4" />{r.phone}</a>
                </div>
              </Card>
            ))}
            {!active.length && <Card className="text-center text-muted-foreground">No active missions. {me.availableNow === false ? "Turn on availability to receive missions." : "Your NGO will assign you soon."}</Card>}
          </div>
          <h2 className="mt-10 text-2xl font-semibold">Completed missions</h2>
          <div className="mt-3 space-y-2">
            {done.map((r) => <div key={r.id} className="flex items-center justify-between rounded-xl border bg-card px-4 py-3 text-sm"><span className="capitalize">{r.needType} · {r.area}</span><span className="text-muted-foreground">{r.fulfilledAt && timeAgo(r.fulfilledAt)}</span></div>)}
            {!done.length && <p className="text-sm text-muted-foreground">None yet.</p>}
          </div>
        </div>
      </div>
    </Page>
  );
}

// ============================ USER ============================
function UserDashboard({ me }: { me: User }) {
  const requests = useStore((s) => s.db.requests);
  const mine = requests.filter((r) => r.userId === me.id || (!r.userId && r.phone === me.phone));
  const active = mine.filter((r) => r.status !== "fulfilled" && r.status !== "cancelled");
  const history = mine.filter((r) => r.status === "fulfilled" || r.status === "cancelled");
  return (
    <Page>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><p className="text-sm font-semibold text-primary">Namaste, {me.name}</p><h1 className="text-4xl font-semibold">My requests</h1><p className="text-muted-foreground">{me.area} · household of {me.people ?? 1}</p></div>
        <Link to="/request" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-bold text-primary-foreground"><Plus className="size-4" />New request</Link>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-3">
        <Card className="p-4"><div className="text-xs font-semibold uppercase text-muted-foreground">Total</div><div className="font-display text-3xl font-semibold">{mine.length}</div></Card>
        <Card className="p-4"><div className="text-xs font-semibold uppercase text-muted-foreground">Active</div><div className="font-display text-3xl font-semibold text-primary">{active.length}</div></Card>
        <Card className="p-4"><div className="text-xs font-semibold uppercase text-muted-foreground">Fulfilled</div><div className="font-display text-3xl font-semibold text-success">{mine.filter((r) => r.status === "fulfilled").length}</div></Card>
      </div>
      <div className="mt-6 space-y-4">
        {active.map((r) => (
          <Card key={r.id}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex gap-3"><NeedIcon type={r.needType} className="size-6 text-primary" /><div><div className="font-semibold capitalize">{r.needType} request</div><div className="text-xs text-muted-foreground">{r.area} · {timeAgo(r.createdAt)}</div></div></div>
              <div className="flex gap-2"><UrgencyBadge u={r.urgencyLevel} /><StatusBadge s={r.status} /></div>
            </div>
            <ol className="mt-5 grid grid-cols-5 gap-1">
              {STATUS_STEPS.map((s, i) => {
                const reached = STATUS_STEPS.indexOf(r.status) >= i;
                return <li key={s} className="text-[11px] font-semibold capitalize"><div className={cn("h-1.5 rounded-full", reached ? "bg-primary" : "bg-muted")} /><span className={cn("mt-1 block", !reached && "text-muted-foreground")}>{s.replace("_", " ")}</span></li>;
              })}
            </ol>
            <div className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
              <div>NGO matched: <b>{r.assignedNgoName ?? "Searching nearby…"}</b></div>
              <div>Assigned Volunteer: <b>{r.assignedVolunteerName ?? "Awaiting assignment"}</b></div>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{r.aiSummary}</p>
            {(r.status === "pending" || r.status === "matched") && <button onClick={() => act(() => cancelRequest(r.id), "Request cancelled")} className="mt-3 text-sm font-semibold text-destructive">Cancel request</button>}
          </Card>
        ))}
        {!active.length && <Card className="text-center text-muted-foreground">No active requests. Need help? Submit a new request anytime.</Card>}
      </div>
      <h2 className="mt-10 text-2xl font-semibold">History</h2>
      <div className="mt-3 space-y-2">
        {history.map((r) => (
          <div key={r.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border bg-card px-4 py-3 text-sm">
            <span className="capitalize">{r.needType} · {r.area}</span>
            <span className="text-muted-foreground">{r.assignedVolunteerName ? `by ${r.assignedVolunteerName}` : ""}</span>
            <StatusBadge s={r.status} />
          </div>
        ))}
        {!history.length && <p className="text-sm text-muted-foreground">No past requests.</p>}
      </div>
    </Page>
  );
}
