import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, NEED_META, NeedIcon, Page, StatusBadge, UrgencyBadge, timeAgo } from "@/components/sahyogi";
import { MapView } from "@/components/MapView";
import { NEED_TYPES, useStore, type NeedType } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Live relief map — Sahyogi" },
      { name: "description", content: "Live map of help requests, urgency heatmap and NGO coverage across the city." },
      { property: "og:title", content: "Live relief map — Sahyogi" },
      { property: "og:description", content: "See every active help request and responding NGO in real time." },
    ],
  }),
  component: MapPage,
});

function MapPage() {
  const requests = useStore((s) => s.db.requests);
  const users = useStore((s) => s.db.users);
  const [heat, setHeat] = useState(false);
  const [showDone, setShowDone] = useState(false);
  const [need, setNeed] = useState<NeedType | "all">("all");
  const [focus, setFocus] = useState<string | null>(null);
  const shown = requests.filter((r) => (showDone || (r.status !== "fulfilled" && r.status !== "cancelled")) && (need === "all" || r.needType === need));
  const sorted = [...shown].sort((a, b) => b.priorityScore - a.priorityScore);
  return (
    <Page>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><h1 className="text-4xl font-semibold">Live relief map</h1><p className="text-muted-foreground">{shown.length} requests · {users.filter((u) => u.role === "ngo").length} NGOs on the network</p></div>
        <div className="flex flex-wrap gap-2 text-sm">
          <Toggle on={heat} set={setHeat} label="Heatmap" />
          <Toggle on={showDone} set={setShowDone} label="Show fulfilled" />
          <select className="inp w-auto py-1.5" value={need} onChange={(e) => setNeed(e.target.value as NeedType | "all")}>
            <option value="all">All needs</option>
            {NEED_TYPES.map((n) => <option key={n} value={n}>{NEED_META[n].label}</option>)}
          </select>
        </div>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card className="p-2"><MapView requests={shown} ngos={users.filter((u) => u.role === "ngo")} heat={heat} height={620} focusId={focus} /></Card>
        <Card className="max-h-[636px] overflow-auto p-3">
          <div className="mb-2 flex gap-3 px-2 text-xs">
            {(["critical", "high", "medium", "low"] as const).map((u) => <span key={u} className="flex items-center gap-1 capitalize"><span className={cn("size-2.5 rounded-full", `bg-${u}`)} />{u}</span>)}
          </div>
          {sorted.map((r) => (
            <button key={r.id} onClick={() => setFocus(r.id)} className={cn("mb-2 w-full rounded-xl border p-3 text-left hover:border-primary", focus === r.id && "border-primary bg-primary/5")}>
              <div className="flex items-center justify-between"><span className="flex items-center gap-2 font-semibold capitalize"><NeedIcon type={r.needType} className="size-4 text-primary" />{r.needType}</span><UrgencyBadge u={r.urgencyLevel} /></div>
              <div className="mt-1 text-xs text-muted-foreground">{r.area} · {timeAgo(r.createdAt)}</div>
              <div className="mt-2 flex items-center justify-between"><StatusBadge s={r.status} /><span className="text-xs">{r.assignedNgoName ?? "Unmatched"}</span></div>
            </button>
          ))}
          {!sorted.length && <p className="p-4 text-sm text-muted-foreground">No requests match.</p>}
        </Card>
      </div>
    </Page>
  );
}

function Toggle({ on, set, label }: { on: boolean; set: (v: boolean) => void; label: string }) {
  return <button onClick={() => set(!on)} className={cn("rounded-full border px-3 py-1.5 font-semibold", on && "border-primary bg-primary text-primary-foreground")}>{label}</button>;
}
