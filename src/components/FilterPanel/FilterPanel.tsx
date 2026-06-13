import { useFiltersStore } from "../../store/filtersStore";
import type { SortField } from "../../types/candidate";
import {
  SORT_OPTIONS,
  VERDICTS,
  VERDICT_FILTER_CLASS,
} from "../../constants/candidate";
import { cn } from "../../utils/cn";

export const FilterPanel = () => {
  const verdict = useFiltersStore((state) => state.verdict);
  const sortField = useFiltersStore((state) => state.sortField);
  const sortOrder = useFiltersStore((state) => state.sortOrder);

  const setVerdict = useFiltersStore((state) => state.setVerdict);
  const setSortField = useFiltersStore((state) => state.setSortField);
  const setSortOrder = useFiltersStore((state) => state.setSortOrder);

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <div className="flex gap-2 flex-wrap">
        {VERDICTS.map((v) => (
          <button
            key={v}
            onClick={() => setVerdict(v)}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer",
              verdict === v
                ? VERDICT_FILTER_CLASS[v]
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50",
            )}
          >
            {v}
          </button>
        ))}
      </div>

      <div className="flex gap-2 items-center sm:ml-auto w-full sm:w-auto">
        <select
          value={sortField}
          aria-label="Поле сортировки"
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
          className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 bg-white rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer active:scale-95"
        >
          <span
            aria-hidden="true"
            className={cn(
              "inline-block transition-transform duration-200",
              sortOrder === "desc" && "rotate-180",
            )}
          >
            ↑
          </span>
          <span key={sortOrder} className="animate-fade-in-soft w-32 text-left">
            {sortOrder === "asc" ? "По возрастанию" : "По убыванию"}
          </span>
        </button>
      </div>
    </div>
  );
};
