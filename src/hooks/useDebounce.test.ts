import { renderHook, act } from "@testing-library/react";

import { useDebounce } from "./useDebounce";

describe("useDebounce", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it("возвращает значение только после задержки", () => {
    const { result, rerender } = renderHook(({ v }) => useDebounce(v, 300), {
      initialProps: { v: "a" },
    });

    expect(result.current).toBe("a");

    rerender({ v: "ab" });
    expect(result.current).toBe("a"); // ещё старое до истечения задержки

    act(() => jest.advanceTimersByTime(300));
    expect(result.current).toBe("ab");
  });

  it("сбрасывает таймер при частых изменениях", () => {
    const { result, rerender } = renderHook(({ v }) => useDebounce(v, 300), {
      initialProps: { v: "a" },
    });

    rerender({ v: "ab" });
    act(() => jest.advanceTimersByTime(200));
    rerender({ v: "abc" });
    act(() => jest.advanceTimersByTime(200));

    expect(result.current).toBe("a"); // прошло 400мс, но таймер сбрасывался

    act(() => jest.advanceTimersByTime(100));
    expect(result.current).toBe("abc");
  });
});
