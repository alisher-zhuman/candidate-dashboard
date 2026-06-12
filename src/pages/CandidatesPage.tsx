import { CandidateList } from '../components/CandidateList/CandidateList';

export const CandidatesPage = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Кандидаты
      </h1>
      <CandidateList />
    </main>
  );
};
