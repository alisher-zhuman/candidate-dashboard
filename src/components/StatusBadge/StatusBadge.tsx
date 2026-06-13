import type {
  CandidateStatus,
  Verdict,
  VerdictClass,
} from "../../types/candidate";
import {
  STATUS_BADGE_CLASS,
  STATUS_LABELS,
  VERDICT_BADGE_CLASS,
} from "../../constants/candidate";
import { cn } from "../../utils/cn";

const BADGE_BASE =
  "inline-flex px-2.5 py-1 rounded-md text-xs font-medium transition-colors duration-150";

interface StatusBadgeProps {
  status?: CandidateStatus;
  verdict?: VerdictClass;
  verdictLabel?: Verdict;
}

export const StatusBadge = ({
  status,
  verdict,
  verdictLabel,
}: StatusBadgeProps) => {
  if (status) {
    return (
      <span className={cn(BADGE_BASE, STATUS_BADGE_CLASS[status])}>
        {STATUS_LABELS[status]}
      </span>
    );
  }

  if (verdict && verdictLabel) {
    return (
      <span className={cn(BADGE_BASE, VERDICT_BADGE_CLASS[verdict])}>
        {verdictLabel}
      </span>
    );
  }

  return null;
};
