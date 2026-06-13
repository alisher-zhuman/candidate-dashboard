import type { Candidate } from "../types/candidate";

// Фабрика кандидата для тестов — переопределяем только нужные поля
export const makeCandidate = (overrides: Partial<Candidate> = {}): Candidate => ({
  id: "ivanov",
  name: "Иванов Иван",
  position: "react-middle",
  pos_label: "React разработчик",
  file: "ivanov.pdf",
  email: "ivanov@email.com",
  phone: "+7 999 000-00-00",
  city: "Бишкек",
  tg: "@ivanov",
  exp: [["2022 — н.в.", "TechCorp", "Frontend", "2 г."]],
  total_exp: "~3 г.",
  stack: "React, TypeScript",
  edu: "КНУ, 2020",
  verdict: "ПОДХОДИТ",
  vc: "verdict-green",
  criteria: [["ok", "React — есть"]],
  summary: "Краткая сводка",
  questions: ["Вопрос для собеседования?"],
  status: "new",
  createdAt: "2024-01-01T00:00:00.000Z",
  ...overrides,
});

// Несколько кандидатов с разными id/createdAt для пагинации/сортировки
export const makeCandidates = (count: number): Candidate[] =>
  Array.from({ length: count }, (_, i) =>
    makeCandidate({
      id: `cand-${i}`,
      name: `Кандидат ${i}`,
      createdAt: `2024-01-${String(i + 1).padStart(2, "0")}T00:00:00.000Z`,
    }),
  );
