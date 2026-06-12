import { CandidateList } from '../components/CandidateList/CandidateList';
import { Layout } from '../components/UI/Layout';

export const CandidatesPage = () => {
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Кандидаты</h1>
        <p className="text-slate-500 mt-1 text-sm">Управление и оценка кандидатов на позицию React Middle</p>
      </div>
      <CandidateList />
    </Layout>
  );
};
