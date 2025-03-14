import React from "react";
import { render, screen } from "@testing-library/react";
import NearbyPlaces from "./NearbyPlaces";

describe("NearbyPlaces", () => {
  test("renders section title", () => {
    render(<NearbyPlaces />);

    expect(screen.getByText("Otros lugares cercanos")).toBeInTheDocument();
  });

  test("renders all nearby places", () => {
    render(<NearbyPlaces />);

    expect(screen.getByText("Las Artes y las Ciencias")).toBeInTheDocument();
    expect(screen.getByText("Praça do Comércio")).toBeInTheDocument();
    expect(screen.getByText("Gendarmenmarkt")).toBeInTheDocument();
    expect(screen.getByText("Ámsterdam")).toBeInTheDocument();
  });

  test("renders images for all places", () => {
    render(<NearbyPlaces />);

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(4);
  });
});
