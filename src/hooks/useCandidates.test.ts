import { renderHook, act } from "@testing-library/react";

import { useCandidates } from "./useCandidates";
import { useFiltersStore } from "../store/filtersStore";
import { makeCandidate, makeCandidates } from "../test/fixtures";
import { resetStores, seedCandidates } from "../test/resetStores";

const setFilter = (fn: () => void) => act(fn);

describe("useCandidates", () => {
  beforeEach(() => resetStores());

  it("фильтрует по вердикту", () => {
    seedCandidates([
      makeCandidate({ id: "a", verdict: "ПОДХОДИТ" }),
      makeCandidate({ id: "b", verdict: "НЕ СООТВЕТСТВУЕТ" }),
    ]);
    setFilter(() => useFiltersStore.getState().setVerdict("ПОДХОДИТ"));

    const { result } = renderHook(() => useCandidates());

    expect(result.current.totalCandidates).toBe(1);
    expect(result.current.candidates[0].id).toBe("a");
  });

  it("ищет по ФИО с учётом debounce", () => {
    jest.useFakeTimers();
    seedCandidates([
      makeCandidate({ id: "a", name: "Иванов Иван" }),
      makeCandidate({ id: "b", name: "Петров Пётр" }),
    ]);

    const { result } = renderHook(() => useCandidates());

    setFilter(() => useFiltersStore.getState().setSearch("Петр"));
    expect(result.current.totalCandidates).toBe(2); // до debounce фильтр не применён

    act(() => jest.advanceTimersByTime(300));
    expect(result.current.totalCandidates).toBe(1);
    expect(result.current.candidates[0].id).toBe("b");

    jest.useRealTimers();
  });

  it("сортирует по имени по возрастанию и убыванию", () => {
    seedCandidates([
      makeCandidate({ id: "b", name: "Бориса" }),
      makeCandidate({ id: "a", name: "Анна" }),
    ]);
    setFilter(() => useFiltersStore.getState().setSortField("name"));

    setFilter(() => useFiltersStore.getState().setSortOrder("asc"));
    const { result } = renderHook(() => useCandidates());
    expect(result.current.candidates.map((c) => c.id)).toEqual(["a", "b"]);

    setFilter(() => useFiltersStore.getState().setSortOrder("desc"));
    expect(result.current.candidates.map((c) => c.id)).toEqual(["b", "a"]);
  });

  it("разбивает на страницы по 10", () => {
    seedCandidates(makeCandidates(15));

    const { result } = renderHook(() => useCandidates());
    expect(result.current.totalPages).toBe(2);
    expect(result.current.candidates).toHaveLength(10);

    setFilter(() => useFiltersStore.getState().setPage(2));
    expect(result.current.candidates).toHaveLength(5);
  });

  it("возвращает на последнюю страницу при выходе номера за пределы", () => {
    seedCandidates(makeCandidates(15));
    setFilter(() => useFiltersStore.getState().setPage(99));

    const { result } = renderHook(() => useCandidates());

    expect(result.current.candidates).toHaveLength(5); // срез не пустой
    expect(useFiltersStore.getState().page).toBe(2); // стор скорректирован
  });
});
