import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BlogPostCard from "./BlogPostCard";

describe("BlogPostCard Component", () => {
  const defaultProps = {
    imageSrc: "test-image.jpg",
    chipText: "Destino",
    title: "Test Blog Post",
    description: "This is a test description for the blog post",
  };

  test("renders with default props", () => {
    render(<BlogPostCard {...defaultProps} />);

    // Check if image is rendered with correct src
    const image = screen.getByAltText("Test Blog Post");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "test-image.jpg");

    // Check if chip text is rendered
    expect(screen.getByText("Destino")).toBeInTheDocument();

    // Check if title and description are rendered
    expect(screen.getByText("Test Blog Post")).toBeInTheDocument();
    expect(
      screen.getByText("This is a test description for the blog post"),
    ).toBeInTheDocument();
  });

  test("renders with secret chip type", () => {
    render(
      <BlogPostCard
        {...defaultProps}
        chipText="Local secret"
        chipType="secret"
      />,
    );

    // Check if the chip text is rendered with the secret type
    expect(screen.getByText("Local secret")).toBeInTheDocument();
  });
});
