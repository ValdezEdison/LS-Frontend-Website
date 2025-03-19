import React from "react";
import { render, screen } from "@testing-library/react";
import PlaceCard from "./PlaceCard";

describe("PlaceCard", () => {
  const mockPlace = {
    name: "Test Place",
    location: "Test Location",
    category: "Test Category",
    rating: 4.5,
    reviews: 100,
    image: "test-image.jpg",
  };

  test("renders PlaceCard component", () => {
    render(<PlaceCard place={mockPlace} />);

    // Check if place details are rendered correctly
    expect(screen.getByText("Test Place")).toBeInTheDocument();
    expect(screen.getByText("Test Location")).toBeInTheDocument();
    expect(screen.getByText("Test Category")).toBeInTheDocument();
    expect(screen.getByText("4.5")).toBeInTheDocument();
    expect(screen.getByText("100 comentarios")).toBeInTheDocument();

    // Check if buttons are present
    expect(screen.getByText("Ver más")).toBeInTheDocument();
    expect(screen.getByText("Añadir a viaje")).toBeInTheDocument();

    // Check if image is rendered
    const image = screen.getByAltText("Test Place");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "test-image.jpg");
  });
});
