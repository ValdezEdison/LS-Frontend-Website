import React from "react";
import { render, screen } from "@testing-library/react";
import ExplorerPage from "./ExplorerPage";

describe("ExplorerPage", () => {
  test("renders main title", () => {
    render(<ExplorerPage />);
    const titleElement = screen.getByText(/1.235 opciones a explorar/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("renders search bar", () => {
    render(<ExplorerPage />);
    const searchInput = screen.getByPlaceholderText(
      /Ciudad, país, eventos.../i,
    );
    expect(searchInput).toBeInTheDocument();
  });

  test("renders continent navigation", () => {
    render(<ExplorerPage />);
    const europeButton = screen.getByText(/Europa/i);
    expect(europeButton).toBeInTheDocument();
  });

  test("renders destination grid", () => {
    render(<ExplorerPage />);
    const destinationCards = screen.getAllByText(/resultados/i);
    expect(destinationCards.length).toBeGreaterThan(0);
  });

  test("renders blog section", () => {
    render(<ExplorerPage />);
    const blogTitle = screen.getByText(/Inspiración para tus próximos viajes/i);
    expect(blogTitle).toBeInTheDocument();
  });

  test("renders footer", () => {
    render(<ExplorerPage />);
    const footerElement = screen.getByText(/Copyright Local Secrets 2024/i);
    expect(footerElement).toBeInTheDocument();
  });
});
