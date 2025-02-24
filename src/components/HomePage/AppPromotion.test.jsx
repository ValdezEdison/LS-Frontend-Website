import React from "react";
import { render, screen } from "@testing-library/react";
import AppPromotion from "./AppPromotion";

describe("AppPromotion", () => {
  it("renders the component", () => {
    render(<AppPromotion />);
    expect(
      screen.getByText("¡Descarga tu app de Local Secrets!")
    ).toBeInTheDocument();
    expect(screen.getByAltText("App background")).toBeInTheDocument();
    expect(screen.getByAltText("App screenshot")).toBeInTheDocument();
    expect(screen.getByAltText("App QR code")).toBeInTheDocument();
  });
});
