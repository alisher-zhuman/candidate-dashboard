import type { Candidate, CandidateStatus } from "../types/candidate";
import { mockCandidates } from "./mockData";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  getCandidates: async (): Promise<Candidate[]> => {
    await delay(500);
    return mockCandidates;
  },

  updateStatus: async (
    id: string,
    status: CandidateStatus,
  ): Promise<Candidate> => {
    await delay(800);
    // Имитация ошибки сервера в 10% случаев
    if (Math.random() < 0.1) {
      throw new Error("Ошибка сервера. Попробуйте снова.");
    }

    const candidate = mockCandidates.find((c) => c.id === id);

    if (!candidate) {
      throw new Error("Кандидат не найден");
    }

    return { ...candidate, status };
  },
};
