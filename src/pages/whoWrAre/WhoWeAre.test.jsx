import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import WhoWeAre from "./WhoWeAre";

// Mock the child components to isolate testing
jest.mock("./Header", () => () => (
  <div data-testid="header-component">Header Component</div>
));
jest.mock("./Sidebar", () => () => (
  <div data-testid="sidebar-component">Sidebar Component</div>
));
jest.mock("./AboutContent", () => () => (
  <div data-testid="about-content-component">About Content Component</div>
));
jest.mock("./MissionSection", () => () => (
  <div data-testid="mission-section-component">Mission Section Component</div>
));
jest.mock("./ValuesSection", () => () => (
  <div data-testid="values-section-component">Values Section Component</div>
));
jest.mock("./VisionSection", () => () => (
  <div data-testid="vision-section-component">Vision Section Component</div>
));
jest.mock("./CompanyStats", () => () => (
  <div data-testid="company-stats-component">Company Stats Component</div>
));
jest.mock("./TeamStats", () => () => (
  <div data-testid="team-stats-component">Team Stats Component</div>
));
jest.mock("./NewsletterBanner", () => () => (
  <div data-testid="newsletter-banner-component">
    Newsletter Banner Component
  </div>
));
jest.mock("./Footer", () => () => (
  <div data-testid="footer-component">Footer Component</div>
));

describe("WhoWeAre Component", () => {
  test("renders the main component without crashing", () => {
    render(<WhoWeAre />);
    expect(screen.getByTestId("header-component")).toBeInTheDocument();
  });

  test("renders all child components", () => {
    render(<WhoWeAre />);

    // Check that all child components are rendered
    expect(screen.getByTestId("header-component")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar-component")).toBeInTheDocument();
    expect(screen.getByTestId("about-content-component")).toBeInTheDocument();
    expect(screen.getByTestId("mission-section-component")).toBeInTheDocument();
    expect(screen.getByTestId("values-section-component")).toBeInTheDocument();
    expect(screen.getByTestId("vision-section-component")).toBeInTheDocument();
    expect(screen.getByTestId("company-stats-component")).toBeInTheDocument();
    expect(screen.getByTestId("team-stats-component")).toBeInTheDocument();
    expect(
      screen.getByTestId("newsletter-banner-component"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("footer-component")).toBeInTheDocument();
  });

  test("renders the company image", () => {
    render(<WhoWeAre />);
    const companyImage = screen.getByAltText("Company image");
    expect(companyImage).toBeInTheDocument();
    expect(companyImage).toHaveAttribute(
      "src",
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/8576e220dbf77a89b0b6ab392ef453118d077c2e?placeholderIfAbsent=true",
    );
    expect(companyImage).toHaveClass("companyImage");
  });

  test("renders section dividers", () => {
    render(<WhoWeAre />);
    const dividers = screen.getAllByRole("separator");
    expect(dividers.length).toBe(5); // There should be 5 hr elements
  });
});
