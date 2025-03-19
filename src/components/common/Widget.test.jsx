import React from "react";
import { render, screen } from "@testing-library/react";
import Widget from "./Widget";

describe("Widget", () => {
  test("renders section title", () => {
    render(<Widget />);

    expect(screen.getByText("Otros lugares cercanos")).toBeInTheDocument();
  });

  test("renders all nearby places", () => {
    render(<Widget />);

    expect(screen.getByText("Las Artes y las Ciencias")).toBeInTheDocument();
    expect(screen.getByText("Praça do Comércio")).toBeInTheDocument();
    expect(screen.getByText("Gendarmenmarkt")).toBeInTheDocument();
    expect(screen.getByText("Ámsterdam")).toBeInTheDocument();
  });

  test("renders images for all places", () => {
    render(<Widget />);

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(4);
  });
});
