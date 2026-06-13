import { useFiltersStore } from "../../store/filtersStore";
import type { Verdict } from "../../types/candidate";
import { cn } from "../../utils/cn";

type SortField = "name" | "total_exp" | "createdAt";

const VERDICTS: (Verdict | "Все")[] = [
  "Все",
  "ПОДХОДИТ",
  "ЧАСТИЧНО",
  "НЕ СООТВЕТСТВУЕТ",
];

const SORT_OPTIONS: { value: SortField; label: string }[] = [
  { value: "createdAt", label: "По дате" },
  { value: "name", label: "По имени" },
  { value: "total_exp", label: "По опыту" },
];

const verdictActiveClass: Record<string, string> = {
  "Все": "bg-slate-900 text-white",
  "ПОДХОДИТ": "bg-emerald-600 text-white",
  "ЧАСТИЧНО": "bg-amber-500 text-white",
  "НЕ СООТВЕТСТВУЕТ": "bg-red-500 text-white",
};

export const FilterPanel = () => {
  const verdict = useFiltersStore((state) => state.verdict);
  const sortField = useFiltersStore((state) => state.sortField);
  const sortOrder = useFiltersStore((state) => state.sortOrder);
  const setVerdict = useFiltersStore((state) => state.setVerdict);
  const setSortField = useFiltersStore((state) => state.setSortField);
  const setSortOrder = useFiltersStore((state) => state.setSortOrder);

  return (
    <div className="flex flex-wrap gap-3 items-center">
      {/* Фильтр по вердикту */}
      <div className="flex gap-2 flex-wrap">
        {VERDICTS.map((v) => (
          <button
            key={v}
            onClick={() => setVerdict(v)}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer",
              verdict === v
                ? verdictActiveClass[v]
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            )}
          >
            {v}
          </button>
        ))}
      </div>

      {/* Сортировка */}
      <div className="flex gap-2 items-center sm:ml-auto w-full sm:w-auto">
        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value as SortField)}
          className="px-3 py-1.5 border border-slate-200 bg-white rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 text-slate-600 cursor-pointer"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>

        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="px-3 py-1.5 border border-slate-200 bg-white rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
        >
          {sortOrder === "asc" ? "↑ По возрастанию" : "↓ По убыванию"}
        </button>
      </div>
    </div>
  );
};
