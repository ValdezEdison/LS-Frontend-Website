import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../Footer";

describe("Footer", () => {
  test("renders footer sections", () => {
    render(<Footer />);

    expect(screen.getByText("Conócenos")).toBeInTheDocument();
    expect(screen.getByText("Colaboradores")).toBeInTheDocument();
    expect(screen.getByText("Recursos")).toBeInTheDocument();
    expect(screen.getByText("Descarga nuestra app")).toBeInTheDocument();
  });

  test("renders copyright information", () => {
    render(<Footer />);

    expect(
      screen.getByText(/Copyright Local Secrets 2024/),
    ).toBeInTheDocument();
  });
});
