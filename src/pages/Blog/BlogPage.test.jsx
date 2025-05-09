import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BlogPage from "./BlogPage";

// Mock the child components to simplify testing
jest.mock("./BlogHeader", () => () => (
  <div data-testid="blog-header">Header Mock</div>
));
jest.mock("./BlogCategories", () => () => (
  <div data-testid="blog-categories">Categories Mock</div>
));
jest.mock("./BlogPostCard", () => ({ title }) => (
  <div data-testid="blog-post-card">{title}</div>
));
jest.mock("./BlogSection", () => ({ title }) => (
  <div data-testid="blog-section">{title}</div>
));
jest.mock("./Newsletter", () => () => (
  <div data-testid="newsletter">Newsletter Mock</div>
));
jest.mock("./BlogFooter", () => () => (
  <div data-testid="blog-footer">Footer Mock</div>
));

describe("BlogPage Component", () => {
  test("renders the main blog structure", () => {
    render(<BlogPage />);

    // Check if main components are rendered
    expect(screen.getByTestId("blog-header")).toBeInTheDocument();
    expect(screen.getByTestId("blog-categories")).toBeInTheDocument();
    expect(screen.getByTestId("newsletter")).toBeInTheDocument();
    expect(screen.getByTestId("blog-footer")).toBeInTheDocument();

    // Check if main headings are rendered
    expect(screen.getByText("Blog de Local Secrets")).toBeInTheDocument();
    expect(screen.getByText("Últimos artículos")).toBeInTheDocument();
    expect(
      screen.getByText("Los mejores destinos de vacaciones"),
    ).toBeInTheDocument();
  });

  test("renders blog post content", () => {
    render(<BlogPage />);

    // Check if specific blog post content is rendered
    expect(
      screen.getByText("Imprescindibles para recorrer el País Vasco"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Si tu próximo destino es el noreste de la Península/),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Los lugares más curiosos del mundo"),
    ).toBeInTheDocument();
  });

  test("renders the correct section titles", () => {
    render(<BlogPage />);

    // Check for section titles
    expect(
      screen.getByTestId("blog-section", { name: "Viajes culturales" }),
    ).toBeInTheDocument();
  });
});
