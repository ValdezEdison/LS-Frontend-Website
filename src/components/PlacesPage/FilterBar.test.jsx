import React from "react";
import { render, screen } from "@testing-library/react";
import FilterBar from "./FilterBar";

describe("DestinationFilter", () => {
  test("renders destination filter component", () => {
    render(<FilterBar />);

    expect(screen.getByText("Destino")).toBeInTheDocument();
    expect(screen.getByText("Selecciona un destino")).toBeInTheDocument();
    expect(screen.getByText("Li")).toBeInTheDocument();
    expect(screen.getByText("Lisboa")).toBeInTheDocument();
    expect(screen.getByText("Lagos")).toBeInTheDocument();
    expect(screen.getByText("Leiria")).toBeInTheDocument();
  });

  test("renders correct number of checkbox items", () => {
    render(<FilterBar />);

    const checkboxItems = screen.getAllByRole("checkbox");
    expect(checkboxItems).toHaveLength(3);
  });
});
