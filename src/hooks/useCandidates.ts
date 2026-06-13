import { useEffect, useMemo } from "react";

import { useCandidatesStore } from "../store/candidatesStore";
import { useFiltersStore } from "../store/filtersStore";
import { useDebounce } from "./useDebounce";
import type { Candidate } from "../types/candidate";
import { ALL_VERDICTS } from "../constants/candidate";

const CANDIDATES_PER_PAGE = 10;

export const useCandidates = () => {
  const candidates = useCandidatesStore((state) => state.candidates);
  const isLoading = useCandidatesStore((state) => state.isLoading);
  const error = useCandidatesStore((state) => state.error);

  const search = useFiltersStore((state) => state.search);
  const verdict = useFiltersStore((state) => state.verdict);
  const sortField = useFiltersStore((state) => state.sortField);
  const sortOrder = useFiltersStore((state) => state.sortOrder);
  const page = useFiltersStore((state) => state.page);
  const setPage = useFiltersStore((state) => state.setPage);

  const debouncedSearch = useDebounce(search, 300);

  const filtered = useMemo(() => {
    let result: Candidate[] = [...candidates];

    if (verdict !== ALL_VERDICTS) {
      result = result.filter((c) => c.verdict === verdict);
    }

    if (debouncedSearch.trim()) {
      const query = debouncedSearch.toLowerCase();
      result = result.filter((c) => c.name.toLowerCase().includes(query));
    }

    result.sort((a, b) => {
      if (sortField === "name") {
        return sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }

      if (sortField === "createdAt") {
        return sortOrder === "asc"
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }

      if (sortField === "total_exp") {
        const getExp = (exp: string) =>
          parseFloat(exp.replace("~", "").replace(" г.", ""));

        return sortOrder === "asc"
          ? getExp(a.total_exp) - getExp(b.total_exp)
          : getExp(b.total_exp) - getExp(a.total_exp);
      }
      return 0;
    });

    return result;
  }, [candidates, debouncedSearch, verdict, sortField, sortOrder]);

  const totalPages = Math.ceil(filtered.length / CANDIDATES_PER_PAGE);

  // Страница вышла за пределы (напр. ?page=99 в URL) — возвращаем на последнюю
  useEffect(() => {
    if (totalPages > 0 && page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages, setPage]);

  // safePage защищает срез от пустого результата в момент до коррекции стора
  const safePage = Math.min(page, Math.max(1, totalPages));
  const paginated = filtered.slice(
    (safePage - 1) * CANDIDATES_PER_PAGE,
    safePage * CANDIDATES_PER_PAGE,
  );

  return {
    candidates: paginated,
    totalCandidates: filtered.length,
    totalPages,
    isLoading,
    error,
  };
};
