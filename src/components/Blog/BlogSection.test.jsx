import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BlogSection from "./BlogSection";

describe("BlogSection Component", () => {
  const defaultProps = {
    title: "Test Section",
    imageSrc: "test-image.jpg",
    chipText: "Destino",
    postTitle: "Test Post Title",
    postDescription: "This is a test description for the post",
  };

  test("renders with all props", () => {
    render(<BlogSection {...defaultProps} />);

    // Check if section title is rendered
    expect(screen.getByText("Test Section")).toBeInTheDocument();

    // Check if image is rendered with correct src
    const image = screen.getByAltText("Test Post Title");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "test-image.jpg");

    // Check if chip text is rendered
    expect(screen.getByText("Destino")).toBeInTheDocument();

    // Check if post title and description are rendered
    expect(screen.getByText("Test Post Title")).toBeInTheDocument();
    expect(
      screen.getByText("This is a test description for the post"),
    ).toBeInTheDocument();
  });
});
