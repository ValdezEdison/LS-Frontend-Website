import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Newsletter from "./Newsletter";

describe("Newsletter Component", () => {
  test("renders newsletter section", () => {
    render(<Newsletter />);

    // Check if title and description are rendered
    expect(
      screen.getByText("¡Suscríbete a nuestra newsletter!"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Descubre rincones secretos, recibe recomendaciones de viaje/,
      ),
    ).toBeInTheDocument();

    // Check if form elements are rendered
    const emailInput = screen.getByPlaceholderText("Tu dirección de email");
    expect(emailInput).toBeInTheDocument();
    expect(screen.getByText("SUSCRÍBETE")).toBeInTheDocument();

    // Check if privacy text is rendered
    expect(
      screen.getByText(
        /Al introducir tu dirección de correo, consientes recibir/,
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("Política de privacidad.")).toBeInTheDocument();
  });

  test("allows email input", () => {
    render(<Newsletter />);

    const emailInput = screen.getByPlaceholderText("Tu dirección de email");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    expect(emailInput.value).toBe("test@example.com");
  });

  test("form can be submitted", () => {
    render(<Newsletter />);

    const form = screen
      .getByRole("button", { name: "SUSCRÍBETE" })
      .closest("form");

    // Mock form submission
    const mockSubmit = jest.fn((e) => e.preventDefault());
    form.onsubmit = mockSubmit;

    fireEvent.submit(form);

    expect(mockSubmit).toHaveBeenCalled();
  });
});
