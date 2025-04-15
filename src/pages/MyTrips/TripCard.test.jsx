import React from "react";
import { render, screen } from "@testing-library/react";
import TripCard from "./TripCard";

describe("TripCard", () => {
  const mockProps = {
    image: "test-image.jpg",
    name: "Test Trip",
    sitesAdded: 5,
    dates: "1 Jan to 7 Jan 2024",
  };

  test("renders TripCard component", () => {
    render(<TripCard {...mockProps} />);

    expect(screen.getByText("Test Trip")).toBeInTheDocument();
    expect(screen.getByText("5 sitios añadidos")).toBeInTheDocument();
    expect(screen.getByText("1 Jan to 7 Jan 2024")).toBeInTheDocument();
  });

  test("renders trip image", () => {
    render(<TripCard {...mockProps} />);

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", "test-image.jpg");
  });

  test("renders options button", () => {
    render(<TripCard {...mockProps} />);

    expect(screen.getByLabelText("Opciones del viaje")).toBeInTheDocument();
  });
});
