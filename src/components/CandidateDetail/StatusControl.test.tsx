import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { toast } from "sonner";

import { StatusControl } from "./StatusControl";
import { api } from "../../services/api";
import { useCandidatesStore } from "../../store/candidatesStore";
import { makeCandidate } from "../../test/fixtures";
import { resetStores, seedCandidates } from "../../test/resetStores";

jest.mock("../../services/api", () => ({
  api: {
    getCandidates: jest.fn(),
    updateStatus: jest.fn(),
  },
}));

jest.mock("sonner", () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

const mockApi = api as jest.Mocked<typeof api>;

const getStatus = (id: string) =>
  useCandidatesStore.getState().candidates.find((c) => c.id === id)?.status;

describe("StatusControl", () => {
  beforeEach(() => {
    resetStores();
    jest.clearAllMocks();
    seedCandidates([makeCandidate({ id: "ivanov", status: "new" })]);
  });

  it("оптимистично обновляет статус и показывает успех", async () => {
    mockApi.updateStatus.mockResolvedValueOnce(
      makeCandidate({ id: "ivanov", status: "invited" }),
    );
    const candidate = makeCandidate({ id: "ivanov", status: "new" });

    render(<StatusControl candidate={candidate} />);
    await userEvent.selectOptions(screen.getByRole("combobox"), "invited");

    await waitFor(() => expect(getStatus("ivanov")).toBe("invited"));
    expect(toast.success).toHaveBeenCalled();
  });

  it("откатывает статус при ошибке API", async () => {
    mockApi.updateStatus.mockRejectedValueOnce(new Error("fail"));
    const candidate = makeCandidate({ id: "ivanov", status: "new" });

    render(<StatusControl candidate={candidate} />);
    await userEvent.selectOptions(screen.getByRole("combobox"), "rejected");

    await waitFor(() => expect(toast.error).toHaveBeenCalled());
    expect(getStatus("ivanov")).toBe("new"); // откат к исходному
  });
});
