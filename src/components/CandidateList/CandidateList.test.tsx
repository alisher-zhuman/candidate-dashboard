import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { CandidateList } from "./CandidateList";
import { api } from "../../services/api";
import { makeCandidate } from "../../test/fixtures";
import { resetStores, seedCandidates } from "../../test/resetStores";

jest.mock("../../services/api", () => ({
  api: {
    getCandidates: jest.fn().mockResolvedValue([]),
    updateStatus: jest.fn(),
  },
}));

const mockApi = api as jest.Mocked<typeof api>;

const renderList = () =>
  render(
    <MemoryRouter>
      <CandidateList />
    </MemoryRouter>,
  );

describe("CandidateList", () => {
  beforeEach(() => {
    resetStores();
    jest.clearAllMocks();
    mockApi.getCandidates.mockResolvedValue([]);
  });

  it("рендерит строки кандидатов из стора", () => {
    seedCandidates([makeCandidate({ id: "x", name: "Иванов Иван" })]);
    renderList();

    expect(screen.getByText("Иванов Иван")).toBeInTheDocument();
  });

  it("показывает пустое состояние, когда кандидатов нет", async () => {
    mockApi.getCandidates.mockResolvedValue([]);
    renderList();

    expect(await screen.findByText("Кандидаты не найдены")).toBeInTheDocument();
  });

  it("показывает ошибку загрузки", async () => {
    mockApi.getCandidates.mockRejectedValueOnce(new Error("network"));
    renderList();

    expect(
      await screen.findByText("Не удалось загрузить кандидатов"),
    ).toBeInTheDocument();
  });
});
