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

  it("ничего не рендерит без пропов", () => {
    const { container } = render(<StatusBadge />);
    expect(container).toBeEmptyDOMElement();
  });
});
