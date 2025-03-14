import React from "react";
import { render, screen } from "@testing-library/react";
import DestinationDetail from "./Destination";

describe("DestinationDetail", () => {
  test("renders the main components", () => {
    render(<DestinationDetail />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Atenas, Grecia/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Otros lugares cercanos/i)).toBeInTheDocument();
    expect(screen.getByText(/Nuestros partners/i)).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });
});
