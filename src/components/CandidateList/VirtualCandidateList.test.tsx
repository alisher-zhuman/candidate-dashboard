import { render, screen } from "@testing-library/react";

import { VirtualCandidateList } from "./VirtualCandidateList";
import { api } from "../../services/api";
import { makeCandidates } from "../../test/fixtures";

jest.mock("../../services/api", () => ({
  api: { getLargeCandidates: jest.fn() },
}));

const mockApi = api as jest.Mocked<typeof api>;

describe("VirtualCandidateList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockApi.getLargeCandidates.mockResolvedValue(makeCandidates(120));
  });

  it("показывает спиннер во время загрузки", async () => {
    render(<VirtualCandidateList />);
    expect(screen.getByText("Загрузка...")).toBeInTheDocument();
    // дождаться загрузки, чтобы setState прошёл внутри act (без warning)
    await screen.findByText("120");
  });

  it("загружает данные и показывает общее количество", async () => {
    render(<VirtualCandidateList />);
    expect(await screen.findByText("120")).toBeInTheDocument();
  });

  it("виртуализирует: рендерит только видимые строки, а не все 120", async () => {
    render(<VirtualCandidateList />);

    // первый кандидат виден...
    expect(await screen.findByText("Кандидат 0")).toBeInTheDocument();
    // ...а последний — нет (вне области видимости, react-window его не рендерит)
    expect(screen.queryByText("Кандидат 119")).not.toBeInTheDocument();
  });
});
