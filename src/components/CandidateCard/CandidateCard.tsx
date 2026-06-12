import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Candidate } from '../../types/candidate';
import { StatusBadge } from '../StatusBadge/StatusBadge';

interface CandidateCardProps {
  candidate: Candidate;
}

export const CandidateCard = memo(({ candidate }: CandidateCardProps) => {
  const navigate = useNavigate();

  return (
    <tr
      onClick={() => navigate(`/candidate/${candidate.id}`)}
      className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
    >
      <td className="py-3 px-4">
        <span className="font-medium text-gray-900">{candidate.name}</span>
      </td>
      <td className="py-3 px-4 text-gray-500 text-sm">{candidate.city}</td>
      <td className="py-3 px-4 text-gray-500 text-sm">{candidate.total_exp}</td>
      <td className="py-3 px-4">
        <StatusBadge verdict={candidate.vc} verdictLabel={candidate.verdict} />
      </td>
      <td className="py-3 px-4">
        <StatusBadge status={candidate.status} />
      </td>
      <td className="py-3 px-4 text-gray-500 text-sm max-w-xs truncate">{candidate.stack}</td>
    </tr>
  );
});

CandidateCard.displayName = 'CandidateCard';
