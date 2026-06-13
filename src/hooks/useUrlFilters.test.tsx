import { render, screen, act } from "@testing-library/react";
import { MemoryRouter, useSearchParams } from "react-router-dom";

import { useUrlFilters } from "./useUrlFilters";
import { useFiltersStore } from "../store/filtersStore";
import { resetStores } from "../test/resetStores";

// Зонд: запускает синхронизацию и показывает текущий query-параметр verdict
const Probe = () => {
  useUrlFilters();
  const [params] = useSearchParams();
  return <div data-testid="verdict">{params.get("verdict") ?? ""}</div>;
};

const renderProbe = (entry = "/") =>
  render(
    <MemoryRouter initialEntries={[entry]}>
      <Probe />
    </MemoryRouter>,
  );

describe("useUrlFilters", () => {
  beforeEach(() => resetStores());

  it("инициализирует фильтры из query-параметров при маунте", () => {
    renderProbe("/candidates?verdict=ПОДХОДИТ&sortField=name");

    expect(useFiltersStore.getState().verdict).toBe("ПОДХОДИТ");
    expect(useFiltersStore.getState().sortField).toBe("name");
  });

  it("пишет изменения фильтра в URL", () => {
    renderProbe("/");

    act(() => useFiltersStore.getState().setVerdict("ЧАСТИЧНО"));

    expect(screen.getByTestId("verdict")).toHaveTextContent("ЧАСТИЧНО");
  });

  it("не пишет в URL значения по умолчанию", () => {
    renderProbe("/");

    act(() => useFiltersStore.getState().setVerdict("Все"));

    expect(screen.getByTestId("verdict")).toHaveTextContent("");
  });
});
