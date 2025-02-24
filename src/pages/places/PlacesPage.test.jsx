import React from "react";
import { render, screen } from "@testing-library/react";
import PlacesPage from "./PlacesPage";

describe("PlacesPage", () => {
  test("renders PlacesPage component", () => {
    render(<PlacesPage />);

    // Check if main components are rendered
    expect(screen.getByRole("banner")).toBeInTheDocument(); // Header
    expect(screen.getByRole("complementary")).toBeInTheDocument(); // Sidebar
    expect(screen.getByRole("main")).toBeInTheDocument(); // MainContent
    expect(screen.getByRole("contentinfo")).toBeInTheDocument(); // Footer
  });
});
