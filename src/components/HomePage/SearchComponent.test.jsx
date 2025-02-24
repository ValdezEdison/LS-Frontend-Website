import React from "react";
import { render, screen } from "@testing-library/react";
import SearchComponent from "./SearchComponent";

describe("SearchComponent", () => {
  test("renders search input", () => {
    render(<SearchComponent />);
    const inputElement = screen.getByPlaceholderText(
      "Ciudad, país, eventos..."
    );
    expect(inputElement).toBeInTheDocument();
  });

  test("renders region search title", () => {
    render(<SearchComponent />);
    const titleElement = screen.getByText("Búsqueda por región");
    expect(titleElement).toBeInTheDocument();
  });

  test("renders all region options", () => {
    render(<SearchComponent />);
    const regionNames = [
      "Búsqueda flexible",
      "América",
      "Asia",
      "África",
      "Europa",
      "Oceanía",
    ];
    regionNames.forEach((name) => {
      const regionElement = screen.getByText(name);
      expect(regionElement).toBeInTheDocument();
    });
  });
});
