import { render, screen } from "@testing-library/react";

import { StatusBadge } from "./StatusBadge";

describe("StatusBadge", () => {
  it("показывает лейбл статуса", () => {
    render(<StatusBadge status="invited" />);
    expect(screen.getByText("Приглашён")).toBeInTheDocument();
  });

  it("применяет цвет по vc-классу вердикта", () => {
    render(<StatusBadge verdict="verdict-green" verdictLabel="ПОДХОДИТ" />);
    const badge = screen.getByText("ПОДХОДИТ");
    expect(badge).toHaveClass("bg-emerald-50", "text-emerald-700");
  });

  it("применяет цвет по статусу", () => {
    render(<StatusBadge status="rejected" />);
    const badge = screen.getByText("Отклонён");
    expect(badge).toHaveClass("bg-red-50", "text-red-600");
  });

  it("ничего не рендерит без пропов", () => {
    const { container } = render(<StatusBadge />);
    expect(container).toBeEmptyDOMElement();
  });
});
