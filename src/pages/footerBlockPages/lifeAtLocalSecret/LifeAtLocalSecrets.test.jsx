import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import LifeAtLocalSecrets from "./LifeAtLocalSecrets";

// Mock the sub-components to simplify testing
jest.mock("./Sidebar", () => () => <div data-testid="sidebar-component" />);
jest.mock("./HeroSection", () => () => (
  <div data-testid="hero-section-component" />
));
jest.mock("./WorkPhilosophySection", () => ({ title }) => (
  <div data-testid="work-philosophy-section">{title}</div>
));
jest.mock("./BenefitsSection", () => () => (
  <div data-testid="benefits-section-component" />
));
jest.mock("./FaqSection", () => () => (
  <div data-testid="faq-section-component" />
));

describe("LifeAtLocalSecrets Component", () => {
  test("renders all sections correctly", () => {
    render(<LifeAtLocalSecrets />);

    // Check if all components are rendered
    expect(screen.getByTestId("sidebar-component")).toBeInTheDocument();
    expect(screen.getByTestId("hero-section-component")).toBeInTheDocument();
    expect(screen.getAllByTestId("work-philosophy-section")).toHaveLength(3);
    expect(
      screen.getByTestId("benefits-section-component"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("faq-section-component")).toBeInTheDocument();
  });
});
