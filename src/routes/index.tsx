import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Brain, Building2, Clock, HandHeart, MapPin, Radio, Send, Truck, Users } from "lucide-react";
import { NEED_META, NeedIcon, timeAgo } from "@/components/sahyogi";
import { MapView } from "@/components/MapView";
import { useStore, type NeedType } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sahyogi — Help reaches faster when everyone is connected" },
      { name: "description", content: "Request food, medical, shelter, water or rescue help. AI triage and geo-matching route you to nearby NGOs and volunteers in minutes." },
      { property: "og:title", content: "Sahyogi — Real-time disaster relief" },
      { property: "og:description", content: "AI-triaged help requests matched to nearby NGOs and volunteers, live on the map." },
    ],
  }),
  component: Landing,
});

function Landing() {
  const requests = useStore((s) => s.db.requests);
  const users = useStore((s) => s.db.users);
  const activity = useStore((s) => s.db.activity);
  const fulfilled = requests.filter((r) => r.status === "fulfilled");
  const lives = fulfilled.reduce((a, r) => a + r.people, 0);
  const vols = users.filter((u) => u.role === "volunteer").length;
  const avgMin = fulfilled.length ? Math.round(fulfilled.reduce((a, r) => a + ((r.fulfilledAt ?? r.createdAt) - r.createdAt), 0) / fulfilled.length / 60000) : 0;
  const rate = requests.length ? Math.round((fulfilled.length / requests.length) * 100) : 0;

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-40 -top-40 size-[36rem] rounded-full bg-primary/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-20 size-[28rem] rounded-full bg-accent/15 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-14 lg:grid-cols-[1.1fr_1fr] lg:pt-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-semibold">
              <Radio className="size-3.5 text-critical" /> Live relief network · {requests.filter((r) => r.status !== "fulfilled" && r.status !== "cancelled").length} active requests
            </span>
            <h1 className="mt-6 text-5xl font-semibold leading-[1.02] md:text-7xl">
              When disaster strikes, <em className="text-primary">help</em> shouldn't wait.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Sahyogi turns a single request into coordinated action — AI triage ranks urgency, geo-matching finds the nearest NGO, and trained volunteers are dispatched to your door.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/request" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-bold text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90">
                Request help now <ArrowRight className="size-4" />
              </Link>
              <Link to="/map" className="inline-flex items-center gap-2 rounded-full border bg-card px-6 py-3.5 font-bold hover:bg-secondary">
                <MapPin className="size-4" /> View live map
              </Link>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { v: lives, l: "Lives helped", I: HandHeart },
                { v: `${avgMin}m`, l: "Avg response", I: Clock },
                { v: vols, l: "Volunteers", I: Users },
                { v: `${rate}%`, l: "Fulfilled", I: Truck },
              ].map(({ v, l, I }) => (
                <div key={l}>
                  <I className="size-4 text-primary" />
                  <div className="font-display mt-1 text-3xl font-semibold">{v}</div>
                  <div className="text-xs font-medium text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-3xl border bg-card p-2 shadow-xl">
              <MapView requests={requests} height={380} heat />
            </div>
            <div className="mt-4 rounded-2xl border bg-card p-4 shadow-sm">
              <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <span className="pulse-dot size-2 rounded-full bg-success" /> Real-time activity
              </div>
              <ul className="max-h-40 space-y-2 overflow-auto text-sm">
                {activity.slice(0, 6).map((a) => (
                  <li key={a.id} className="flex justify-between gap-3">
                    <span className="first-letter:uppercase">{a.text}</span>
                    <span className="shrink-0 text-xs text-muted-foreground">{timeAgo(a.at)}</span>
                  </li>
                ))}
                {!activity.length && <li className="text-muted-foreground">No activity yet.</li>}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-4xl font-semibold">One network, every kind of need</h2>
        <p className="mt-2 text-muted-foreground">NGOs register the services they provide — requests route only to responders who can help.</p>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {(Object.keys(NEED_META) as NeedType[]).slice(0, 8).map((t) => (
            <Link key={t} to="/request" className="group rounded-2xl border bg-card p-5 transition hover:-translate-y-0.5 hover:border-primary">
              <NeedIcon type={t} className="size-7 text-primary" />
              <div className="mt-3 font-bold">{NEED_META[t].label}</div>
              <div className="text-xs text-muted-foreground">{requests.filter((r) => r.needType === t).length} requests handled</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-ink py-20 text-ink-foreground">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-4xl font-semibold">From request to recovery</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {[
              { I: Send, t: "Submit request", d: "Describe your need in four quick steps — by typing or speaking." },
              { I: Brain, t: "AI triage", d: "Urgency is scored from your situation, not self-reported, so critical cases go first." },
              { I: MapPin, t: "Geo match", d: "Nearest NGOs offering that service within their coverage radius are matched." },
              { I: Truck, t: "Help dispatched", d: "The NGO assigns a linked volunteer who delivers and marks the mission fulfilled." },
            ].map(({ I, t, d }, i) => (
              <div key={t} className="rounded-2xl border border-ink-foreground/10 p-6">
                <div className="flex items-center justify-between"><I className="size-6 text-primary" /><span className="font-display text-4xl opacity-20">0{i + 1}</span></div>
                <div className="mt-4 text-lg font-bold">{t}</div>
                <p className="mt-1 text-sm opacity-70">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <h2 className="text-center text-4xl font-semibold">How would you like to take part?</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            { I: HandHeart, t: "I need help", d: "Request food, medicine, shelter, water or rescue for your family.", to: "/request" as const, cta: "Request help" },
            { I: Building2, t: "I'm an NGO", d: "Run a command center: triaged requests, volunteer roster and live map.", to: "/signup" as const, cta: "Register NGO" },
            { I: Users, t: "I'm a volunteer", d: "Join your NGO with an invite code, take missions and earn badges.", to: "/signup" as const, cta: "Become a volunteer" },
          ].map(({ I, t, d, to, cta }) => (
            <div key={t} className="flex flex-col rounded-3xl border bg-card p-7">
              <I className="size-8 text-primary" />
              <h3 className="mt-4 text-2xl font-semibold">{t}</h3>
              <p className="mt-2 flex-1 text-muted-foreground">{d}</p>
              <Link to={to} className="mt-6 inline-flex items-center gap-2 font-bold text-primary">{cta} <ArrowRight className="size-4" /></Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
