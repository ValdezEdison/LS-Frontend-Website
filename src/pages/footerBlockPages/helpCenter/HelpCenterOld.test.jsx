import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import HelpCenter from "./HelpCenterOld";

// Mock the component imports
jest.mock("./components/Header/Header", () => () => (
  <div data-testid="header-component">Header Component</div>
));
jest.mock("./components/SearchBanner/SearchBanner", () => () => (
  <div data-testid="search-banner-component">Search Banner Component</div>
));
jest.mock("./components/TopicsSection/TopicsSection", () => () => (
  <div data-testid="topics-section-component">Topics Section Component</div>
));
jest.mock("./components/ContactBanner/ContactBanner", () => () => (
  <div data-testid="contact-banner-component">Contact Banner Component</div>
));
jest.mock("./components/Footer/Footer", () => () => (
  <div data-testid="footer-component">Footer Component</div>
));

// Mock the CSS module
jest.mock("./HelpCenter.module.css", () => ({
  helpCenter: "helpCenter",
  container: "container",
  contentWrapper: "contentWrapper",
  contactSection: "contactSection",
}));

describe("HelpCenter Component", () => {
  test("renders all child components", () => {
    render(<HelpCenter />);

    expect(screen.getByTestId("header-component")).toBeInTheDocument();
    expect(screen.getByTestId("search-banner-component")).toBeInTheDocument();
    expect(screen.getByTestId("topics-section-component")).toBeInTheDocument();
    expect(screen.getByTestId("contact-banner-component")).toBeInTheDocument();
    expect(screen.getByTestId("footer-component")).toBeInTheDocument();
  });

  test("has the correct structure", () => {
    const { container } = render(<HelpCenter />);

    // Check the main container has the helpCenter class
    expect(container.firstChild).toHaveClass("helpCenter");

    // Check that the structure matches our expected layout
    const mainDivs = container.firstChild.children;
    expect(mainDivs.length).toBe(2);
    expect(mainDivs[0]).toHaveClass("container");
    expect(mainDivs[1]).toHaveClass("contactSection");
  });
});
