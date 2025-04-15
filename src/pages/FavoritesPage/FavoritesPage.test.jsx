import React from "react";
import { render, screen } from "@testing-library/react";
import FavoritesPage from "./FavoritesPage";

describe("FavoritesPage", () => {
  test("renders page title", () => {
    render(<FavoritesPage />);
    const titleElement = screen.getByText(/Todos los favoritos/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("renders search bar", () => {
    render(<FavoritesPage />);
    const searchInput = screen.getByPlaceholderText(
      /Ciudad, país, eventos.../i,
    );
    expect(searchInput).toBeInTheDocument();
  });

  test("renders favorite items", () => {
    render(<FavoritesPage />);
    const favoriteItems = screen.getAllByRole("heading", { level: 3 });
    expect(favoriteItems.length).toBeGreaterThan(0);
  });

  test("renders show more button", () => {
    render(<FavoritesPage />);
    const showMoreButton = screen.getByText(/Mostrar más/i);
    expect(showMoreButton).toBeInTheDocument();
  });

  test("renders recommended section", () => {
    render(<FavoritesPage />);
    const recommendedTitle = screen.getByText(
      /Otras personas tambien han visto/i,
    );
    expect(recommendedTitle).toBeInTheDocument();
  });
});
