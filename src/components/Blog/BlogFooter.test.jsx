import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BlogFooter from "./BlogFooter";

describe("BlogFooter Component", () => {
  test("renders footer sections", () => {
    render(<BlogFooter />);

    // Check if app download section is rendered
    expect(screen.getByText("Descarga nuestra app")).toBeInTheDocument();
    const appLogo = screen.getByAltText("Local Secrets App");
    expect(appLogo).toBeInTheDocument();

    // Check if section headings are rendered
    expect(screen.getByText("Conócenos")).toBeInTheDocument();
    expect(screen.getByText("Colaboradores")).toBeInTheDocument();
    expect(screen.getByText("Recursos")).toBeInTheDocument();

    // Check if links are rendered
    expect(screen.getByText("Quiénes somos")).toBeInTheDocument();
    expect(screen.getByText("Trabaja con nosotros")).toBeInTheDocument();
    expect(screen.getByText("La vida en Local Secrets")).toBeInTheDocument();
    expect(screen.getByText("Embajadores")).toBeInTheDocument();
    expect(screen.getByText("Local secret managers")).toBeInTheDocument();
    expect(screen.getByText("Contacto")).toBeInTheDocument();
    expect(screen.getByText("Centro de ayuda")).toBeInTheDocument();
    expect(screen.getByText("Inicio sesión LS managers")).toBeInTheDocument();

    // Check if copyright text is rendered
    expect(
      screen.getByText(/Copyright Local Secrets 2024/),
    ).toBeInTheDocument();
  });

  test("renders social media icon", () => {
    render(<BlogFooter />);

    const socialIcon = screen.getByAltText("Social media");
    expect(socialIcon).toBeInTheDocument();
    expect(socialIcon).toHaveAttribute(
      "src",
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/f5de6eca7225bf954cc0a641fb5906a5444e88ff?placeholderIfAbsent=true",
    );
  });
});
