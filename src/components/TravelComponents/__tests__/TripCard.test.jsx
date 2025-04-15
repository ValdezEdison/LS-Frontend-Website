import React from "react";
import { render, screen } from "@testing-library/react";
import TripCard from "../TripCard";

describe("TripCard Component", () => {
  const mockTripData = {
    image: "test-image.jpg",
    title: "Test Trip",
    sitesAdded: "4 sitios añadidos",
    dateRange: "1 Mar to 5 Mar 2024",
    isPast: false,
  };

  test("renders trip details correctly", () => {
    render(<TripCard {...mockTripData} />);

    expect(screen.getByText("Test Trip")).toBeInTheDocument();
    expect(screen.getByText("4 sitios añadidos")).toBeInTheDocument();
    expect(screen.getByText("1 Mar to 5 Mar 2024")).toBeInTheDocument();
  });

  test("renders edit and delete buttons for future trips", () => {
    render(<TripCard {...mockTripData} />);

    expect(screen.getByText("Editar")).toBeInTheDocument();
    expect(screen.getByText("Eliminar")).toBeInTheDocument();
  });

  test("does not render edit and delete buttons for past trips", () => {
    render(<TripCard {...mockTripData} isPast={true} />);

    expect(screen.queryByText("Editar")).not.toBeInTheDocument();
    expect(screen.queryByText("Eliminar")).not.toBeInTheDocument();
  });
});
