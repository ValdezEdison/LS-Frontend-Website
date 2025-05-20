import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import FaqSection from "./FaqSection";

describe("FaqSection Component", () => {
  test("renders FAQ section with correct title", () => {
    render(<FaqSection />);

    expect(screen.getByText("Resolvemos tus dudas")).toBeInTheDocument();
  });

  test("displays all FAQ questions", () => {
    render(<FaqSection />);

    expect(
      screen.getByText("¿Que beneficios ofrece Local Secrets a empleados?"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("¿Hay posiciones disponibles en remoto?"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("¿Ofrecéis programas de prácticas?"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("¿Hay oportunidad de crecimiento en la empresa?"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("¿Cuál es la ubicación de las oficinas?"),
    ).toBeInTheDocument();
  });

  test("toggles FAQ answer when question is clicked", () => {
    render(<FaqSection />);

    // Initially, no answers should be visible
    expect(
      screen.queryByText(/Local Secrets ofrece diversos beneficios/),
    ).not.toBeInTheDocument();

    // Click on the first question's button
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]);

    // Now the answer should be visible
    expect(
      screen.getByText(/Local Secrets ofrece diversos beneficios/),
    ).toBeInTheDocument();

    // Click again to hide
    fireEvent.click(buttons[0]);

    // Answer should be hidden again
    expect(
      screen.queryByText(/Local Secrets ofrece diversos beneficios/),
    ).not.toBeInTheDocument();
  });
});
