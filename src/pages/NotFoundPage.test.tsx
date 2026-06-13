import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import { NotFoundPage } from "./NotFoundPage";

describe("NotFoundPage", () => {
  it("показывает 404 и ведёт на главную по кнопке", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/nope"]}>
        <Routes>
          <Route path="/candidates" element={<div>Список кандидатов</div>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("Страница не найдена")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "На главную" }));

    expect(screen.getByText("Список кандидатов")).toBeInTheDocument();
  });
});
