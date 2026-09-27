import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Building2, HandHeart, Users } from "lucide-react";
import { Card, Field, Page } from "@/components/sahyogi";
import { login, loginAs, setMode, useStore } from "@/lib/store";
import { DEMO_ACCOUNTS, DEMO_PASSWORD } from "@/lib/seed";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — Sahyogi" },
      { name: "description", content: "Log in to Sahyogi as a citizen, volunteer or NGO admin." },
      { property: "og:title", content: "Log in — Sahyogi" },
      { property: "og:description", content: "Access your Sahyogi dashboard." },
    ],
  }),
  component: LoginPage,
});

const ICON = { ngo: Building2, volunteer: Users, user: HandHeart };

function LoginPage() {
  const [phone, setPhone] = useState("");
  const [pw, setPw] = useState("");
  const nav = useNavigate();
  const mode = useStore((s) => s.mode);
  return (
    <Page className="grid max-w-5xl gap-6 md:grid-cols-2">
      <Card className="p-8">
        <h1 className="text-3xl font-semibold">Welcome back</h1>
        <p className="mt-1 text-sm text-muted-foreground">Log in with your phone number.</p>
        <form className="mt-6 space-y-4" onSubmit={(e) => {
          e.preventDefault();
          try { login(phone, pw); toast.success("Logged in"); nav({ to: "/dashboard" }); }
          catch (err) { toast.error((err as Error).message); }
        }}>
          <Field label="Phone"><input className="inp" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="10-digit mobile" required /></Field>
          <Field label="Password"><input className="inp" type="password" value={pw} onChange={(e) => setPw(e.target.value)} required /></Field>
          <button className="w-full rounded-full bg-primary py-3 font-bold text-primary-foreground">Log in</button>
        </form>
        <p className="mt-4 text-sm text-muted-foreground">New here? <Link to="/signup" className="font-semibold text-primary">Create an account</Link></p>
      </Card>
      <Card className="bg-secondary p-8">
        <h2 className="text-2xl font-semibold">Demo quick login</h2>
        <p className="mt-1 text-sm text-muted-foreground">For judges: jump straight into any role with pre-seeded data. Password for all demo accounts: <code className="font-bold">{DEMO_PASSWORD}</code></p>
        <div className="mt-6 space-y-3">
          {DEMO_ACCOUNTS.map((a) => {
            const I = ICON[a.role];
            return (
              <button key={a.id} onClick={() => { if (mode !== "demo") setMode("demo"); loginAs(a.id); toast.success(`Signed in as ${a.label}`); nav({ to: "/dashboard" }); }}
                className="flex w-full items-center gap-3 rounded-xl border bg-card p-4 text-left hover:border-primary">
                <I className="size-5 text-primary" />
                <span><span className="block font-semibold">{a.label}</span><span className="text-xs text-muted-foreground">{a.phone}</span></span>
              </button>
            );
          })}
        </div>
      </Card>
    </Page>
  );
}
