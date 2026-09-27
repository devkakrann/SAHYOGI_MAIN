import type { DB, HelpRequest, NeedType, Status, User } from "./store";
import { hash } from "./store";
import { triage } from "./triage";

export const DEMO_PASSWORD = "demo1234";

export const DEMO_ACCOUNTS = [
  { id: "ngo-1", label: "NGO Admin — Seva Relief Foundation", role: "ngo", phone: "9000000001" },
  { id: "vol-1", label: "Volunteer — Aarav Mehta", role: "volunteer", phone: "9100000001" },
  { id: "usr-1", label: "Citizen — Priya Sharma", role: "user", phone: "9200000001" },
] as const;

export function buildSeed(): DB {
  const now = Date.now();
  const pw = hash(DEMO_PASSWORD);
  const base = { passwordHash: pw, verified: true, createdAt: now - 86400000 * 20 };
  const ngo = (id: string, orgName: string, name: string, phone: string, area: string, lat: number, lng: number, domains: NeedType[], inviteCode: string): User =>
    ({ ...base, id, role: "ngo", orgName, name, phone, area, lat, lng, domains, inviteCode, regNo: "NGO/DL/" + phone.slice(-4), radiusKm: 30, available: true });
  const vol = (id: string, name: string, phone: string, area: string, lat: number, lng: number, parentNgoId: string, skills: string[], deliveries: number, availableNow = true): User =>
    ({ ...base, id, role: "volunteer", name, phone, area, lat, lng, parentNgoId, skills, deliveries, points: deliveries * 25, availableNow });
  const usr = (id: string, name: string, phone: string, area: string, lat: number, lng: number, people: number): User =>
    ({ ...base, id, role: "user", name, phone, area, lat, lng, people });

  const users: User[] = [
    ngo("ngo-1", "Seva Relief Foundation", "Meera Iyer", "9000000001", "Connaught Place, Delhi", 28.6315, 77.2167, ["food", "medical", "water", "shelter", "rescue"], "SEVA2026"),
    ngo("ngo-2", "Annapurna Food Network", "Rohit Khanna", "9000000002", "Karol Bagh, Delhi", 28.6519, 77.1909, ["food", "water", "clothing"], "ANNA7788"),
    ngo("ngo-3", "Vidya Rise Trust", "Sana Qureshi", "9000000003", "Saket, Delhi", 28.5245, 77.2066, ["education", "clothing", "shelter"], "VIDYA123"),
    vol("vol-1", "Aarav Mehta", "9100000001", "Rajouri Garden", 28.6415, 77.1209, "ngo-1", ["First aid", "Driving"], 7),
    vol("vol-2", "Ishita Rao", "9100000002", "Lajpat Nagar", 28.5677, 77.2433, "ngo-1", ["Nursing", "Hindi"], 12),
    vol("vol-3", "Kabir Singh", "9100000003", "Dwarka", 28.5921, 77.046, "ngo-1", ["Rescue", "Swimming"], 2, false),
    vol("vol-4", "Neha Gupta", "9100000004", "Karol Bagh", 28.6519, 77.1909, "ngo-2", ["Cooking", "Logistics"], 5),
    vol("vol-5", "Farhan Ali", "9100000005", "Paharganj", 28.6448, 77.2167, "ngo-2", ["Driving"], 1),
    vol("vol-6", "Ananya Das", "9100000006", "Saket", 28.5245, 77.2066, "ngo-3", ["Teaching"], 9),
    usr("usr-1", "Priya Sharma", "9200000001", "Yamuna Pushta, Delhi", 28.6608, 77.2466, 5),
    usr("usr-2", "Ramesh Kumar", "9200000002", "Seelampur, Delhi", 28.6695, 77.2687, 3),
    usr("usr-3", "Lakshmi Devi", "9200000003", "Okhla, Delhi", 28.5355, 77.271, 6),
  ];

  const R = (i: number, userId: string, name: string, needType: NeedType, description: string, area: string, pincode: string, lat: number, lng: number, people: number, status: Status, ngoId: string | null, volId: string | null, hoursAgo: number): HelpRequest => {
    const ng = users.find((u) => u.id === ngoId);
    const v = users.find((u) => u.id === volId);
    const created = now - hoursAgo * 3600000;
    return {
      ...triage(needType, description, people), id: `req-${i}`, userId, name, phone: users.find((u) => u.id === userId)?.phone ?? "9876500000",
      needType, description, area, pincode, lat, lng, people, status,
      matchedNgoIds: ngoId ? [ngoId] : [], assignedNgoId: ngoId, assignedNgoName: ng?.orgName ?? null,
      assignedVolunteerId: volId, assignedVolunteerName: v?.name ?? null,
      assignedAt: volId ? created + 1800000 : null, fulfilledAt: status === "fulfilled" ? created + 5400000 : null, createdAt: created,
    };
  };

  const requests: HelpRequest[] = [
    R(1, "usr-1", "Priya Sharma", "water", "Flood water entered our lane, no drinking water for 2 days, two children and elderly mother at home.", "Yamuna Pushta", "110006", 28.6608, 77.2466, 5, "matched", "ngo-1", null, 1),
    R(2, "usr-2", "Ramesh Kumar", "medical", "My father collapsed and has severe fever, we need medicine and someone with first aid urgently.", "Seelampur", "110053", 28.6695, 77.2687, 3, "assigned", "ngo-1", "vol-1", 3),
    R(3, "usr-3", "Lakshmi Devi", "food", "Family of six, daily wage work stopped due to rain, running out of food.", "Okhla", "110020", 28.5355, 77.271, 6, "in_progress", "ngo-1", "vol-2", 6),
    R(4, "usr-1", "Priya Sharma", "shelter", "Roof collapsed partially after heavy rain, need temporary shelter.", "Yamuna Pushta", "110006", 28.6628, 77.2436, 5, "fulfilled", "ngo-1", "vol-1", 48),
    R(5, "usr-2", "Ramesh Kumar", "rescue", "Neighbour trapped in waterlogged basement, water rising fast, emergency!", "Shahdara", "110032", 28.6733, 77.2894, 2, "pending", null, null, 0.3),
    R(6, "usr-3", "Lakshmi Devi", "education", "Children need notebooks and school bags for new term.", "Okhla", "110020", 28.5375, 77.269, 3, "matched", "ngo-3", null, 20),
    R(7, "usr-2", "Ramesh Kumar", "clothing", "Need blankets and warm clothes for family, cold nights.", "Karol Bagh", "110005", 28.6539, 77.1889, 4, "assigned", "ngo-2", "vol-4", 10),
    R(8, "usr-1", "Priya Sharma", "food", "Community kitchen ran out of rations, 20 people waiting.", "Paharganj", "110055", 28.6448, 77.2127, 20, "matched", "ngo-1", null, 2),
    R(9, "usr-3", "Lakshmi Devi", "medical", "Pregnant woman in labour, no transport available.", "Jamia Nagar", "110025", 28.5616, 77.2803, 1, "matched", "ngo-1", null, 0.5),
    R(10, "usr-2", "Ramesh Kumar", "water", "Water tanker did not come for a week.", "Mustafabad", "110094", 28.7122, 77.2724, 8, "fulfilled", "ngo-2", "vol-5", 72),
    R(11, "usr-1", "Priya Sharma", "food", "Need ration kit for elderly couple.", "Daryaganj", "110002", 28.6448, 77.2403, 2, "fulfilled", "ngo-1", "vol-2", 30),
    R(12, "usr-3", "Lakshmi Devi", "education", "Tuition support for class 10 student.", "Saket", "110017", 28.5265, 77.2086, 1, "fulfilled", "ngo-3", "vol-6", 96),
  ];

  const activity = [
    { t: "New critical rescue request in Shahdara", k: "request", h: 0.3 },
    { t: "Seva Relief Foundation matched to medical request in Jamia Nagar", k: "match", h: 0.5 },
    { t: "Seva Relief Foundation assigned Aarav Mehta to medical request in Seelampur", k: "assign", h: 2.5 },
    { t: "food request in Daryaganj fulfilled by Ishita Rao", k: "fulfill", h: 28 },
    { t: "Ananya Das joined Vidya Rise Trust as a volunteer", k: "join", h: 50 },
  ].map((a, i) => ({ id: `act-${i}`, at: now - a.h * 3600000, text: a.t, kind: a.k as DB["activity"][number]["kind"] }));

  return { users, requests, activity };
}
