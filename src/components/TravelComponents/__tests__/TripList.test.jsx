import React from "react";
import { render, screen } from "@testing-library/react";
import TripList from "../TripList";

describe("TripList Component", () => {
  const mockTrips = [
    {
      image: "test-image-1.jpg",
      title: "Test Trip 1",
      sitesAdded: "3 sitios añadidos",
      dateRange: "1 Jan to 5 Jan 2024",
      isPast: false,
    },
    {
      image: "test-image-2.jpg",
      title: "Test Trip 2",
      sitesAdded: "2 sitios añadidos",
      dateRange: "10 Feb to 15 Feb 2024",
      isPast: true,
    },
  ];

  test("renders trip list title and date range", () => {
    render(
      <TripList
        title="Test Trips"
        dateRange="1 Jan to 15 Feb 2024"
        trips={mockTrips}
      />,
    );

    expect(screen.getByText("Test Trips")).toBeInTheDocument();
    expect(screen.getByText("1 Jan to 15 Feb 2024")).toBeInTheDocument();
  });

  test("renders correct number of TripCard components", () => {
    render(
      <TripList
        title="Test Trips"
        dateRange="1 Jan to 15 Feb 2024"
        trips={mockTrips}
      />,
    );

    const tripTitles = screen.getAllByText(/Test Trip \d/);
    expect(tripTitles).toHaveLength(2);
  });
});
