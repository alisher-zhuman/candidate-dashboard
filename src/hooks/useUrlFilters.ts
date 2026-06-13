import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { useFiltersStore } from "../store/filtersStore";
import type { SortField, SortOrder, VerdictFilter } from "../types/candidate";
import {
  DEFAULT_FILTERS,
  SORT_FIELDS,
  SORT_ORDERS,
  VERDICTS,
} from "../constants/candidate";

export const useUrlFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = useFiltersStore((state) => state.search);
  const verdict = useFiltersStore((state) => state.verdict);
  const sortField = useFiltersStore((state) => state.sortField);
  const sortOrder = useFiltersStore((state) => state.sortOrder);
  const page = useFiltersStore((state) => state.page);

  const setSearch = useFiltersStore((state) => state.setSearch);
  const setVerdict = useFiltersStore((state) => state.setVerdict);
  const setSortField = useFiltersStore((state) => state.setSortField);
  const setSortOrder = useFiltersStore((state) => state.setSortOrder);
  const setPage = useFiltersStore((state) => state.setPage);

  // Читаем из URL при маунте
  useEffect(() => {
    const urlSearch = searchParams.get("search") ?? DEFAULT_FILTERS.search;
    const urlVerdict = searchParams.get("verdict") ?? DEFAULT_FILTERS.verdict;
    const urlSortField =
      searchParams.get("sortField") ?? DEFAULT_FILTERS.sortField;
    const urlSortOrder =
      searchParams.get("sortOrder") ?? DEFAULT_FILTERS.sortOrder;
    const urlPage = Number(
      searchParams.get("page") ?? String(DEFAULT_FILTERS.page),
    );

    if (urlSearch) {
      setSearch(urlSearch);
    }

    if (VERDICTS.includes(urlVerdict as VerdictFilter)) {
      setVerdict(urlVerdict as VerdictFilter);
    }

    if (SORT_FIELDS.includes(urlSortField as SortField)) {
      setSortField(urlSortField as SortField);
    }

    if (SORT_ORDERS.includes(urlSortOrder as SortOrder)) {
      setSortOrder(urlSortOrder as SortOrder);
    }

    if (!isNaN(urlPage) && urlPage > 0) {
      setPage(urlPage);
    }
  }, []);

  // Пишем в URL при изменении фильтров
  useEffect(() => {
    const params: Record<string, string> = {};
    if (search) params.search = search;
    if (verdict !== DEFAULT_FILTERS.verdict) params.verdict = verdict;
    if (sortField !== DEFAULT_FILTERS.sortField) params.sortField = sortField;
    if (sortOrder !== DEFAULT_FILTERS.sortOrder) params.sortOrder = sortOrder;
    if (page > DEFAULT_FILTERS.page) params.page = String(page);
    setSearchParams(params, { replace: true });
  }, [search, verdict, sortField, sortOrder, page]);
};
