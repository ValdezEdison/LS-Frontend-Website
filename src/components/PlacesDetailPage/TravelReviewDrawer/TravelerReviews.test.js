import React from "react";
import { render, screen } from "@testing-library/react";
import TravelerReviews from "./TravelerReviews";

describe("TravelerReviews", () => {
  test("renders the component with correct title", () => {
    render(<TravelerReviews />);
    const titleElement = screen.getByText(/Comentarios de los viajeros/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("displays the correct rating score", () => {
    render(<TravelerReviews />);
    const ratingScore = screen.getByText("4,5");
    expect(ratingScore).toBeInTheDocument();
  });

  test("shows the correct number of reviews", () => {
    render(<TravelerReviews />);
    const reviewCount = screen.getByText("123 reseñas");
    expect(reviewCount).toBeInTheDocument();
  });

  test("renders filter dropdowns", () => {
    render(<TravelerReviews />);
    const puntuacionesDropdown = screen.getByText("Puntuaciones");
    const idiomasDropdown = screen.getByText("Idiomas");
    const ordenarDropdown = screen.getByText("Ordenar por");
    expect(puntuacionesDropdown).toBeInTheDocument();
    expect(idiomasDropdown).toBeInTheDocument();
    expect(ordenarDropdown).toBeInTheDocument();
  });
});
