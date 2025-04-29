import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import WorkWithUs from "./WorkWithUs";

// Mock the child components to simplify testing
jest.mock("./Header", () => () => <div data-testid="header-component" />);
jest.mock("./Sidebar", () => () => <div data-testid="sidebar-component" />);
jest.mock("./JobSearch", () => () => (
  <div data-testid="job-search-component" />
));
jest.mock("./DepartmentSection", () => () => (
  <div data-testid="department-section-component" />
));
jest.mock("./CompanyStats", () => () => (
  <div data-testid="company-stats-component" />
));
jest.mock("./Testimonials", () => () => (
  <div data-testid="testimonials-component" />
));
jest.mock("./ContactCTA", () => () => (
  <div data-testid="contact-cta-component" />
));
jest.mock("./Footer", () => () => <div data-testid="footer-component" />);

describe("WorkWithUs", () => {
  test("renders all child components", () => {
    render(<WorkWithUs />);

    expect(screen.getByTestId("header-component")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar-component")).toBeInTheDocument();
    expect(screen.getByTestId("job-search-component")).toBeInTheDocument();
    expect(
      screen.getByTestId("department-section-component"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("company-stats-component")).toBeInTheDocument();
    expect(screen.getByTestId("testimonials-component")).toBeInTheDocument();
    expect(screen.getByTestId("contact-cta-component")).toBeInTheDocument();
    expect(screen.getByTestId("footer-component")).toBeInTheDocument();
  });

  test("renders the main heading", () => {
    render(<WorkWithUs />);

    expect(
      screen.getByText("Explora posiciones abiertas por departamento"),
    ).toBeInTheDocument();
  });

  test('renders the "Ver todo" button', () => {
    render(<WorkWithUs />);

    expect(screen.getByText("Ver todo")).toBeInTheDocument();
  });
});
