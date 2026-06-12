import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCandidatesStore } from '../store/candidatesStore';
import { CandidateDetail } from '../components/CandidateDetail/CandidateDetail';

export const CandidateDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const candidates = useCandidatesStore(state => state.candidates);
  const isLoading = useCandidatesStore(state => state.isLoading);
  const fetchCandidates = useCandidatesStore(state => state.fetchCandidates);

  // Если зашли напрямую по URL — загружаем кандидатов
  useEffect(() => {
    if (candidates.length === 0) {
      fetchCandidates();
    }
  }, [candidates.length, fetchCandidates]);

  const candidate = candidates.find(c => c.id === id);

  if (isLoading) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64 text-gray-500">
          Загрузка...
        </div>
      </main>
    );
  }

  if (!candidate) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center py-16">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">404 — Кандидат не найден</h2>
          <p className="text-gray-500 mb-6">Возможно, он был удалён или ссылка неверна</p>
          <button
            onClick={() => navigate('/candidates')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Вернуться к списку
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-6"
      >
        ← Назад к списку
      </button>

      <CandidateDetail candidate={candidate} />
    </main>
  );
};
