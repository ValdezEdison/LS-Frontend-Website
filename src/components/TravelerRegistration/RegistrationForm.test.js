import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RegistrationForm from "./RegistrationForm";

describe("RegistrationForm", () => {
  test("renders all form fields", () => {
    render(
      <RegistrationForm
        showPassword={false}
        togglePasswordVisibility={() => {}}
      />
    );

    expect(screen.getByLabelText("Nombre de usuario")).toBeInTheDocument();
    expect(screen.getByLabelText("Correo electrónico")).toBeInTheDocument();
    expect(screen.getByLabelText("Teléfono")).toBeInTheDocument();
    expect(screen.getByLabelText("Contraseña")).toBeInTheDocument();
  });

  test("toggles password visibility", () => {
    const toggleMock = jest.fn();
    render(
      <RegistrationForm
        showPassword={false}
        togglePasswordVisibility={toggleMock}
      />
    );

    const toggleButton = screen.getByLabelText("Show password");
    fireEvent.click(toggleButton);

    expect(toggleMock).toHaveBeenCalled();
  });

  test("submits form with valid data", () => {
    const handleSubmit = jest.fn((e) => e.preventDefault());
    render(
      <RegistrationForm
        showPassword={false}
        togglePasswordVisibility={() => {}}
      />
    );

    const form = screen.getByRole("form");
    form.onsubmit = handleSubmit;

    fireEvent.change(screen.getByLabelText("Nombre de usuario"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("Correo electrónico"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Teléfono"), {
      target: { value: "123456789" },
    });
    fireEvent.change(screen.getByLabelText("Contraseña"), {
      target: { value: "Password123!" },
    });
    fireEvent.click(screen.getByLabelText(/Acepta los/));

    fireEvent.submit(form);

    expect(handleSubmit).toHaveBeenCalled();
  });
});
