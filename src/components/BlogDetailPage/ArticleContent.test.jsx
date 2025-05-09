import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ArticleContent from "./ArticleContent";

describe("ArticleContent Component", () => {
  test("renders article title", () => {
    render(<ArticleContent />);

    expect(
      screen.getByText("5 curiosidades que no sabías sobre Ámsterdam"),
    ).toBeInTheDocument();
  });

  test("renders author information", () => {
    render(<ArticleContent />);

    expect(screen.getByText("Pablo Pérez")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Publicado en Localsecrets.com · 3 minutos · 4 Junio, 2024",
      ),
    ).toBeInTheDocument();
  });

  test("renders article content with curiosities", () => {
    render(<ArticleContent />);

    // Check for the presence of each curiosity
    expect(screen.getByText(/Las casas torcidas:/i)).toBeInTheDocument();
    expect(screen.getByText(/Los puentes de Ámsterdam:/i)).toBeInTheDocument();
    expect(screen.getByText(/El origen del nombre:/i)).toBeInTheDocument();
    expect(
      screen.getByText(/La casa más estrecha de Ámsterdam:/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Los tres cruces de San Andrés:/i),
    ).toBeInTheDocument();
  });

  test("renders tag links", () => {
    render(<ArticleContent />);

    expect(screen.getByText("Curiosidades")).toBeInTheDocument();
    expect(screen.getByText("Destino")).toBeInTheDocument();
  });
});
