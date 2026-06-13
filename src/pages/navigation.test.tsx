import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import { CandidatesPage } from "./CandidatesPage";
import { CandidateDetailPage } from "./CandidateDetailPage";
import { makeCandidate } from "../test/fixtures";
import { resetStores, seedCandidates } from "../test/resetStores";

jest.mock("../services/api", () => ({
  api: {
    getCandidates: jest.fn().mockResolvedValue([]),
    updateStatus: jest.fn(),
  },
}));

const renderApp = () =>
  render(
    <MemoryRouter initialEntries={["/candidates"]}>
      <Routes>
        <Route path="/candidates" element={<CandidatesPage />} />
        <Route path="/candidate/:id" element={<CandidateDetailPage />} />
      </Routes>
    </MemoryRouter>,
  );

describe("Навигация список → детальная", () => {
  beforeEach(() => resetStores());

  it("открывает детальную страницу по клику на строку", async () => {
    const user = userEvent.setup();
    seedCandidates([
      makeCandidate({
        id: "ivanov",
        name: "Иванов Иван",
        summary: "Уникальная сводка кандидата",
      }),
    ]);

    renderApp();

    await user.click(screen.getByText("Иванов Иван"));

    expect(
      await screen.findByText("Уникальная сводка кандидата"),
    ).toBeInTheDocument();
  });
});
