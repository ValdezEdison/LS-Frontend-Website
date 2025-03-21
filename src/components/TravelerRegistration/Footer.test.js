import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  test("renders terms, policy, and copyright information", () => {
    render(<Footer />);

    expect(screen.getByText(/Términos y condiciones/)).toBeInTheDocument();
    expect(screen.getByText(/Política de privacidad/)).toBeInTheDocument();
    expect(
      screen.getByText(/Copyright \(2024\) - Local Secrets/)
    ).toBeInTheDocument();
  });

  test("renders business signup link", () => {
    render(<Footer />);

    expect(screen.getByText("¿Tienes un negocio?")).toBeInTheDocument();
    expect(
      screen.getByText("Registrarme como Local Secret Manager")
    ).toBeInTheDocument();
  });
});
