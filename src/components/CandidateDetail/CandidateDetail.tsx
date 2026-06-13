import { memo, useState } from "react";
import { toast } from "sonner";
import type { Candidate, CandidateStatus, CriteriaStatus } from "../../types/candidate";
import { useCandidatesStore } from "../../store/candidatesStore";
import { StatusBadge } from "../StatusBadge/StatusBadge";

const CRITERIA_ICONS: Record<CriteriaStatus, string> = {
  ok: "✅",
  partial: "⚠️",
  no: "❌",
};

const STATUS_LABELS: Record<CandidateStatus, string> = {
  new: "Новый",
  review: "На рассмотрении",
  invited: "Приглашён",
  rejected: "Отклонён",
};

const STATUS_OPTIONS: CandidateStatus[] = ["new", "review", "invited", "rejected"];

interface CandidateDetailProps {
  candidate: Candidate;
}

export const CandidateDetail = memo(({ candidate }: CandidateDetailProps) => {
  const updateStatus = useCandidatesStore((state) => state.updateStatus);
  
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (status: CandidateStatus) => {
    if (status === candidate.status) return;
    setIsUpdating(true);
    try {
      await updateStatus(candidate.id, status);
      toast.success(`Статус обновлён: ${STATUS_LABELS[status]}`);
    } catch {
      toast.error("Не удалось обновить статус — изменения отменены");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Шапка */}
      <div className="flex flex-wrap gap-4 items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{candidate.name}</h1>
          <p className="text-slate-500 mt-1">{candidate.pos_label}</p>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <StatusBadge verdict={candidate.vc} verdictLabel={candidate.verdict} />
          <StatusBadge status={candidate.status} />
          {/* Смена статуса */}
          <select
            value={candidate.status}
            disabled={isUpdating}
            onChange={(e) => handleStatusChange(e.target.value as CandidateStatus)}
            className="px-3 py-1.5 border border-slate-200 bg-white rounded-lg text-sm text-slate-600 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABELS[s]}
              </option>
            ))}
          </select>
          {isUpdating && (
            <span className="text-xs text-slate-400 animate-pulse">Сохраняем...</span>
          )}
        </div>
      </div>

      {/* Контакты */}
      <div className="bg-white rounded-lg border border-slate-200 p-4 space-y-2">
        <h2 className="font-semibold text-slate-900 mb-3">Контакты</h2>
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
      </div>

      {/* Опыт */}
      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <h2 className="font-semibold text-slate-900 mb-3">
          Опыт работы{" "}
          <span className="text-slate-400 font-normal">({candidate.total_exp})</span>
        </h2>
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
      </div>

      {/* Стек и образование */}
      <div className="bg-white rounded-lg border border-slate-200 p-4 space-y-3">
        <h2 className="font-semibold text-slate-900">Стек</h2>
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

      {/* Критерии оценки */}
      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <h2 className="font-semibold text-slate-900 mb-3">Критерии оценки</h2>
        <div className="space-y-2">
          {candidate.criteria.map(([status, description], i) => (
            <div key={i} className="flex gap-3 text-sm items-start">
              <span>{CRITERIA_ICONS[status]}</span>
              <span className="text-slate-700">{description}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Вопросы для собеседования */}
      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <h2 className="font-semibold text-slate-900 mb-3">Вопросы для собеседования</h2>
        <ul className="space-y-2">
          {candidate.questions.map((q, i) => (
            <li key={i} className="flex gap-3 text-sm">
              <span className="text-blue-600 font-medium">{i + 1}.</span>
              <span className="text-slate-700">{q}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Summary */}
      <div className="bg-blue-50 rounded-lg border border-blue-100 p-4">
        <h2 className="font-semibold text-slate-900 mb-2">Summary</h2>
        <p className="text-sm text-slate-700 leading-relaxed">{candidate.summary}</p>
      </div>
    </div>
  );
});

CandidateDetail.displayName = "CandidateDetail";
