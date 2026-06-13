import { useCandidatesStore } from "../store/candidatesStore";
import { useFiltersStore } from "../store/filtersStore";
import type { Candidate } from "../types/candidate";

// Сбрасывает оба стора к исходному состоянию между тестами
export const resetStores = () => {
  useFiltersStore.getState().reset();
  useCandidatesStore.setState({
    candidates: [],
    isLoading: false,
    error: null,
  });
};

// Заполняет стор кандидатов готовыми данными (фетч пропускается)
export const seedCandidates = (candidates: Candidate[]) => {
  useCandidatesStore.setState({
    candidates,
    isLoading: false,
    error: null,
  });
};
