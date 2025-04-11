import React from "react";
import { render, screen } from "@testing-library/react";
import ItineraryPage from "./ItineraryPage";

describe("ItineraryPage", () => {
  test("renders main components", () => {
    render(<ItineraryPage />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  test("displays correct title", () => {
    render(<ItineraryPage />);
    expect(
      screen.getByText("1.240 itinerarios disponibles"),
    ).toBeInTheDocument();
  });

  test("renders itinerary list", () => {
    render(<ItineraryPage />);
    expect(
      screen.getByText("Itinerarios más vistos por los viajeros"),
    ).toBeInTheDocument();
  });

  test("renders recommended events section", () => {
    render(<ItineraryPage />);
    expect(
      screen.getByText("Otras personas tambien han visto"),
    ).toBeInTheDocument();
  });

  test("renders newsletter section", () => {
    render(<ItineraryPage />);
    expect(
      screen.getByText("¡Suscríbete a nuestra newsletter!"),
    ).toBeInTheDocument();
  });
});
