import type { NeedType, Urgency } from "./store";

export interface TriageResult {
  aiCategory: string;
  urgencyLevel: Urgency;
  confidenceScore: number;
  aiSummary: string;
  aiAction: string;
  aiScore: number;
  priorityScore: number;
}

const CRITICAL = ["trapped", "unconscious", "not breathing", "bleeding", "drowning", "collapsed", "fire", "heart attack", "stroke", "flood water rising", "stuck", "dying", "severe", "emergency", "pregnant", "labour", "labor"];
const HIGH = ["injured", "child", "children", "baby", "infant", "elderly", "old", "fever", "no food", "starving", "disabled", "sick", "urgent", "days", "rain", "cold", "insulin", "medicine"];
const MEDIUM = ["need", "help", "shortage", "running out", "family", "hungry", "thirsty", "homeless"];

const BASE: Record<NeedType, number> = { rescue: 40, medical: 35, water: 25, food: 22, shelter: 22, clothing: 10, education: 5, other: 10 };

const ACTIONS: Record<NeedType, string> = {
  rescue: "Dispatch rescue-trained volunteers immediately and alert local emergency services.",
  medical: "Send a first-aid capable volunteer; escalate to nearest hospital if symptoms worsen.",
  water: "Deliver packaged drinking water and purification tablets within hours.",
  food: "Dispatch dry ration kits or cooked meals sized for household.",
  shelter: "Coordinate temporary shelter placement with nearest relief camp.",
  clothing: "Arrange clothing and blanket kit from NGO inventory.",
  education: "Connect family with NGO education program for study materials.",
  other: "NGO coordinator to call requester and assess needs.",
};

/** Deterministic local triage. Users cannot pick their own priority. */
export function triage(needType: NeedType, description: string, people = 1): TriageResult {
  const d = description.toLowerCase();
  const hits = (list: string[]) => list.filter((k) => d.includes(k));
  const c = hits(CRITICAL), h = hits(HIGH), m = hits(MEDIUM);
  let score = BASE[needType] + c.length * 22 + h.length * 9 + m.length * 3 + Math.min(people, 20) * 1.2;
  score = Math.max(5, Math.min(100, Math.round(score)));
  const urgencyLevel: Urgency = score >= 75 ? "critical" : score >= 50 ? "high" : score >= 28 ? "medium" : "low";
  const signals = [...c, ...h].slice(0, 3);
  const confidenceScore = Math.min(0.97, 0.55 + (c.length + h.length + m.length) * 0.07 + (description.length > 60 ? 0.1 : 0));
  return {
    aiCategory: needType,
    urgencyLevel,
    confidenceScore: Math.round(confidenceScore * 100) / 100,
    aiSummary: `${people} ${people === 1 ? "person" : "people"} need ${needType} support${signals.length ? ` — signals: ${signals.join(", ")}` : ""}.`,
    aiAction: ACTIONS[needType],
    aiScore: score,
    priorityScore: score + (urgencyLevel === "critical" ? 20 : 0),
  };
}
