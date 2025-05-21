import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Ambassadors from "./Ambassadors";

// Mock all component imports
jest.mock("./Components/Header/Header", () => () => (
  <div data-testid="header-component">Header Component</div>
));
jest.mock("./Components/HeroSection/HeroSection", () => () => (
  <div data-testid="hero-section-component">Hero Section Component</div>
));
jest.mock("./Components/AboutSection/AboutSection", () => () => (
  <div data-testid="about-section-component">About Section Component</div>
));
jest.mock("./Components/BenefitsSection/BenefitsSection", () => () => (
  <div data-testid="benefits-section-component">Benefits Section Component</div>
));
jest.mock("./Components/TestimonialsSection/TestimonialsSection", () => () => (
  <div data-testid="testimonials-section-component">
    Testimonials Section Component
  </div>
));
jest.mock("./Components/ContactSection/ContactSection", () => () => (
  <div data-testid="contact-section-component">Contact Section Component</div>
));
jest.mock("./Components/Footer/Footer", () => () => (
  <div data-testid="footer-component">Footer Component</div>
));

// Mock the CSS module
jest.mock("./Ambassadors.module.css", () => ({
  embajadores: "embajadores-class",
  container: "container-class",
}));

describe("Ambassadors Component", () => {
  test("renders the component without crashing", () => {
    render(<Ambassadors />);
    expect(document.querySelector(".embajadores-class")).toBeInTheDocument();
  });

  test("renders all child components", () => {
    render(<Ambassadors />);
    expect(screen.getByTestId("header-component")).toBeInTheDocument();
    expect(screen.getByTestId("hero-section-component")).toBeInTheDocument();
    expect(screen.getByTestId("about-section-component")).toBeInTheDocument();
    expect(
      screen.getByTestId("benefits-section-component"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("testimonials-section-component"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("contact-section-component")).toBeInTheDocument();
    expect(screen.getByTestId("footer-component")).toBeInTheDocument();
  });
});
