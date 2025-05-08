import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import BlogCategories from "./BlogCategories";

describe("BlogCategories Component", () => {
  test("renders all category buttons", () => {
    render(<BlogCategories />);

    // Check if all category buttons are rendered
    expect(screen.getByText("Todos (120 post)")).toBeInTheDocument();
    expect(screen.getByText("Curiosidades")).toBeInTheDocument();
    expect(screen.getByText("Imprescindibles")).toBeInTheDocument();
    expect(screen.getByText("Mercados")).toBeInTheDocument();
    expect(screen.getByText("Eventos")).toBeInTheDocument();
  });

  test("buttons are clickable", () => {
    render(<BlogCategories />);

    // Get all buttons
    const allButtons = [
      screen.getByText("Todos (120 post)"),
      screen.getByText("Curiosidades"),
      screen.getByText("Imprescindibles"),
      screen.getByText("Mercados"),
      screen.getByText("Eventos"),
    ];

    // Check that each button can be clicked
    allButtons.forEach((button) => {
      fireEvent.click(button);
      // In a real implementation, we would check for state changes or callbacks
      // Here we're just ensuring the buttons don't throw errors when clicked
      expect(button).toBeInTheDocument();
    });
  });
});
