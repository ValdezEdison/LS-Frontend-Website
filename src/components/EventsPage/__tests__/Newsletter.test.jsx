import React from "react";
import { render, screen } from "@testing-library/react";
import Newsletter from "../Newsletter";

describe("Newsletter", () => {
  test("renders newsletter form", () => {
    render(<Newsletter />);

    expect(
      screen.getByText("¡Suscríbete a nuestra newsletter!"),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Tu dirección de email"),
    ).toBeInTheDocument();
    expect(screen.getByText("SUSCRÍBETE")).toBeInTheDocument();
  });
});
