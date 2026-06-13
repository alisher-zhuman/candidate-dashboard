import { memo } from "react";

import type { Candidate, CriteriaStatus } from "../../types/candidate";
import { StatusBadge } from "../StatusBadge/StatusBadge";
import { Section } from "./Section";
import { StatusControl } from "./StatusControl";

const CRITERIA_ICONS: Record<CriteriaStatus, string> = {
  ok: "✅",
  partial: "⚠️",
  no: "❌",
};

interface CandidateDetailProps {
  candidate: Candidate;
}

export const CandidateDetail = memo(({ candidate }: CandidateDetailProps) => (
  <div className="space-y-6">
    <div className="flex flex-wrap gap-4 items-start justify-between">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{candidate.name}</h1>
        <p className="text-slate-500 mt-1">{candidate.pos_label}</p>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <StatusBadge verdict={candidate.vc} verdictLabel={candidate.verdict} />
        <StatusBadge status={candidate.status} />
        <StatusControl candidate={candidate} />
      </div>
    </div>

    <Section title="Контакты">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
        <div>
          <span className="text-slate-500">Email: </span>
          <span>{candidate.email}</span>
        </div>

        {candidate.phone && (
          <div>
            <span className="text-slate-500">Телефон: </span>
            <span>{candidate.phone}</span>
          </div>
        )}

        <div>
          <span className="text-slate-500">Telegram: </span>
          <span>{candidate.tg}</span>
        </div>
        <div>
          <span className="text-slate-500">Город: </span>
          <span>{candidate.city}</span>
        </div>
      </div>
    </Section>

    <Section
      title={
        <>
          Опыт работы{" "}
          <span className="text-slate-400 font-normal">
            ({candidate.total_exp})
          </span>
        </>
      }
    >
      <div className="space-y-3">
        {candidate.exp.map(([period, company, position, duration], i) => (
          <div key={i} className="flex gap-4 text-sm">
            <div className="text-slate-400 min-w-fit">{period}</div>
            <div>
              <div className="font-medium text-slate-900">{position}</div>
              <div className="text-slate-500">
                {company} · {duration}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>

    <Section title="Стек">
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {candidate.stack.split(", ").map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="text-sm">
          <span className="text-slate-500">Образование: </span>
          <span>{candidate.edu}</span>
        </div>
      </div>
    </Section>

    <Section title="Критерии оценки">
      <div className="space-y-2">
        {candidate.criteria.map(([status, description], i) => (
          <div key={i} className="flex gap-3 text-sm items-start">
            <span>{CRITERIA_ICONS[status]}</span>
            <span className="text-slate-700">{description}</span>
          </div>
        ))}
      </div>
    </Section>

    <Section title="Вопросы для собеседования">
      <ul className="space-y-2">
        {candidate.questions.map((q, i) => (
          <li key={i} className="flex gap-3 text-sm">
            <span className="text-blue-600 font-medium">{i + 1}.</span>
            <span className="text-slate-700">{q}</span>
          </li>
        ))}
      </ul>
    </Section>

    <Section title="Summary" className="bg-blue-50 border-blue-100">
      <p className="text-sm text-slate-700 leading-relaxed">
        {candidate.summary}
      </p>
    </Section>
  </div>
));

CandidateDetail.displayName = "CandidateDetail";
