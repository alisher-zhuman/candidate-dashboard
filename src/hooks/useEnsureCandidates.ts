import { useEffect } from "react";

import { useCandidatesStore } from "../store/candidatesStore";

// Грузит кандидатов один раз — только если стор ещё пуст.
// Не перезапрашивает при возврате на список, чтобы не мигать скелетонами.
export const useEnsureCandidates = () => {
  const candidates = useCandidatesStore((state) => state.candidates);
  const fetchCandidates = useCandidatesStore((state) => state.fetchCandidates);

  useEffect(() => {
    if (candidates.length === 0) {
      fetchCandidates();
    }
  }, [candidates.length, fetchCandidates]);
};
