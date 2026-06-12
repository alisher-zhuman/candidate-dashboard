export type Verdict = "ПОДХОДИТ" | "ЧАСТИЧНО" | "НЕ СООТВЕТСТВУЕТ";
export type VerdictClass = "verdict-green" | "verdict-orange" | "verdict-red";
export type CriteriaStatus = "ok" | "partial" | "no";
export type CandidateStatus = "new" | "review" | "invited" | "rejected";

export interface Candidate {
  id: string;
  name: string;
  position: string;
  pos_label: string;
  file: string;
  email: string;
  phone: string | null;
  city: string;
  tg: string;
  exp: [string, string, string, string][];
  total_exp: string;
  stack: string;
  edu: string;
  verdict: Verdict;
  vc: VerdictClass;
  criteria: [CriteriaStatus, string][];
  summary: string;
  questions: string[];
  status: CandidateStatus;
  createdAt: string;
}
