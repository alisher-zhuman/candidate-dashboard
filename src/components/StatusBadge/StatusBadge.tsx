import type { CandidateStatus, Verdict } from "../../types/candidate";
import { cn } from "../../utils/cn";

const STATUS_CONFIG: Record<
  CandidateStatus,
  { label: string; className: string }
> = {
  new: { label: "Новый", className: "bg-slate-100 text-slate-600" },
  review: { label: "На рассмотрении", className: "bg-blue-50 text-blue-700" },
  invited: { label: "Приглашён", className: "bg-emerald-50 text-emerald-700" },
  rejected: { label: "Отклонён", className: "bg-red-50 text-red-600" },
};

const VERDICT_CONFIG: Record<string, { className: string }> = {
  "verdict-green": { className: "bg-emerald-50 text-emerald-700" },
  "verdict-orange": { className: "bg-amber-50 text-amber-700" },
  "verdict-red": { className: "bg-red-50 text-red-600" },
};

interface StatusBadgeProps {
  status?: CandidateStatus;
  verdict?: string;
  verdictLabel?: Verdict;
}

export const StatusBadge = ({
  status,
  verdict,
  verdictLabel,
}: StatusBadgeProps) => {
  if (status) {
    const config = STATUS_CONFIG[status];

    return (
      <span
        className={cn(
          "inline-flex px-2.5 py-1 rounded-md text-xs font-medium transition-colors duration-150",
          config.className,
        )}
      >
        {config.label}
      </span>
    );
  }

  if (verdict && verdictLabel) {
    const config = VERDICT_CONFIG[verdict];

    return (
      <span
        className={cn(
          "inline-flex px-2.5 py-1 rounded-md text-xs font-medium transition-colors duration-150",
          config.className,
        )}
      >
        {verdictLabel}
      </span>
    );
  }

  return null;
};
