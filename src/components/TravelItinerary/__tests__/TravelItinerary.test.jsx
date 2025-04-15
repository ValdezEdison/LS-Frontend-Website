import React from "react";
import { render, screen } from "@testing-library/react";
import TravelItinerary from "../TravelItinerary";

describe("TravelItinerary", () => {
  test("renders the main components", () => {
    render(<TravelItinerary />);

    expect(screen.getByRole("banner")).toBeInTheDocument(); // Header
    expect(screen.getByRole("main")).toBeInTheDocument(); // Main content
    expect(screen.getByRole("contentinfo")).toBeInTheDocument(); // Footer

    expect(screen.getByText(/Nombre del viaje/i)).toBeInTheDocument();
    expect(
      screen.getByText(/París - 5 paradas, 3h y 30 min/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Añade más paradas a tu itinerario/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Lugares similares/i)).toBeInTheDocument();
  });
});
