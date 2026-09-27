import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Brain, Check, Crosshair, Loader2, Mic, MicOff, Radar } from "lucide-react";
import { Card, Field, NEED_META, NeedIcon, Page, UrgencyBadge } from "@/components/sahyogi";
import { MapView } from "@/components/MapView";
import { NEED_TYPES, matchNgos, submitRequest, triage, useSession, useStore, type NeedType } from "@/lib/store";
import type { TriageResult } from "@/lib/triage";
import { AREAS, findArea } from "@/lib/areas";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/request")({
  head: () => ({
    meta: [
      { title: "Request help — Sahyogi" },
      { name: "description", content: "Submit a help request for food, medical, shelter, water, rescue and more. AI triage ranks urgency and matches nearby NGOs." },
      { property: "og:title", content: "Request help — Sahyogi" },
      { property: "og:description", content: "Four quick steps to get help from nearby NGOs and volunteers." },
    ],
  }),
  component: RequestPage,
});

const STEPS = ["Choose need", "Situation", "Contact", "AI review"];

function RequestPage() {
  const user = useSession();
  const db = useStore((s) => s.db);
  const nav = useNavigate();
  const [step, setStep] = useState(0);
  const [need, setNeed] = useState<NeedType | null>(null);
  const [desc, setDesc] = useState("");
  const [c, setC] = useState({ name: "", phone: "", area: "", pincode: "", people: 1 });
  const [pos, setPos] = useState<{ lat: number; lng: number } | null>(null);
  const [t, setT] = useState<TriageResult | null>(null);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    if (user && !c.name) setC((p) => ({ ...p, name: user.name, phone: user.phone, area: user.area, people: user.people ?? 1 }));
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  const resolveArea = (v: string) => {
    const a = findArea(v);
    if (a) { setPos({ lat: a.lat, lng: a.lng }); setC((p) => ({ ...p, pincode: p.pincode || a.pincode })); }
  };

  const speak = () => {
    const W = window as unknown as { SpeechRecognition?: new () => SpeechRec; webkitSpeechRecognition?: new () => SpeechRec };
    const SR = W.SpeechRecognition ?? W.webkitSpeechRecognition;
    if (!SR) { toast.error("Speech input isn't supported in this browser."); return; }
    const r = new SR();
    r.lang = "en-IN"; r.interimResults = false;
    r.onresult = (e) => setDesc((d) => (d ? d + " " : "") + e.results[0]![0].transcript);
    r.onend = () => setListening(false);
    setListening(true); r.start();
  };

  const runTriage = () => {
    if (!pos) { const a = findArea(c.pincode) ?? findArea(c.area); if (a) setPos({ lat: a.lat, lng: a.lng }); else { toast.error("Pick your location on the map or choose a known area."); return; } }
    setT(null); setStep(3);
    setTimeout(() => setT(triage(need!, desc, c.people)), 1400);
  };

  const matches = need && pos ? matchNgos(db, { ...pos, needType: need }) : [];

  return (
    <Page className="max-w-4xl">
      <h1 className="text-4xl font-semibold">Request help</h1>
      <p className="mt-1 text-muted-foreground">Your request is triaged instantly and routed to the nearest NGO offering this service.</p>
      <ol className="mt-8 grid grid-cols-4 gap-2">
        {STEPS.map((s, i) => (
          <li key={s} className="text-xs font-semibold">
            <div className={cn("h-1.5 rounded-full", i <= step ? "bg-primary" : "bg-muted")} />
            <span className={cn("mt-2 block", i === step ? "text-foreground" : "text-muted-foreground")}>{i + 1}. {s}</span>
          </li>
        ))}
      </ol>

      <Card className="mt-6 p-6 md:p-8">
        {step === 0 && (
          <div>
            <h2 className="text-2xl font-semibold">What do you need?</h2>
            <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
              {NEED_TYPES.map((n) => (
                <button key={n} onClick={() => setNeed(n)} className={cn("rounded-2xl border p-5 text-left transition", need === n ? "border-primary bg-primary/10" : "hover:border-primary/50")}>
                  <NeedIcon type={n} className="size-7 text-primary" />
                  <div className="mt-2 font-bold">{NEED_META[n].label}</div>
                </button>
              ))}
            </div>
            <Nav next={() => setStep(1)} disabled={!need} />
          </div>
        )}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-semibold">Describe the situation</h2>
            <p className="text-sm text-muted-foreground">Mention who is affected, injuries, children or elderly, and how long you've waited. Priority is decided by AI from your description.</p>
            <div className="relative mt-4">
              <textarea className="inp min-h-40" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="e.g. Water entered our home, elderly mother has fever, no drinking water since yesterday…" />
              <button type="button" onClick={speak} aria-label="Speak" className={cn("absolute bottom-3 right-3 rounded-full p-2.5", listening ? "bg-critical text-primary-foreground" : "bg-secondary")}>
                {listening ? <MicOff className="size-4" /> : <Mic className="size-4" />}
              </button>
            </div>
            <Nav back={() => setStep(0)} next={() => setStep(2)} disabled={desc.trim().length < 10} />
          </div>
        )}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-semibold">Contact & location</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <Field label="Name"><input className="inp" value={c.name} onChange={(e) => setC({ ...c, name: e.target.value })} /></Field>
              <Field label="Phone"><input className="inp" value={c.phone} onChange={(e) => setC({ ...c, phone: e.target.value })} /></Field>
              <Field label="Area / locality">
                <input className="inp" list="areas-r" value={c.area} onChange={(e) => { setC({ ...c, area: e.target.value }); resolveArea(e.target.value); }} />
                <datalist id="areas-r">{AREAS.map((a) => <option key={a.pincode} value={a.name} />)}</datalist>
              </Field>
              <Field label="Pincode"><input className="inp" value={c.pincode} onChange={(e) => { setC({ ...c, pincode: e.target.value }); resolveArea(e.target.value); }} /></Field>
              <Field label="Number of people"><input className="inp" type="number" min={1} value={c.people} onChange={(e) => setC({ ...c, people: Math.max(1, Number(e.target.value)) })} /></Field>
              <div className="flex items-end">
                <button type="button" className="inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold hover:bg-secondary"
                  onClick={() => navigator.geolocation?.getCurrentPosition((p) => setPos({ lat: p.coords.latitude, lng: p.coords.longitude }), () => toast.error("Couldn't get your location"))}>
                  <Crosshair className="size-4" /> Use my location
                </button>
              </div>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Tap the map to set your exact location. {pos && `(${pos.lat.toFixed(4)}, ${pos.lng.toFixed(4)})`}</p>
            <div className="mt-2"><MapView key={pos ? "p" : "n"} requests={[]} ngos={db.users.filter((u) => u.role === "ngo")} height={280} zoom={pos ? 13 : 11} pick={pos} onPick={setPos} /></div>
            <Nav back={() => setStep(1)} next={runTriage} nextLabel="Run AI triage" disabled={!c.name || c.phone.replace(/\D/g, "").length < 10 || !c.area} />
          </div>
        )}
        {step === 3 && (
          <div>
            {!t ? (
              <div className="py-16 text-center">
                <Brain className="mx-auto size-10 animate-pulse text-primary" />
                <p className="mt-4 text-lg font-semibold">AI triage in progress…</p>
                <p className="text-sm text-muted-foreground">Analyzing need, keywords and emergency indicators</p>
              </div>
            ) : (
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-2xl font-semibold">AI priority assessment</h2>
                  <UrgencyBadge u={t.urgencyLevel} />
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <Stat k="Category" v={NEED_META[need!].label} />
                  <Stat k="Priority score" v={`${t.aiScore}/100`} />
                  <Stat k="Confidence" v={`${Math.round(t.confidenceScore * 100)}%`} />
                </div>
                <div className="mt-4 rounded-xl bg-secondary p-4 text-sm"><b>Summary:</b> {t.aiSummary}<br /><b>Recommended action:</b> {t.aiAction}</div>
                <div className="mt-4 flex items-start gap-3 rounded-xl border p-4 text-sm">
                  <Radar className="mt-0.5 size-5 shrink-0 text-accent" />
                  {matches.length ? <span>Nearby responders identified: <b>{matches.slice(0, 3).map((m) => `${m.n.orgName} (${m.d.toFixed(1)} km)`).join(", ")}</b></span>
                    : <span>No NGO offering {need} within coverage yet — your request will be broadcast to all NGOs as pending.</span>}
                </div>
                <div className="mt-4 text-sm text-muted-foreground">{c.name} · {c.phone} · {c.area} {c.pincode} · {c.people} people</div>
                <Nav back={() => setStep(2)} nextLabel="Submit request" next={() => {
                  const id = submitRequest({ needType: need!, description: desc, ...c, lat: pos!.lat, lng: pos!.lng }, t);
                  toast.success("Request submitted — help is being coordinated.");
                  if (user) nav({ to: "/dashboard" }); else { setStep(4); setDone(id); }
                }} />
              </div>
            )}
          </div>
        )}
        {step === 4 && (
          <div className="py-10 text-center">
            <Check className="mx-auto size-12 rounded-full bg-success/15 p-2 text-success" />
            <h2 className="mt-4 text-2xl font-semibold">Request submitted</h2>
            <p className="mt-2 text-muted-foreground">Reference: <code>{doneId}</code>. Create an account with the same phone to track progress.</p>
            <div className="mt-6 flex justify-center gap-3"><Link to="/map" className="rounded-full border px-5 py-2.5 font-semibold">See live map</Link><Link to="/signup" className="rounded-full bg-primary px-5 py-2.5 font-bold text-primary-foreground">Create account</Link></div>
          </div>
        )}
      </Card>
    </Page>
  );
}

let doneId = "";
function setDone(id: string) { doneId = id; }

interface SpeechRec { lang: string; interimResults: boolean; start(): void; onresult: (e: { results: { 0: { transcript: string } }[] }) => void; onend: () => void }

function Stat({ k, v }: { k: string; v: string }) {
  return <div className="rounded-xl border p-3"><div className="text-xs text-muted-foreground">{k}</div><div className="font-display text-2xl font-semibold">{v}</div></div>;
}

function Nav({ back, next, disabled, nextLabel = "Continue" }: { back?: () => void; next: () => void; disabled?: boolean; nextLabel?: string }) {
  return (
    <div className="mt-8 flex justify-between">
      {back ? <button onClick={back} className="rounded-full border px-5 py-2.5 font-semibold">Back</button> : <span />}
      <button onClick={next} disabled={disabled} className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 font-bold text-primary-foreground disabled:opacity-40">
        {nextLabel === "Run AI triage" && <Loader2 className="hidden size-4" />}{nextLabel}
      </button>
    </div>
  );
}
