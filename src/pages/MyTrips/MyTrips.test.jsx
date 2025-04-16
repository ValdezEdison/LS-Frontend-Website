import React from "react";
import { render, screen } from "@testing-library/react";
import MyTrips from "./MyTrips";

describe("MyTrips", () => {
  test("renders MyTrips component", () => {
    render(<MyTrips />);

    expect(screen.getByText("Mis viajes")).toBeInTheDocument();
    expect(screen.getByText("Viajes futuros")).toBeInTheDocument();
    expect(screen.getByText("Viajes pasados")).toBeInTheDocument();
  });

  test("renders correct number of trip cards", () => {
    render(<MyTrips />);

    const tripCards = screen.getAllByRole("heading", { level: 3 });
    expect(tripCards).toHaveLength(4); // 1 future trip + 3 past trips
  });

  test("renders add trip button", () => {
    render(<MyTrips />);

    const addTripButton = screen.getByText("Añadir viaje");
    expect(addTripButton).toBeInTheDocument();
  });
});
