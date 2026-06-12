import type { CandidateStatus, Verdict } from "../../types/candidate";

const STATUS_CONFIG: Record<
  CandidateStatus,
  { label: string; className: string }
> = {
  new: { label: "Новый", className: "bg-gray-100 text-gray-600" },
  review: { label: "На рассмотрении", className: "bg-blue-100 text-blue-700" },
  invited: { label: "Приглашён", className: "bg-green-100 text-green-700" },
  rejected: { label: "Отклонён", className: "bg-red-100 text-red-700" },
};

const VERDICT_CONFIG: Record<string, { className: string }> = {
  "verdict-green": { className: "bg-green-100 text-green-700" },
  "verdict-orange": { className: "bg-orange-100 text-orange-700" },
  "verdict-red": { className: "bg-red-100 text-red-700" },
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
        className={`px-2 py-1 rounded-full text-xs font-medium ${config.className}`}
      >
        {config.label}
      </span>
    );
  }

  if (verdict && verdictLabel) {
    const config = VERDICT_CONFIG[verdict];
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${config.className}`}
      >
        {verdictLabel}
      </span>
    );
  }

  return null;
};
