import React from "react";
import { render, screen } from "@testing-library/react";
import UserMenu from "./UserMenu";

describe("UserMenu", () => {
  test("renders all menu items", () => {
    render(<UserMenu />);

    expect(screen.getByText("Gestionar cuenta")).toBeInTheDocument();
    expect(screen.getByText("Favoritos")).toBeInTheDocument();
    expect(screen.getByText("Cerrar sesión")).toBeInTheDocument();
  });

  test("has correct accessibility attributes", () => {
    render(<UserMenu />);

    const menu = screen.getByRole("navigation");
    expect(menu).toHaveAttribute("aria-label", "User menu");
  });
});
