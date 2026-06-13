import { create } from "zustand";

import type { Candidate, CandidateStatus } from "../types/candidate";
import { api } from "../services/api";

interface CandidatesState {
  candidates: Candidate[];
  isLoading: boolean;
  error: string | null;
  fetchCandidates: () => Promise<void>;
  updateStatus: (id: string, status: CandidateStatus) => Promise<void>;
}

export const useCandidatesStore = create<CandidatesState>((set, get) => ({
  candidates: [],
  isLoading: false,
  error: null,

  fetchCandidates: async () => {
    set({ isLoading: true, error: null });

    try {
      const candidates = await api.getCandidates();
      set({ candidates, isLoading: false });
    } catch {
      set({ error: "Не удалось загрузить кандидатов", isLoading: false });
    }
  },

  updateStatus: async (id, status) => {
    const previous = get().candidates;
    // Оптимистичное обновление
    set({
      candidates: previous.map((c) => (c.id === id ? { ...c, status } : c)),
    });

    try {
      await api.updateStatus(id, status);
    } catch {
      // Rollback при ошибке
      set({ candidates: previous });
      throw new Error("Ошибка обновления статуса");
    }
  },
}));
