import React from "react";
import { render, screen } from "@testing-library/react";
import ItineraryDetail from "./ItineraryDetail";

describe("ItineraryDetail", () => {
  test("renders itinerary title", () => {
    render(<ItineraryDetail />);
    const titleElement = screen.getByText(/Plaka y Anafiotika/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("renders correct number of itinerary cards", () => {
    render(<ItineraryDetail />);
    const cards = screen.getAllByRole("heading", { level: 3 });
    expect(cards).toHaveLength(4);
  });

  test("renders related content section", () => {
    render(<ItineraryDetail />);
    const relatedContentTitle = screen.getByText(
      /Otras personas también han visto/i
    );
    expect(relatedContentTitle).toBeInTheDocument();
  });
});
