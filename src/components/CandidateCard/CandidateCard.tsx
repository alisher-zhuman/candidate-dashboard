import { memo } from "react";
import { useNavigate } from "react-router-dom";

import type { Candidate } from "../../types/candidate";
import { StatusBadge } from "../StatusBadge/StatusBadge";

interface CandidateCardProps {
  candidate: Candidate;
}

export const CandidateCard = memo(({ candidate }: CandidateCardProps) => {
  const navigate = useNavigate();

  const openDetail = () => navigate(`/candidate/${candidate.id}`);

  return (
    <tr
      role="button"
      tabIndex={0}
      aria-label={`Открыть кандидата ${candidate.name}`}
      onClick={openDetail}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openDetail();
        }
      }}
      className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors focus:outline-none focus-visible:bg-slate-50 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500"
    >
      <td className="py-3.5 px-4">
        <span className="font-medium text-slate-900">{candidate.name}</span>
      </td>
      <td className="py-3.5 px-4 text-slate-500 text-sm hidden sm:table-cell">
        {candidate.city}
      </td>
      <td className="py-3.5 px-4 text-slate-500 text-sm hidden sm:table-cell">
        {candidate.total_exp}
      </td>
      <td className="py-3.5 px-4">
        <StatusBadge verdict={candidate.vc} verdictLabel={candidate.verdict} />
      </td>
      <td className="py-3.5 px-4">
        <StatusBadge status={candidate.status} />
      </td>
      <td className="py-3.5 px-4 text-slate-500 text-sm max-w-xs truncate hidden lg:table-cell">
        {candidate.stack}
      </td>
    </tr>
  );
});

CandidateCard.displayName = "CandidateCard";
