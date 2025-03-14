import React from "react";
import { render, screen } from "@testing-library/react";
import DestinationInfo from "./DestinationInfo";

describe("DestinationInfo", () => {
  test("renders destination title and navigation", () => {
    render(<DestinationInfo />);

    expect(
      screen.getByRole("heading", { name: /Atenas, Grecia/i })
    ).toBeInTheDocument();
    expect(screen.getByText("Destino")).toBeInTheDocument();
    expect(screen.getByText("Eventos")).toBeInTheDocument();
    expect(screen.getByText("Lugares")).toBeInTheDocument();
    expect(screen.getByText("Itinerarios")).toBeInTheDocument();
  });

  test("renders panoramic image and gallery", () => {
    render(<DestinationInfo />);

    expect(screen.getByAltText("Panoramic view of Athens")).toBeInTheDocument();
    expect(
      screen.getByAltText("Gallery of Athens attractions")
    ).toBeInTheDocument();
    expect(screen.getByText("Ver más")).toBeInTheDocument();
  });

  test('renders "Why Athens?" section', () => {
    render(<DestinationInfo />);

    expect(screen.getByText("¿Por qué Atenas?")).toBeInTheDocument();
    expect(screen.getByText("Ir a la web")).toBeInTheDocument();
    expect(
      screen.getByText(/El Museo Histórico Nacional de la ciudad de Atenas/)
    ).toBeInTheDocument();
  });
});
