import { useEffect } from 'react';
import { useCandidatesStore } from '../../store/candidatesStore';
import { useFiltersStore } from '../../store/filtersStore';
import { useCandidates } from '../../hooks/useCandidates';
import { useUrlFilters } from '../../hooks/useUrlFilters';
import { CandidateCard } from '../CandidateCard/CandidateCard';
import { FilterPanel } from '../FilterPanel/FilterPanel';
import { SearchBar } from '../SearchBar/SearchBar';

const SkeletonRow = () => (
  <tr className="border-b border-slate-100">
    {[140, 80, 60, 90, 80, 160].map((w, i) => (
      <td key={i} className="py-3.5 px-4">
        <div
          className="h-4 bg-slate-200 rounded animate-pulse"
          style={{ width: w }}
        />
      </td>
    ))}
  </tr>
);

export const CandidateList = () => {
  const fetchCandidates = useCandidatesStore(state => state.fetchCandidates);
  const page = useFiltersStore(state => state.page);
  const setPage = useFiltersStore(state => state.setPage);

  const { candidates, totalCandidates, totalPages, isLoading, error } = useCandidates();

  useUrlFilters();

  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);

  return (
    <div className="space-y-4">

      {/* Поиск и фильтры */}
      <div className="space-y-3">
        <SearchBar />
        <FilterPanel />
      </div>

      {/* Счётчик */}
      <div className="text-sm text-slate-500">
        Найдено кандидатов:{' '}
        <span className="font-medium text-slate-900">{totalCandidates}</span>
      </div>

      {/* Ошибка */}
      {error && (
        <div className="text-center py-8 text-red-500 text-sm">{error}</div>
      )}

      {/* Таблица */}
      {!error && (
        candidates.length === 0 && !isLoading ? (
          <div className="text-center py-16 text-slate-400 text-sm">
            Кандидаты не найдены
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">ФИО</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Город</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Опыт</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Вердикт</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Статус</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Стек</th>
                </tr>
              </thead>
              <tbody>
                {isLoading
                  ? Array.from({ length: 5 }, (_, i) => <SkeletonRow key={i} />)
                  : candidates.map(candidate => (
                      <CandidateCard key={candidate.id} candidate={candidate} />
                    ))
                }
              </tbody>
            </table>
          </div>
        )
      )}

      {/* Пагинация */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-1.5">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                page === p
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}

    </div>
  );
};
