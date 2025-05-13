import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BlogDetail from "./BlogDetail";

// Mock the child components to isolate testing of BlogDetail
jest.mock("./BlogHeader", () => () => (
  <div data-testid="blog-header">Header Component</div>
));
jest.mock("./ArticleContent", () => () => (
  <div data-testid="article-content">Article Content Component</div>
));
jest.mock("./NewsletterBanner", () => () => (
  <div data-testid="newsletter-banner">Newsletter Banner Component</div>
));
jest.mock("./BlogFooter", () => () => (
  <div data-testid="blog-footer">Footer Component</div>
));

describe("BlogDetail Component", () => {
  test("renders all child components", () => {
    render(<BlogDetail />);

    expect(screen.getByTestId("blog-header")).toBeInTheDocument();
    expect(screen.getByTestId("article-content")).toBeInTheDocument();
    expect(screen.getByTestId("newsletter-banner")).toBeInTheDocument();
    expect(screen.getByTestId("blog-footer")).toBeInTheDocument();
  });
});
