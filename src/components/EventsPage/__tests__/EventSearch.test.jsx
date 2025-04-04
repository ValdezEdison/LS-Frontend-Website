import React from "react";
import { render, screen } from "@testing-library/react";
import EventSearch from "../EventSearch";

describe("EventSearch", () => {
  test("renders search input and buttons", () => {
    render(<EventSearch />);

    expect(
      screen.getByPlaceholderText("Busca por palabras clave"),
    ).toBeInTheDocument();
    expect(screen.getByText("Ver mapa")).toBeInTheDocument();
    expect(screen.getByText("Filtros")).toBeInTheDocument();
  });
});
