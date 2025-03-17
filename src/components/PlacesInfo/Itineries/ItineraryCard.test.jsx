import React from "react";
import { render, screen } from "@testing-library/react";
import ItineraryCard from "./ItineraryCard";

describe("ItineraryCard", () => {
  const mockPlace = {
    name: "Test Place",
    address: "123 Test St, Test City",
    rating: 4.5,
    reviews: 100,
    image: "http://test-image.jpg",
  };

  test("renders place name", () => {
    render(<ItineraryCard place={mockPlace} index={1} />);
    const nameElement = screen.getByText(mockPlace.name);
    expect(nameElement).toBeInTheDocument();
  });

  test("renders place address", () => {
    render(<ItineraryCard place={mockPlace} index={1} />);
    const addressElement = screen.getByText(mockPlace.address);
    expect(addressElement).toBeInTheDocument();
  });

  test("renders rating score", () => {
    render(<ItineraryCard place={mockPlace} index={1} />);
    const ratingElement = screen.getByText(mockPlace.rating.toString());
    expect(ratingElement).toBeInTheDocument();
  });

  test("renders review count", () => {
    render(<ItineraryCard place={mockPlace} index={1} />);
    const reviewsElement = screen.getByText(`${mockPlace.reviews} comentarios`);
    expect(reviewsElement).toBeInTheDocument();
  });
});
