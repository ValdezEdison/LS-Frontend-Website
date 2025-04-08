import React from "react";
import { render, screen } from "@testing-library/react";
import ItineraryCard from "./ItineraryCard";

const mockItinerary = {
  title: "Test Itinerary",
  stops: 3,
  location: "Test City, Test Country",
  image: "test-image.jpg",
};

describe("ItineraryCard", () => {
  test("renders itinerary details", () => {
    render(<ItineraryCard {...mockItinerary} />);
    expect(screen.getByText(mockItinerary.title)).toBeInTheDocument();
    expect(
      screen.getByText(`${mockItinerary.stops} paradas`),
    ).toBeInTheDocument();
    expect(screen.getByText("Itinerario")).toBeInTheDocument();
    expect(screen.getByText(mockItinerary.location)).toBeInTheDocument();
  });

  test("renders action buttons", () => {
    render(<ItineraryCard {...mockItinerary} />);
    expect(screen.getByText("Ver más")).toBeInTheDocument();
    expect(screen.getByText("Añadir a viaje")).toBeInTheDocument();
  });

  test("renders image", () => {
    render(<ItineraryCard {...mockItinerary} />);
    const image = screen.getByAltText(mockItinerary.title);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockItinerary.image);
  });
});
