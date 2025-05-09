import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ContactPressRoom from "./ContactPressRoom";

describe("ContactPressRoom Component", () => {
  test("renders press room information correctly", () => {
    render(<ContactPressRoom />);

    // Check if the title is rendered
    expect(screen.getByText("Sala de prensa")).toBeInTheDocument();

    // Check if contact labels are rendered
    expect(screen.getByText("Teléfono:")).toBeInTheDocument();
    expect(screen.getByText("Correo electrónico:")).toBeInTheDocument();
    expect(screen.getByText("Responsable:")).toBeInTheDocument();

    // Check if contact details are rendered
    expect(screen.getByText("+1 786 123 456 789")).toBeInTheDocument();
    expect(screen.getByText("ejemplo@gmail.com")).toBeInTheDocument();
    expect(screen.getByText("Pablo García")).toBeInTheDocument();
  });
});
