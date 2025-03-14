import React from "react";
import { render, screen } from "@testing-library/react";
import Partners from "./Partners";

describe("Partners", () => {
  test("renders partners section title", () => {
    render(<Partners />);

    expect(screen.getByText("Nuestros partners")).toBeInTheDocument();
  });

  test("renders slider buttons", () => {
    render(<Partners />);

    expect(screen.getByLabelText("Previous partners")).toBeInTheDocument();
    expect(screen.getByLabelText("Next partners")).toBeInTheDocument();
  });

  test("renders partner logos", () => {
    render(<Partners />);

    const logos = screen.getAllByTestId("partner-logo");
    expect(logos).toHaveLength(5);
  });
});
