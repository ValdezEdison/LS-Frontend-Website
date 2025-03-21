import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header", () => {
  test("renders logo and help icon", () => {
    render(<Header />);

    const logo = screen.getByRole("img", { name: /App Local secrets logo/ });
    expect(logo).toBeInTheDocument();

    const helpIcon = screen.getByRole("img", { name: /help icon/ });
    expect(helpIcon).toBeInTheDocument();
  });
});
