import React from "react";
import { render, screen } from "@testing-library/react";
import Sidebar from "./Sidebar";

describe("Sidebar", () => {
  test("renders Sidebar component", () => {
    render(<Sidebar />);

    // Check if map is present
    expect(screen.getByAltText("Map")).toBeInTheDocument();
    expect(screen.getByText("Ver mapa")).toBeInTheDocument();

    // Check if filters are present
    expect(screen.getByText("Filtrar por:")).toBeInTheDocument();
    expect(screen.getByText("Alojamiento - Hotelería")).toBeInTheDocument();
    expect(screen.getByText("Puntuación")).toBeInTheDocument();
    expect(screen.getByText("Excelente: 4 o más")).toBeInTheDocument();
  });
});
