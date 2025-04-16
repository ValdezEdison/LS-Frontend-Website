import React from "react";
import { render, screen } from "@testing-library/react";
import MyTrips from "../MyTrips";

describe("MyTrips Component", () => {
  test("renders page title", () => {
    render(<MyTrips />);

    expect(screen.getByText("Mis viajes")).toBeInTheDocument();
  });

  test("renders add trip button", () => {
    render(<MyTrips />);

    expect(screen.getByText("Añadir viaje")).toBeInTheDocument();
  });

  test("renders future and past trip sections", () => {
    render(<MyTrips />);

    expect(screen.getByText("Viajes futuros")).toBeInTheDocument();
    expect(screen.getByText("Viajes pasados")).toBeInTheDocument();
  });

  test("renders correct number of trip cards", () => {
    render(<MyTrips />);

    const futureTrips = screen.getAllByText("Viaje cumple mamá");
    expect(futureTrips).toHaveLength(1);

    const pastTrips = screen.getAllByText(
      /Escapada finde|Puente diciembre|Viaje a Grecia/,
    );
    expect(pastTrips).toHaveLength(3);
  });
});
