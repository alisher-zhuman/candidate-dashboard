import { create } from "zustand";
import type { Verdict } from "../types/candidate";

type SortField = "name" | "total_exp" | "createdAt";
type SortOrder = "asc" | "desc";

interface FiltersState {
  search: string;
  verdict: Verdict | "Все";
  sortField: SortField;
  sortOrder: SortOrder;
  page: number;
  setSearch: (search: string) => void;
  setVerdict: (verdict: Verdict | "Все") => void;
  setSortField: (field: SortField) => void;
  setSortOrder: (order: SortOrder) => void;
  setPage: (page: number) => void;
  reset: () => void;
}

const initialState = {
  search: "",
  verdict: "Все" as const,
  sortField: "createdAt" as SortField,
  sortOrder: "desc" as SortOrder,
  page: 1,
};

export const useFiltersStore = create<FiltersState>((set) => ({
  ...initialState,
  setSearch: (search) => set({ search, page: 1 }),
  setVerdict: (verdict) => set({ verdict, page: 1 }),
  setSortField: (sortField) => set({ sortField }),
  setSortOrder: (sortOrder) => set({ sortOrder }),
  setPage: (page) => set({ page }),
  reset: () => set(initialState),
}));
