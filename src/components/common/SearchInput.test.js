import React from "react";
import { render, screen } from "@testing-library/react";
import SearchInput from "./SearchInput";

describe("SearchInput", () => {
  test("renders search input and suggestions", () => {
    render(<SearchInput />);

    const searchInput = screen.getByPlaceholderText("Ciudad, país, eventos...");
    expect(searchInput).toBeInTheDocument();

    const suggestions = screen.getAllByRole("option");
    expect(suggestions).toHaveLength(5);

    expect(screen.getByText("Lisboa, Portugal")).toBeInTheDocument();
    expect(screen.getByText("Liverpool, Reino Unido")).toBeInTheDocument();
    expect(
      screen.getByText("Centro histórico de Lisboa, Portugal")
    ).toBeInTheDocument();
    expect(screen.getByText("Centro de Lisboa, Portugal")).toBeInTheDocument();
    expect(screen.getByText("Liguria, Italia")).toBeInTheDocument();
  });
});
