import { memo, useEffect, useState } from "react";
import { FixedSizeList, type ListChildComponentProps } from "react-window";

import type { Candidate } from "../../types/candidate";
import { api } from "../../services/api";
import { StatusBadge } from "../StatusBadge/StatusBadge";

const ROW_HEIGHT = 56;
const LIST_HEIGHT = 528;

// Классы колонок в одном месте — чтобы шапка и строки не разъезжались
const COLS = {
  name: "flex-1 min-w-0",
  city: "w-28 hidden sm:block",
  exp: "w-16 hidden sm:block",
  verdict: "w-36 shrink-0",
  status: "w-36 shrink-0",
  stack: "flex-1 min-w-0 hidden lg:block",
};

// Одна строка списка. memo — чтобы при скролле не перерисовывать лишнее
const Row = memo(({ index, style, data }: ListChildComponentProps<Candidate[]>) => {
  const candidate = data[index];

  return (
    <div
      style={style}
      className="flex items-center gap-4 px-4 border-b border-slate-100 text-sm"
    >
      <span className={`${COLS.name} font-medium text-slate-900 truncate`}>
        {candidate.name}
      </span>
      <span className={`${COLS.city} text-slate-500 truncate`}>
        {candidate.city}
      </span>
      <span className={`${COLS.exp} text-slate-500`}>{candidate.total_exp}</span>
      <span className={COLS.verdict}>
        <StatusBadge verdict={candidate.vc} verdictLabel={candidate.verdict} />
      </span>
      <span className={COLS.status}>
        <StatusBadge status={candidate.status} />
      </span>
      <span className={`${COLS.stack} text-slate-500 truncate`}>
        {candidate.stack}
      </span>
    </div>
  );
});
Row.displayName = "VirtualRow";

export const VirtualCandidateList = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false; // защита от setState после размонтирования (нет утечек)

    api.getLargeCandidates().then((data) => {
      if (cancelled) return;
      setCandidates(data);
      setIsLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="flex gap-2 items-center text-slate-400">
          <div className="w-4 h-4 border-2 border-slate-300 border-t-blue-600 rounded-full animate-spin" />
          Загрузка...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-slate-500">
        Всего кандидатов:{" "}
        <span className="font-medium text-slate-900">{candidates.length}</span>
        <span className="ml-2 text-slate-400">
          — в DOM рендерятся только видимые строки (react-window)
        </span>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {/* Шапка колонок */}
        <div className="flex items-center gap-4 px-4 py-3 bg-slate-50 border-b border-slate-200 text-xs font-medium text-slate-500 uppercase tracking-wider">
          <span className={COLS.name}>ФИО</span>
          <span className={COLS.city}>Город</span>
          <span className={COLS.exp}>Опыт</span>
          <span className={COLS.verdict}>Вердикт</span>
          <span className={COLS.status}>Статус</span>
          <span className={COLS.stack}>Стек</span>
        </div>

        {/* Виртуализированный список строк */}
        <FixedSizeList
          height={LIST_HEIGHT}
          itemCount={candidates.length}
          itemSize={ROW_HEIGHT}
          width="100%"
          itemData={candidates}
        >
          {Row}
        </FixedSizeList>
      </div>
    </div>
  );
};
