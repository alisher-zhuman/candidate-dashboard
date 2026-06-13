import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { FilterPanel } from "./FilterPanel";
import { useFiltersStore } from "../../store/filtersStore";
import { resetStores } from "../../test/resetStores";

describe("FilterPanel", () => {
  beforeEach(() => resetStores());

  it("меняет вердикт по клику и подсвечивает активную кнопку", async () => {
    const user = userEvent.setup();
    render(<FilterPanel />);

    const btn = screen.getByRole("button", { name: "ПОДХОДИТ" });
    await user.click(btn);

    expect(useFiltersStore.getState().verdict).toBe("ПОДХОДИТ");
    expect(btn).toHaveClass("bg-emerald-600", "text-white");
  });

  it("переключает порядок сортировки", async () => {
    const user = userEvent.setup();
    render(<FilterPanel />);

    expect(screen.getByText("По убыванию")).toBeInTheDocument();
    await user.click(screen.getByText("По убыванию"));

    expect(useFiltersStore.getState().sortOrder).toBe("asc");
    expect(screen.getByText("По возрастанию")).toBeInTheDocument();
  });

  it("меняет поле сортировки через select", async () => {
    const user = userEvent.setup();
    render(<FilterPanel />);

    await user.selectOptions(screen.getByLabelText("Поле сортировки"), "name");

    expect(useFiltersStore.getState().sortField).toBe("name");
  });
});
