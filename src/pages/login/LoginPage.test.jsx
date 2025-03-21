import React from "react";
import { render, screen } from "@testing-library/react";
import LoginPage from "./LoginPage";

describe("LoginPage", () => {
  test("renders login page components", () => {
    render(<LoginPage />);

    expect(screen.getByAltText("Company logo")).toBeInTheDocument();
    expect(
      screen.getByText("Inicia sesión o crea una cuenta")
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Correo electrónico")).toBeInTheDocument();
    expect(screen.getByLabelText("Contraseña")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Iniciar sesión" })
    ).toBeInTheDocument();
    expect(
      screen.getByText("o usar una de estas opciones")
    ).toBeInTheDocument();
    expect(screen.getByAltText("Login with Google")).toBeInTheDocument();
    expect(screen.getByAltText("Login with Facebook")).toBeInTheDocument();
    expect(
      screen.getByText(/Al iniciar sesión o al crear una cuenta/)
    ).toBeInTheDocument();
  });
});
