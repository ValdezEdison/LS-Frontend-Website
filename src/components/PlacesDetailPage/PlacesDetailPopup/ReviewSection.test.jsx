import React from "react";
import { render, screen } from "@testing-library/react";
import ReviewSection from "./ReviewSection";

describe("ReviewSection", () => {
  test("renders rating score", () => {
    render(<ReviewSection />);
    const ratingScore = screen.getByText("4,5");
    expect(ratingScore).toBeInTheDocument();
  });

  test("renders star rating", () => {
    render(<ReviewSection />);
    const starRating = screen.getByRole("img", { hidden: true });
    expect(starRating).toBeInTheDocument();
  });

  test("renders review count", () => {
    render(<ReviewSection />);
    const reviewCount = screen.getByText(/123 reseñas/i);
    expect(reviewCount).toBeInTheDocument();
  });

  test("renders review title", () => {
    render(<ReviewSection />);
    const reviewTitle = screen.getByText(/Comentarios de los viajeros:/i);
    expect(reviewTitle).toBeInTheDocument();
  });

  test("renders review items", () => {
    render(<ReviewSection />);
    const reviewItems = screen.getAllByText(/Mirador muy concurrido!/i);
    expect(reviewItems.length).toBe(6);
  });

  test("renders reviewer information", () => {
    render(<ReviewSection />);
    const reviewerName = screen.getAllByText("Virginia I");
    const reviewerLocation = screen.getAllByText("España");
    expect(reviewerName.length).toBe(6);
    expect(reviewerLocation.length).toBe(6);
  });
});
