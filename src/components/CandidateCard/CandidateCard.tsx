import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Candidate } from '../../types/candidate';
import { StatusBadge } from '../StatusBadge/StatusBadge';
import { cn } from '../../utils/cn';

interface CandidateCardProps {
  candidate: Candidate;
}

export const CandidateCard = memo(({ candidate }: CandidateCardProps) => {
  const navigate = useNavigate();

  return (
    <tr
      onClick={() => navigate(`/candidate/${candidate.id}`)}
      className={cn("border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors")}
    >
      <td className="py-3.5 px-4">
        <span className="font-medium text-slate-900">{candidate.name}</span>
      </td>
      <td className="py-3.5 px-4 text-slate-500 text-sm hidden sm:table-cell">{candidate.city}</td>
      <td className="py-3.5 px-4 text-slate-500 text-sm hidden sm:table-cell">{candidate.total_exp}</td>
      <td className="py-3.5 px-4">
        <StatusBadge verdict={candidate.vc} verdictLabel={candidate.verdict} />
      </td>
      <td className="py-3.5 px-4">
        <StatusBadge status={candidate.status} />
      </td>
      <td className="py-3.5 px-4 text-slate-500 text-sm max-w-xs truncate hidden lg:table-cell">{candidate.stack}</td>
    </tr>
  );
});

CandidateCard.displayName = 'CandidateCard';
