import React from "react";
import { render, screen } from "@testing-library/react";
import ItineraryList from "./ItineraryList";

describe("ItineraryList", () => {
  test("renders section title", () => {
    render(<ItineraryList />);
    expect(
      screen.getByText("Itinerarios más vistos por los viajeros"),
    ).toBeInTheDocument();
  });

  test("renders tag", () => {
    render(<ItineraryList />);
    expect(screen.getByText("#Patrimonio histórico")).toBeInTheDocument();
  });

  test("renders itinerary cards", () => {
    render(<ItineraryList />);
    expect(screen.getAllByText("Ver más")).toHaveLength(5);
    expect(screen.getAllByText("Añadir a viaje")).toHaveLength(5);
  });

  test("renders show more button", () => {
    render(<ItineraryList />);
    expect(screen.getByText("Mostrar más")).toBeInTheDocument();
  });
});
