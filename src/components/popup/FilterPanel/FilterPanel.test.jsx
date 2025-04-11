import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FilterPanel from "./FilterPanel";

describe("FilterPanel", () => {
  test("renders FilterPanel component", () => {
    render(<FilterPanel />);
    expect(screen.getByText("Todos los filtros")).toBeInTheDocument();
  });

  test("toggles tag selection", () => {
    render(<FilterPanel />);
    const arteCulturaTag = screen.getByText("Arte y cultura");
    fireEvent.click(arteCulturaTag);
    expect(arteCulturaTag).toHaveClass("tagSelected");
    fireEvent.click(arteCulturaTag);
    expect(arteCulturaTag).not.toHaveClass("tagSelected");
  });

  test("renders date range input", () => {
    render(<FilterPanel />);
    expect(
      screen.getByLabelText("Fechas de inicio - fechas de fin del evento"),
    ).toBeInTheDocument();
  });

  test("renders destination input", () => {
    render(<FilterPanel />);
    expect(screen.getByLabelText("Destino")).toBeInTheDocument();
  });

  test("renders apply button", () => {
    render(<FilterPanel />);
    expect(screen.getByText("Aplicar")).toBeInTheDocument();
  });

  test("renders category sections", () => {
    render(<FilterPanel />);
    expect(screen.getByText("Búsqueda")).toBeInTheDocument();
    expect(screen.getByText("Categoría")).toBeInTheDocument();
    expect(screen.getByText("Ordenar por")).toBeInTheDocument();
  });

  test("close button is accessible", () => {
    render(<FilterPanel />);
    const closeButton = screen.getByLabelText("Cerrar panel de filtros");
    expect(closeButton).toBeInTheDocument();
  });
});
