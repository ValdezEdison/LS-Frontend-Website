import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Contacto from "./Contacto";

// Mock the child components to simplify testing
jest.mock("./ContactHeader", () => () => <div data-testid="contact-header" />);
jest.mock("./ContactOffice", () => ({ title }) => (
  <div data-testid={`contact-office-${title}`}>{title}</div>
));
jest.mock("./ContactPressRoom", () => () => (
  <div data-testid="contact-press-room" />
));
jest.mock("./ContactFooter", () => () => <div data-testid="contact-footer" />);

describe("Contacto Component", () => {
  test("renders the main contact page structure", () => {
    render(<Contacto />);

    // Check if the header is rendered
    expect(screen.getByTestId("contact-header")).toBeInTheDocument();

    // Check if the main heading is rendered
    expect(screen.getByText("Contacto")).toBeInTheDocument();

    // Check if the office components are rendered
    expect(
      screen.getByTestId("contact-office-Headquarters USA"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("contact-office-Oficinas España"),
    ).toBeInTheDocument();

    // Check if the press room component is rendered
    expect(screen.getByTestId("contact-press-room")).toBeInTheDocument();

    // Check if the footer is rendered
    expect(screen.getByTestId("contact-footer")).toBeInTheDocument();
  });
});
