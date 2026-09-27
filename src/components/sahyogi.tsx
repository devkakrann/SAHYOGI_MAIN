import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  Apple, BookOpen, Droplets, HandHeart, HeartPulse, Home, LifeBuoy, LogOut, Menu, Monitor, Moon, Package, Shirt, Sun, X,
} from "lucide-react";
import { logout, setMode, resetDemo, useSession, useStore, type NeedType, type Status, type Urgency } from "@/lib/store";
import { cn } from "@/lib/utils";

export const NEED_META: Record<NeedType, { label: string; icon: typeof Apple }> = {
  food: { label: "Food", icon: Apple },
  medical: { label: "Medical", icon: HeartPulse },
  shelter: { label: "Shelter", icon: Home },
  water: { label: "Water", icon: Droplets },
  rescue: { label: "Rescue", icon: LifeBuoy },
  education: { label: "Education", icon: BookOpen },
  clothing: { label: "Clothing", icon: Shirt },
  other: { label: "Other", icon: Package },
};

export function NeedIcon({ type, className }: { type: NeedType; className?: string }) {
  const I = NEED_META[type].icon;
  return <I className={className} />;
}

export function timeAgo(t: number) {
  const s = Math.max(1, Math.floor((Date.now() - t) / 1000));
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

const URG: Record<Urgency, string> = {
  critical: "bg-critical/15 text-critical border-critical/30",
  high: "bg-high/15 text-high border-high/30",
  medium: "bg-medium/20 text-foreground border-medium/40",
  low: "bg-low/15 text-low border-low/30",
};
export function UrgencyBadge({ u }: { u: Urgency }) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide", URG[u])}>
      {u === "critical" && <span className="pulse-dot size-1.5 rounded-full bg-critical" />}
      {u}
    </span>
  );
}

const STATUS: Record<Status, string> = {
  pending: "bg-muted text-muted-foreground",
  matched: "bg-accent/15 text-accent",
  assigned: "bg-primary/15 text-primary",
  in_progress: "bg-high/15 text-high",
  fulfilled: "bg-success/15 text-success",
  cancelled: "bg-destructive/10 text-destructive",
};
export function StatusBadge({ s }: { s: Status }) {
  return <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize", STATUS[s])}>{s.replace("_", " ")}</span>;
}

export const STATUS_STEPS: Status[] = ["pending", "matched", "assigned", "in_progress", "fulfilled"];

// ----------------------------- theme -----------------------------
type Theme = "light" | "auto" | "dark";
function applyTheme(t: Theme) {
  const dark = t === "dark" || (t === "auto" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", dark);
}
function ThemeToggle() {
  const [t, setT] = useState<Theme>("auto");
  useEffect(() => {
    const saved = (localStorage.getItem("sahyogi-theme") as Theme) || "auto";
    setT(saved);
    applyTheme(saved);
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const on = () => applyTheme((localStorage.getItem("sahyogi-theme") as Theme) || "auto");
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  const opts: { v: Theme; I: typeof Sun; label: string }[] = [
    { v: "light", I: Sun, label: "Light" }, { v: "auto", I: Monitor, label: "Auto" }, { v: "dark", I: Moon, label: "Dark" },
  ];
  return (
    <div className="flex rounded-full border bg-card p-0.5">
      {opts.map(({ v, I, label }) => (
        <button key={v} aria-label={`${label} theme`} title={label}
          onClick={() => { setT(v); localStorage.setItem("sahyogi-theme", v); applyTheme(v); }}
          className={cn("rounded-full p-1.5 transition", t === v ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground")}>
          <I className="size-3.5" />
        </button>
      ))}
    </div>
  );
}

// ----------------------------- navbar -----------------------------
export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("flex items-center gap-2", className)}>
      <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
        <HandHeart className="size-5" />
      </span>
      <span className="leading-none">
        <span className="font-display block text-xl font-semibold">Sahyogi</span>
        <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">by Binary Minds</span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const user = useSession();
  const connected = useStore((s) => s.connected);
  const mode = useStore((s) => s.mode);
  const [open, setOpen] = useState(false);
  const nav = useNavigate();
  const links = [
    { to: "/", label: "Home" },
    { to: "/map", label: "Live Map" },
    { to: "/request", label: "Request Help" },
    { to: "/analytics", label: "Analytics" },
    ...(user ? [{ to: "/dashboard", label: "Dashboard" }] : []),
  ] as const;
  return (
    <header className="sticky top-0 z-[1000] border-b bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4">
        <Logo />
        <nav className="ml-6 hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link key={l.to} to={l.to} activeOptions={{ exact: l.to === "/" }}
              className="rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
              activeProps={{ className: "bg-secondary !text-foreground" }}>{l.label}</Link>
          ))}
        </nav>
        <div className="ml-auto hidden items-center gap-3 md:flex">
          <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground" title="Live connection">
            <span className={cn("size-2 rounded-full", connected ? "pulse-dot bg-success" : "bg-destructive")} />
            {connected ? "Live" : "Offline"}
          </span>
          <DemoSwitch mode={mode} />
          <ThemeToggle />
          {user ? (
            <div className="flex items-center gap-2">
              <Link to="/dashboard" className="text-right leading-tight">
                <span className="block text-sm font-semibold">{user.orgName ?? user.name}</span>
                <span className="block text-[11px] capitalize text-muted-foreground">{user.role === "ngo" ? "NGO Admin" : user.role === "user" ? "Citizen" : "Volunteer"}</span>
              </Link>
              <button aria-label="Log out" onClick={() => { logout(); nav({ to: "/" }); }} className="rounded-full border p-2 hover:bg-secondary"><LogOut className="size-4" /></button>
            </div>
          ) : (
            <Link to="/login" className="text-sm font-semibold hover:text-primary">Log in</Link>
          )}
          <Link to="/request" className="rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-sm hover:opacity-90">Get Help</Link>
        </div>
        <button className="ml-auto md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <div className="space-y-3 border-t bg-background p-4 md:hidden">
          {links.map((l) => <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block font-medium">{l.label}</Link>)}
          <div className="flex items-center gap-3"><ThemeToggle /><DemoSwitch mode={mode} /></div>
          {user ? <button onClick={() => { logout(); setOpen(false); nav({ to: "/" }); }} className="font-semibold text-destructive">Log out ({user.orgName ?? user.name})</button>
            : <Link to="/login" onClick={() => setOpen(false)} className="block font-semibold text-primary">Log in</Link>}
        </div>
      )}
    </header>
  );
}

function DemoSwitch({ mode }: { mode: "demo" | "live" }) {
  return (
    <div className="flex items-center rounded-full border bg-card p-0.5 text-[11px] font-bold uppercase">
      {(["demo", "live"] as const).map((m) => (
        <button key={m} onClick={() => setMode(m)} title={m === "demo" ? "Pre-seeded demo data" : "Your own clean workspace"}
          className={cn("rounded-full px-2.5 py-1", mode === m ? (m === "demo" ? "bg-accent text-accent-foreground" : "bg-ink text-ink-foreground") : "text-muted-foreground")}>
          {m}
        </button>
      ))}
    </div>
  );
}

export function Footer() {
  const [sub, setSub] = useState(false);
  return (
    <footer className="mt-24 bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="font-display text-2xl font-semibold">Sahyogi</div>
          <p className="mt-2 text-sm opacity-70">Real-time disaster relief coordination connecting people in need, NGOs and volunteers.</p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-widest opacity-60">Built by Binary Minds</p>
        </div>
        <div>
          <h4 className="font-sans text-sm font-bold uppercase tracking-wider opacity-60">Quick links</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/request">Request help</Link></li><li><Link to="/map">Live map</Link></li>
            <li><Link to="/signup">Join as NGO</Link></li><li><Link to="/signup">Volunteer</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-sans text-sm font-bold uppercase tracking-wider opacity-60">Resources</h4>
          <ul className="mt-3 space-y-2 text-sm opacity-90">
            <li>Emergency: 112</li><li>Disaster helpline: 1078</li><li>Ambulance: 108</li>
            <li><button className="underline" onClick={() => { resetDemo(); }}>Reset demo data</button></li>
          </ul>
        </div>
        <div>
          <h4 className="font-sans text-sm font-bold uppercase tracking-wider opacity-60">Alerts & updates</h4>
          {sub ? <p className="mt-3 text-sm">You're subscribed to area alerts.</p> : (
            <form className="mt-3 flex gap-2" onSubmit={(e) => { e.preventDefault(); setSub(true); }}>
              <input required type="tel" placeholder="Phone number" className="min-w-0 flex-1 rounded-lg bg-ink-foreground/10 px-3 py-2 text-sm outline-none placeholder:opacity-50" />
              <button className="rounded-lg bg-primary px-3 py-2 text-sm font-bold text-primary-foreground">Subscribe</button>
            </form>
          )}
        </div>
      </div>
      <div className="border-t border-ink-foreground/10 py-4 text-center text-xs opacity-60">© 2026 Sahyogi · Binary Minds</div>
    </footer>
  );
}

export function Page({ children, className }: { children: ReactNode; className?: string }) {
  return <main className={cn("mx-auto max-w-7xl px-4 py-8", className)}>{children}</main>;
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("rounded-2xl border bg-card p-5 shadow-sm", className)}>{children}</div>;
}

export function RequireAuth({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const user = useSession();
  if (!ready) return <Page><div className="h-64 animate-pulse rounded-2xl bg-muted" /></Page>;
  if (!user) return (
    <Page className="grid min-h-[50vh] place-items-center text-center">
      <div>
        <h1 className="text-3xl font-semibold">Please log in</h1>
        <p className="mt-2 text-muted-foreground">You need an account to view this page.</p>
        <Link to="/login" className="mt-6 inline-block rounded-full bg-primary px-6 py-2.5 font-bold text-primary-foreground">Log in</Link>
      </div>
    </Page>
  );
  return <>{children}</>;
}

export function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-semibold">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-muted-foreground">{hint}</span>}
    </label>
  );
}
