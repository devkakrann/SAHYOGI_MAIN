import { createFileRoute } from "@tanstack/react-router";
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Tooltip } from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { Card, NEED_META, Page } from "@/components/sahyogi";
import { NEED_TYPES, useStore } from "@/lib/store";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Impact analytics — Sahyogi" },
      { name: "description", content: "Request volume, urgency mix, fulfillment and volunteer leaderboard across the Sahyogi network." },
      { property: "og:title", content: "Impact analytics — Sahyogi" },
      { property: "og:description", content: "Live impact metrics for the relief network." },
    ],
  }),
  component: Analytics,
});

const C = ["#e8792b", "#1d8a92", "#d9382c", "#e3b43a", "#3c9d78", "#7b6fd6", "#b0567a", "#8a8f99"];

function Analytics() {
  const requests = useStore((s) => s.db.requests);
  const users = useStore((s) => s.db.users);
  const byNeed = NEED_TYPES.map((n) => requests.filter((r) => r.needType === n).length);
  const urg = (["critical", "high", "medium", "low"] as const).map((u) => requests.filter((r) => r.urgencyLevel === u).length);
  const days = Array.from({ length: 7 }, (_, i) => { const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() - (6 - i)); return d; });
  const perDay = (f: (t: number) => boolean) => days.map((d) => requests.filter((r) => { const t = r.createdAt; return t >= d.getTime() && t < d.getTime() + 86400000 && f(t); }).length);
  const fulfilledPerDay = days.map((d) => requests.filter((r) => r.fulfilledAt && r.fulfilledAt >= d.getTime() && r.fulfilledAt < d.getTime() + 86400000).length);
  const vols = users.filter((u) => u.role === "volunteer").sort((a, b) => (b.points ?? 0) - (a.points ?? 0));
  const fulfilled = requests.filter((r) => r.status === "fulfilled").length;
  return (
    <Page>
      <h1 className="text-4xl font-semibold">Impact analytics</h1>
      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[["Total requests", requests.length], ["Fulfilled", fulfilled], ["People helped", requests.filter((r) => r.status === "fulfilled").reduce((a, r) => a + r.people, 0)], ["NGOs", users.filter((u) => u.role === "ngo").length]].map(([k, v]) => (
          <Card key={k as string}><div className="text-sm text-muted-foreground">{k}</div><div className="font-display text-4xl font-semibold">{v}</div></Card>
        ))}
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card><h3 className="mb-4 text-xl font-semibold">Requests by need</h3><Bar data={{ labels: NEED_TYPES.map((n) => NEED_META[n].label), datasets: [{ data: byNeed, backgroundColor: C, borderRadius: 8 }] }} options={{ plugins: { legend: { display: false } } }} /></Card>
        <Card><h3 className="mb-4 text-xl font-semibold">Urgency mix</h3><div className="mx-auto max-w-xs"><Doughnut data={{ labels: ["Critical", "High", "Medium", "Low"], datasets: [{ data: urg, backgroundColor: ["#d9382c", "#e8792b", "#e3b43a", "#3c9d78"] }] }} /></div></Card>
        <Card><h3 className="mb-4 text-xl font-semibold">Last 7 days</h3><Line data={{ labels: days.map((d) => d.toLocaleDateString(undefined, { weekday: "short" })), datasets: [{ label: "New", data: perDay(() => true), borderColor: "#e8792b", tension: 0.35 }, { label: "Fulfilled", data: fulfilledPerDay, borderColor: "#3c9d78", tension: 0.35 }] }} /></Card>
        <Card>
          <h3 className="mb-4 text-xl font-semibold">Volunteer leaderboard</h3>
          <ol className="space-y-2">
            {vols.slice(0, 8).map((v, i) => (
              <li key={v.id} className="flex items-center justify-between rounded-lg bg-secondary px-3 py-2 text-sm">
                <span><b className="mr-2 text-primary">#{i + 1}</b>{v.name}</span><span>{v.deliveries ?? 0} deliveries · <b>{v.points ?? 0} pts</b></span>
              </li>
            ))}
            {!vols.length && <li className="text-sm text-muted-foreground">No volunteers yet.</li>}
          </ol>
        </Card>
      </div>
    </Page>
  );
}
