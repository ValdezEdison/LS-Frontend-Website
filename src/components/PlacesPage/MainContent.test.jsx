import React from "react";
import { render, screen } from "@testing-library/react";
import MainContent from "./MainContent";

describe("MainContent", () => {
  test("renders MainContent component", () => {
    render(<MainContent />);

    // Check if title is present
    expect(screen.getByText("3.500 lugares disponibles")).toBeInTheDocument();

    // Check if search input is present
    expect(screen.getByPlaceholderText("Busca tu destino")).toBeInTheDocument();

    // Check if filters are present
    expect(screen.getByText("Selecciona un país")).toBeInTheDocument();
    expect(screen.getByText("Selecciona un destino")).toBeInTheDocument();
    expect(screen.getByText("Selecciona un orden")).toBeInTheDocument();

    // Check if login banner is present
    expect(
      screen.getByText(
        "Inicia sesión y empieza a organizar tu próxima aventura"
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Iniciar sesión")).toBeInTheDocument();

    // Check if place cards are rendered
    expect(screen.getByText("Las artes y las ciencias")).toBeInTheDocument();
    expect(screen.getByText("Praça do Comércio")).toBeInTheDocument();

    // Check if "Show more" button is present
    expect(screen.getByText("Mostrar más")).toBeInTheDocument();

    // Check if recommended places section is present
    expect(
      screen.getByText("Otras personas tambien han visto")
    ).toBeInTheDocument();
    expect(screen.getByText("Washington monument")).toBeInTheDocument();

    // Check if promotional banner is present
    expect(screen.getByText("Descubre Japón")).toBeInTheDocument();
    expect(screen.getByText("Explorar")).toBeInTheDocument();
  });
});
