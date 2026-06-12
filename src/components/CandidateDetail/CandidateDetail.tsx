import { memo } from "react";
import type { Candidate, CriteriaStatus } from "../../types/candidate";
import { StatusBadge } from "../StatusBadge/StatusBadge";

const CRITERIA_ICONS: Record<CriteriaStatus, string> = {
  ok: "✅",
  partial: "⚠️",
  no: "❌",
};

interface CandidateDetailProps {
  candidate: Candidate;
}

export const CandidateDetail = memo(({ candidate }: CandidateDetailProps) => {
  return (
    <div className="space-y-6">
      {/* Шапка */}
      <div className="flex flex-wrap gap-4 items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{candidate.name}</h1>
          <p className="text-gray-500 mt-1">{candidate.pos_label}</p>
        </div>
        <div className="flex gap-2">
          <StatusBadge
            verdict={candidate.vc}
            verdictLabel={candidate.verdict}
          />
          <StatusBadge status={candidate.status} />
        </div>
      </div>

      {/* Контакты */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-2">
        <h2 className="font-semibold text-gray-900 mb-3">Контакты</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-gray-500">Email: </span>
            <span>{candidate.email}</span>
          </div>
          {candidate.phone && (
            <div>
              <span className="text-gray-500">Телефон: </span>
              <span>{candidate.phone}</span>
            </div>
          )}
          <div>
            <span className="text-gray-500">Telegram: </span>
            <span>{candidate.tg}</span>
          </div>
          <div>
            <span className="text-gray-500">Город: </span>
            <span>{candidate.city}</span>
          </div>
        </div>
      </div>

      {/* Опыт */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h2 className="font-semibold text-gray-900 mb-3">
          Опыт работы{" "}
          <span className="text-gray-400 font-normal">
            ({candidate.total_exp})
          </span>
        </h2>
        <div className="space-y-3">
          {candidate.exp.map(([period, company, position, duration], i) => (
            <div key={i} className="flex gap-4 text-sm">
              <div className="text-gray-400 min-w-fit">{period}</div>
              <div>
                <div className="font-medium text-gray-900">{position}</div>
                <div className="text-gray-500">
                  {company} · {duration}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Стек и образование */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-3">
        <h2 className="font-semibold text-gray-900">Стек</h2>
        <div className="flex flex-wrap gap-2">
          {candidate.stack.split(", ").map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="text-sm">
          <span className="text-gray-500">Образование: </span>
          <span>{candidate.edu}</span>
        </div>
      </div>

      {/* Критерии оценки */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h2 className="font-semibold text-gray-900 mb-3">Критерии оценки</h2>
        <div className="space-y-2">
          {candidate.criteria.map(([status, description], i) => (
            <div key={i} className="flex gap-3 text-sm items-start">
              <span>{CRITERIA_ICONS[status]}</span>
              <span className="text-gray-700">{description}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Вопросы для собеседования */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h2 className="font-semibold text-gray-900 mb-3">
          Вопросы для собеседования
        </h2>
        <ul className="space-y-2">
          {candidate.questions.map((q, i) => (
            <li key={i} className="flex gap-3 text-sm">
              <span className="text-blue-500 font-medium">{i + 1}.</span>
              <span className="text-gray-700">{q}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Summary */}
      <div className="bg-blue-50 rounded-lg border border-blue-100 p-4">
        <h2 className="font-semibold text-gray-900 mb-2">Summary</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          {candidate.summary}
        </p>
      </div>
    </div>
  );
});

CandidateDetail.displayName = "CandidateDetail";
