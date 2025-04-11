import React from "react";
import { render, screen } from "@testing-library/react";
import RecommendedEvents from "./RecommendedEvents";

describe("RecommendedEvents", () => {
  test("renders section title", () => {
    render(<RecommendedEvents />);
    expect(
      screen.getByText("Otras personas tambien han visto"),
    ).toBeInTheDocument();
  });

  test("renders event cards", () => {
    render(<RecommendedEvents />);
    expect(
      screen.getByText("Kensington Dollshouse Festival"),
    ).toBeInTheDocument();
    expect(screen.getByText("Summer Social 2024")).toBeInTheDocument();
    expect(screen.getByText("Open Bar Afro Caribbean")).toBeInTheDocument();
    expect(
      screen.getByText("Asbury Park Vegan Food Festival"),
    ).toBeInTheDocument();
  });

  test("renders event images", () => {
    render(<RecommendedEvents />);
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(4);
  });
});
