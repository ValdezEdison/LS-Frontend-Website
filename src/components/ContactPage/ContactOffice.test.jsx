import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ContactOffice from "./ContactOffice";

describe("ContactOffice Component", () => {
  const mockProps = {
    title: "Test Office",
    phone: "+1 123 456 7890",
    email: "test@example.com",
    address: ["Line 1", "Line 2", "Line 3"],
    imageSrc: "test-image.jpg",
    containerClass: "test-container-class",
  };

  test("renders office information correctly", () => {
    render(<ContactOffice {...mockProps} />);

    // Check if the title is rendered
    expect(screen.getByText("Test Office")).toBeInTheDocument();

    // Check if contact information is rendered
    expect(screen.getByText("Teléfono:")).toBeInTheDocument();
    expect(screen.getByText("Correo electrónico:")).toBeInTheDocument();
    expect(screen.getByText("Dirección:")).toBeInTheDocument();

    // Check if the specific contact details are rendered
    expect(screen.getByText("+1 123 456 7890")).toBeInTheDocument();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();

    // Check if address lines are rendered
    expect(screen.getByText("Line 1")).toBeInTheDocument();
    expect(screen.getByText("Line 2")).toBeInTheDocument();
    expect(screen.getByText("Line 3")).toBeInTheDocument();

    // Check if the image is rendered with correct src
    const image = screen.getByAltText("Test Office office");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "test-image.jpg");

    // Check if the container has the correct class
    const container = screen.getByRole("article");
    expect(container).toHaveClass("test-container-class");
  });
});
