import React from "react";
import { render, screen } from "@testing-library/react";
import EventsPage from "../EventsPage";

describe("EventsPage", () => {
  test("renders main components", () => {
    render(<EventsPage />);

    expect(screen.getByText("1.230 eventos disponibles")).toBeInTheDocument();
    expect(screen.getByText("Encuentra tu evento")).toBeInTheDocument();
    expect(screen.getByText("Eventos más populares")).toBeInTheDocument();
    expect(
      screen.getByText("Otras personas tambien han visto"),
    ).toBeInTheDocument();
    expect(screen.getByText("Descubre Japón")).toBeInTheDocument();
    expect(
      screen.getByText("¡Suscríbete a nuestra newsletter!"),
    ).toBeInTheDocument();
  });
});
