import { useNavigate } from "react-router-dom";

import { Layout } from "../components/UI/Layout";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="text-center py-24">
        <p className="text-7xl font-bold text-slate-200 mb-4">404</p>

        <h2 className="text-xl font-semibold text-slate-900 mb-2">
          Страница не найдена
        </h2>

        <p className="text-slate-500 mb-8 text-sm">
          Возможно, ссылка устарела или была введена неверно
        </p>

        <button
          onClick={() => navigate("/candidates")}
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
        >
          На главную
        </button>
      </div>
    </Layout>
  );
};
