import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCandidatesStore } from '../store/candidatesStore';
import { CandidateDetail } from '../components/CandidateDetail/CandidateDetail';
import { Layout } from '../components/UI/Layout';

export const CandidateDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const candidates = useCandidatesStore(state => state.candidates);
  const isLoading = useCandidatesStore(state => state.isLoading);
  const fetchCandidates = useCandidatesStore(state => state.fetchCandidates);

  useEffect(() => {
    if (candidates.length === 0) {
      fetchCandidates();
    }
  }, [candidates.length, fetchCandidates]);

  const candidate = candidates.find(c => c.id === id);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="flex gap-2 items-center text-slate-400">
            <div className="w-4 h-4 border-2 border-slate-300 border-t-blue-600 rounded-full animate-spin"></div>
            Загрузка...
          </div>
        </div>
      </Layout>
    );
  }

  if (!candidate) {
    return (
      <Layout>
        <div className="text-center py-24">
          <p className="text-5xl font-bold text-slate-200 mb-4">404</p>
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Кандидат не найден</h2>
          <p className="text-slate-500 mb-8 text-sm">Возможно, он был удалён или ссылка неверна</p>
          <button
            onClick={() => navigate('/candidates')}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Вернуться к списку
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors duration-150 mb-6 cursor-pointer group"
      >
        <span className="transition-transform duration-150 group-hover:-translate-x-0.5">←</span>
        Назад к списку
      </button>
      <CandidateDetail candidate={candidate} />
    </Layout>
  );
};
