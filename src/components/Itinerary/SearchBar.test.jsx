import React from "react";
import { render, screen } from "@testing-library/react";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  test("renders title", () => {
    render(<SearchBar />);
    expect(
      screen.getByText("1.240 itinerarios disponibles"),
    ).toBeInTheDocument();
  });

  test("renders search input", () => {
    render(<SearchBar />);
    expect(screen.getByPlaceholderText("Busca un destino")).toBeInTheDocument();
  });

  test("renders login banner", () => {
    render(<SearchBar />);
    expect(
      screen.getByText(
        "Inicia sesión y empieza a organizar tu próxima aventura",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("Iniciar sesión")).toBeInTheDocument();
  });
});
