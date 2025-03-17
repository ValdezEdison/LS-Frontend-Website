import React from "react";
import { render, screen } from "@testing-library/react";
import EventsPage from "./Events";

describe("EventsPage", () => {
  test("renders page title", () => {
    render(<EventsPage />);
    const titleElement = screen.getByText(/Atenas, Grecia/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("renders search section", () => {
    render(<EventsPage />);
    const mapButton = screen.getByText(/Ver mapa/i);
    const dateInput = screen.getByPlaceholderText(
      /Selecciona un rango de fechas/i
    );
    const searchInput = screen.getByPlaceholderText(/Selecciona una búsqueda/i);
    expect(mapButton).toBeInTheDocument();
    expect(dateInput).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
  });

  test("renders popular events section", () => {
    render(<EventsPage />);
    const sectionTitle = screen.getByText(/Eventos más populares en Atenas/i);
    expect(sectionTitle).toBeInTheDocument();
    const showMoreButton = screen.getByText(/Mostrar más/i);
    expect(showMoreButton).toBeInTheDocument();
  });

  test("renders recommended events section", () => {
    render(<EventsPage />);
    const sectionTitle = screen.getByText(/Otras personas tambien han visto/i);
    expect(sectionTitle).toBeInTheDocument();
  });
});
