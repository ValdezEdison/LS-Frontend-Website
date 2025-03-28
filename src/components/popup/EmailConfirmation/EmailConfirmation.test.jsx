import React from "react";
import { render, screen } from "@testing-library/react";
import EmailConfirmation from "./EmailConfirmation";

describe("EmailConfirmation", () => {
  test("renders email confirmation title", () => {
    render(<EmailConfirmation />);
    const titleElement = screen.getByText(/Confirmación del email/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("renders email confirmation description", () => {
    render(<EmailConfirmation />);
    const descriptionElement = screen.getByText(
      /Hemos enviado un email a nombre@ejemplo.com/i
    );
    expect(descriptionElement).toBeInTheDocument();
  });

  test("renders resend confirmation link", () => {
    render(<EmailConfirmation />);
    const resendLink = screen.getByText(/reenviar email de confirmación/i);
    expect(resendLink).toBeInTheDocument();
  });
});
