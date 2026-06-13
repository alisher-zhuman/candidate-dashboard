import { useState } from "react";
import { toast } from "sonner";

import type { Candidate, CandidateStatus } from "../../types/candidate";
import { useCandidatesStore } from "../../store/candidatesStore";
import { STATUS_LABELS, STATUS_OPTIONS } from "../../constants/candidate";

interface StatusControlProps {
  candidate: Candidate;
}

// Смена статуса: оптимистичное обновление в сторе + тосты, локальный loading
export const StatusControl = ({ candidate }: StatusControlProps) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const updateStatus = useCandidatesStore((state) => state.updateStatus);

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
    <>
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
        <span className="text-xs text-slate-400 animate-pulse">
          Сохраняем...
        </span>
      )}
    </>
  );
};
