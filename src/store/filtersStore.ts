import { create } from "zustand";

import type { SortField, SortOrder, VerdictFilter } from "../types/candidate";
import { DEFAULT_FILTERS } from "../constants/candidate";

interface FiltersState {
  search: string;
  verdict: VerdictFilter;
  sortField: SortField;
  sortOrder: SortOrder;
  page: number;
  setSearch: (search: string) => void;
  setVerdict: (verdict: VerdictFilter) => void;
  setSortField: (field: SortField) => void;
  setSortOrder: (order: SortOrder) => void;
  setPage: (page: number) => void;
  reset: () => void;
}

export const useFiltersStore = create<FiltersState>((set) => ({
  ...DEFAULT_FILTERS,
  setSearch: (search) => set({ search, page: 1 }),
  setVerdict: (verdict) => set({ verdict, page: 1 }),
  setSortField: (sortField) => set({ sortField }),
  setSortOrder: (sortOrder) => set({ sortOrder }),
  setPage: (page) => set({ page }),
  reset: () => set(DEFAULT_FILTERS),
}));
