import React from "react";
import { render, screen } from "@testing-library/react";
import Places from "./Places";

describe("Places", () => {
  test("renders main components", () => {
    render(<Places />);

    expect(screen.getByText("Atenas, Grecia")).toBeInTheDocument();
    expect(screen.getByText("32 lugares disponibles")).toBeInTheDocument();
    expect(screen.getByText("Ver mapa")).toBeInTheDocument();
    expect(
      screen.getByText("Otras personas tambien han visto")
    ).toBeInTheDocument();
    expect(screen.getByText("Descarga nuestra app")).toBeInTheDocument();
  });

  test("renders correct number of place cards", () => {
    render(<Places />);

    const placeCards = screen.getAllByText("Ver más");
    expect(placeCards).toHaveLength(5);
  });

  test("renders recommended places", () => {
    render(<Places />);

    expect(screen.getByText("Las Artes y las Ciencias")).toBeInTheDocument();
    expect(screen.getByText("Praça do Comércio")).toBeInTheDocument();
    expect(screen.getByText("Gendarmenmarkt")).toBeInTheDocument();
    expect(screen.getByText("Ámsterdam")).toBeInTheDocument();
  });
});
