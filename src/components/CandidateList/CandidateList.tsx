import { useEffect } from 'react';
import { useCandidatesStore } from '../../store/candidatesStore';
import { useFiltersStore } from '../../store/filtersStore';
import { useCandidates } from '../../hooks/useCandidates';
import { useUrlFilters } from '../../hooks/useUrlFilters';
import { CandidateCard } from '../CandidateCard/CandidateCard';
import { FilterPanel } from '../FilterPanel/FilterPanel';
import { SearchBar } from '../SearchBar/SearchBar';

export const CandidateList = () => {
  const fetchCandidates = useCandidatesStore(state => state.fetchCandidates);
  const page = useFiltersStore(state => state.page);
  const setPage = useFiltersStore(state => state.setPage);

  const { candidates, totalCandidates, totalPages, isLoading, error } = useCandidates();

  // Синхронизация фильтров с URL
  useUrlFilters();

  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Загрузка кандидатов...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">

      {/* Поиск и фильтры */}
      <div className="space-y-3">
        <SearchBar />
        <FilterPanel />
      </div>

      {/* Счётчик */}
      <div className="text-sm text-gray-500">
        Найдено кандидатов: <span className="font-medium text-gray-900">{totalCandidates}</span>
      </div>

      {/* Таблица */}
      {candidates.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          Кандидаты не найдены
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">ФИО</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Город</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Опыт</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Вердикт</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Статус</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Стек</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map(candidate => (
                <CandidateCard key={candidate.id} candidate={candidate} />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Пагинация */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                page === p
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
