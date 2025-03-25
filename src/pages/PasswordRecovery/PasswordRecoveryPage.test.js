import React from "react";
import { render, screen } from "@testing-library/react";
import PasswordRecoveryPage from "./PasswordRecoveryPage";

test("renders PasswordRecoveryPage component", () => {
  render(<PasswordRecoveryPage />);

  const headerElement = screen.getByRole("banner");
  expect(headerElement).toBeInTheDocument();

  const mainElement = screen.getByRole("main");
  expect(mainElement).toBeInTheDocument();

  const heroImage = screen.getByAltText("Scenic mountain landscape");
  expect(heroImage).toBeInTheDocument();

  const formTitle = screen.getByText("Recuperar contraseña");
  expect(formTitle).toBeInTheDocument();

  const emailInput = screen.getByLabelText("Correo electrónico");
  expect(emailInput).toBeInTheDocument();

  const submitButton = screen.getByRole("button", { name: "Enviar" });
  expect(submitButton).toBeInTheDocument();
});
