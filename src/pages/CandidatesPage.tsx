import { lazy, Suspense, useState } from "react";

import { CandidateList } from "../components/CandidateList/CandidateList";
import { Layout } from "../components/UI/Layout";
import { cn } from "../utils/cn";

// Виртуализированный список + большой мок грузятся только при выборе режима
const VirtualCandidateList = lazy(() =>
  import("../components/CandidateList/VirtualCandidateList").then((m) => ({
    default: m.VirtualCandidateList,
  })),
);

const Spinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="flex gap-2 items-center text-slate-400">
      <div className="w-4 h-4 border-2 border-slate-300 border-t-blue-600 rounded-full animate-spin" />
      Загрузка...
    </div>
  </div>
);

type View = "paged" | "virtual";

export const CandidatesPage = () => {
  const [view, setView] = useState<View>("paged");

  return (
    <Layout>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Кандидаты</h1>
          <p className="text-slate-500 mt-1 text-sm">
            Управление и оценка кандидатов
          </p>
        </div>

        {/* Переключатель режимов: пагинация ↔ виртуализация */}
        <div className="flex gap-1 p-1 bg-slate-100 rounded-lg">
          <button
            onClick={() => setView("paged")}
            className={cn(
              "px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer",
              view === "paged"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-900",
            )}
          >
            Страницы · 25
          </button>
          <button
            onClick={() => setView("virtual")}
            className={cn(
              "px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer",
              view === "virtual"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-900",
            )}
          >
            Виртуализация · 120
          </button>
        </div>
      </div>

      {view === "paged" ? (
        <CandidateList />
      ) : (
        <Suspense fallback={<Spinner />}>
          <VirtualCandidateList />
        </Suspense>
      )}
    </Layout>
  );
};
