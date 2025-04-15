import React from "react";
import { render, screen } from "@testing-library/react";
import TripDetails from "./TripDetails";

describe("TripDetails", () => {
  test("renders trip title", () => {
    render(<TripDetails />);
    const titleElement = screen.getByText(/Viaje cumple mamá/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("renders trip dates", () => {
    render(<TripDetails />);
    const datesElement = screen.getByText(
      /Desde 24 Ene de 2025 hasta el 30 Ene de 2025/i,
    );
    expect(datesElement).toBeInTheDocument();
  });

  test("renders map view", () => {
    render(<TripDetails />);
    const mapElement = screen.getByRole("img", { name: /map/i });
    expect(mapElement).toBeInTheDocument();
  });

  test("renders stop list", () => {
    render(<TripDetails />);
    const stopListElement = screen.getByText(/París - 5 paradas, 3h y 30 min/i);
    expect(stopListElement).toBeInTheDocument();
  });

  test("renders similar places section", () => {
    render(<TripDetails />);
    const similarPlacesElement = screen.getByText(/Lugares similares/i);
    expect(similarPlacesElement).toBeInTheDocument();
  });
});
