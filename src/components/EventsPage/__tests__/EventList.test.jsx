import React from "react";
import { render, screen } from "@testing-library/react";
import EventList from "../EventList";

describe("EventList", () => {
  test("renders event cards", () => {
    render(<EventList />);

    expect(screen.getByText("Underdogs gallery")).toBeInTheDocument();
    expect(screen.getByText("Concierto música clásica")).toBeInTheDocument();
    expect(screen.getByText("Amnesia Ibiza")).toBeInTheDocument();
    expect(screen.getByText("Teatro Piccolo")).toBeInTheDocument();
  });
});
