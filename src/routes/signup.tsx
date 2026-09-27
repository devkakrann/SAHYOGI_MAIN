import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Building2, HandHeart, Users } from "lucide-react";
import { Card, Field, NEED_META, Page } from "@/components/sahyogi";
import { NEED_TYPES, resendOtp, startSignup, verifyOtp, type NeedType, type Role } from "@/lib/store";
import { AREAS, findArea } from "@/lib/areas";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Sign up — Sahyogi" },
      { name: "description", content: "Join Sahyogi as a citizen, volunteer or NGO. Volunteers can link to their NGO with an invite code." },
      { property: "og:title", content: "Join Sahyogi" },
      { property: "og:description", content: "Create a Sahyogi account as citizen, volunteer or NGO." },
    ],
  }),
  component: SignupPage,
});

const ROLES: { r: Role; label: string; I: typeof Users }[] = [
  { r: "user", label: "Need help", I: HandHeart },
  { r: "volunteer", label: "Volunteer", I: Users },
  { r: "ngo", label: "NGO", I: Building2 },
];

function SignupPage() {
  const nav = useNavigate();
  const [role, setRole] = useState<Role>("user");
  const [f, setF] = useState({ name: "", phone: "", password: "", area: "", people: 1, skills: "", inviteCode: "", orgName: "", regNo: "" });
  const [domains, setDomains] = useState<NeedType[]>(["food"]);
  const [otp, setOtp] = useState<{ phone: string; devOtp: string; expiresAt: number } | null>(null);
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) => setF({ ...f, [k]: k === "people" ? Number(e.target.value) : e.target.value });

  if (otp) return <OtpStep otp={otp} setOtp={setOtp} onDone={() => { toast.success("Account verified!"); nav({ to: "/dashboard" }); }} />;

  return (
    <Page className="max-w-2xl">
      <Card className="p-8">
        <h1 className="text-3xl font-semibold">Create your Sahyogi account</h1>
        <div className="mt-6 grid grid-cols-3 gap-2">
          {ROLES.map(({ r, label, I }) => (
            <button key={r} type="button" onClick={() => setRole(r)} className={cn("rounded-xl border p-3 text-sm font-semibold", role === r ? "border-primary bg-primary/10 text-primary" : "hover:bg-secondary")}>
              <I className="mx-auto mb-1 size-5" />{label}
            </button>
          ))}
        </div>
        <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={async (e) => {
          e.preventDefault();
          const a = findArea(f.area) ?? AREAS[0]!;
          try {
            const res = await startSignup({
              role, name: f.name, phone: f.phone, password: f.password, area: f.area || a.name, lat: a.lat, lng: a.lng,
              people: f.people, skills: f.skills.split(",").map((s) => s.trim()).filter(Boolean), inviteCode: f.inviteCode,
              orgName: f.orgName, regNo: f.regNo, domains,
            });
            setOtp(res);
          } catch (err) { toast.error((err as Error).message); }
        }}>
          {role === "ngo" && <Field label="Organization name"><input className="inp" required value={f.orgName} onChange={set("orgName")} /></Field>}
          {role === "ngo" && <Field label="Registration number"><input className="inp" value={f.regNo} onChange={set("regNo")} /></Field>}
          <Field label={role === "ngo" ? "Contact person" : "Full name"}><input className="inp" required value={f.name} onChange={set("name")} /></Field>
          <Field label="Phone"><input className="inp" required inputMode="tel" value={f.phone} onChange={set("phone")} placeholder="10-digit mobile" /></Field>
          <Field label="Password"><input className="inp" required type="password" minLength={6} value={f.password} onChange={set("password")} /></Field>
          <Field label="Area / city">
            <input className="inp" required list="areas" value={f.area} onChange={set("area")} placeholder="e.g. Saket or 110017" />
            <datalist id="areas">{AREAS.map((a) => <option key={a.pincode} value={a.name} />)}</datalist>
          </Field>
          {role === "user" && <Field label="Number of people"><input className="inp" type="number" min={1} value={f.people} onChange={set("people")} /></Field>}
          {role === "volunteer" && <Field label="Skills" hint="Comma separated"><input className="inp" value={f.skills} onChange={set("skills")} placeholder="First aid, Driving" /></Field>}
          {role === "volunteer" && <Field label="NGO invite code (optional)" hint="Links you to your NGO so they can assign you missions."><input className="inp font-mono uppercase" value={f.inviteCode} onChange={set("inviteCode")} placeholder="SEVA2026" /></Field>}
          {role === "ngo" && (
            <div className="sm:col-span-2">
              <span className="mb-2 block text-sm font-semibold">Services you provide</span>
              <div className="flex flex-wrap gap-2">
                {NEED_TYPES.map((t) => (
                  <button type="button" key={t} onClick={() => setDomains(domains.includes(t) ? domains.filter((d) => d !== t) : [...domains, t])}
                    className={cn("rounded-full border px-3 py-1 text-sm", domains.includes(t) ? "border-primary bg-primary text-primary-foreground" : "")}>{NEED_META[t].label}</button>
                ))}
              </div>
            </div>
          )}
          <button className="rounded-full bg-primary py-3 font-bold text-primary-foreground sm:col-span-2">Send OTP</button>
        </form>
        <p className="mt-4 text-sm text-muted-foreground">Already have an account? <Link to="/login" className="font-semibold text-primary">Log in</Link></p>
      </Card>
    </Page>
  );
}

function OtpStep({ otp, setOtp, onDone }: { otp: { phone: string; devOtp: string; expiresAt: number }; setOtp: (o: typeof otp) => void; onDone: () => void }) {
  const [d, setD] = useState(["", "", "", ""]);
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const [left, setLeft] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setLeft(Math.max(0, Math.round((otp.expiresAt - Date.now()) / 1000))), 500);
    refs.current[0]?.focus();
    return () => clearInterval(t);
  }, [otp.expiresAt]);
  const submit = async () => {
    try {
  await verifyOtp(otp.phone, d.join(""));
  onDone();
} catch (e) {
  toast.error((e as Error).message);
}
  };
  return (
    <Page className="max-w-md">
      <Card className="p-8 text-center">
        <h1 className="text-3xl font-semibold">Verify your phone</h1>
        <p className="mt-2 text-sm text-muted-foreground">Enter the 4-digit code sent to +91 {otp.phone}</p>
        <div className="mt-4 rounded-xl border border-dashed border-accent bg-accent/10 p-3 text-sm">
          Demo mode — SMS simulated. Your code is <b className="font-mono text-lg tracking-widest">{otp.devOtp}</b>
        </div>
        <div className="mt-6 flex justify-center gap-3">
          {d.map((v, i) => (
            <input key={i} ref={(el) => { refs.current[i] = el; }} value={v} inputMode="numeric" maxLength={1} aria-label={`Digit ${i + 1}`}
              className="size-14 rounded-xl border-2 bg-background text-center font-mono text-2xl font-bold outline-none focus:border-primary"
              onChange={(e) => { const c = e.target.value.replace(/\D/g, "").slice(-1); const n = [...d]; n[i] = c; setD(n); if (c && i < 3) refs.current[i + 1]?.focus(); }}
              onKeyDown={(e) => { if (e.key === "Backspace" && !d[i] && i > 0) refs.current[i - 1]?.focus(); if (e.key === "Enter") submit(); }}
              onPaste={(e) => { const p = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4); if (p.length === 4) { e.preventDefault(); setD(p.split("")); } }} />
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">{left > 0 ? `Code expires in ${Math.floor(left / 60)}:${String(left % 60).padStart(2, "0")}` : "Code expired"}</p>
        <button onClick={submit} disabled={d.join("").length < 4} className="mt-6 w-full rounded-full bg-primary py-3 font-bold text-primary-foreground disabled:opacity-50">Verify</button>
        <button onClick={() => { try { setOtp(resendOtp(otp.phone)); setD(["", "", "", ""]); toast.success("New code sent"); } catch (e) { toast.error((e as Error).message); } }} className="mt-3 text-sm font-semibold text-primary">Resend OTP</button>
      </Card>
    </Page>
  );
}
