import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FeedbackModal from "./FeedbackModal";

describe("FeedbackModal", () => {
  test("renders modal content correctly", () => {
    render(<FeedbackModal onClose={() => {}} />);

    expect(screen.getByText("¿Quieres darnos tu opinión?")).toBeInTheDocument();
    expect(screen.getByText(/Regístrate o inicia sesión/)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Inicia sesión o crea una cuenta" })
    ).toBeInTheDocument();
  });

  test("calls onClose when close button is clicked", () => {
    const mockOnClose = jest.fn();
    render(<FeedbackModal onClose={mockOnClose} />);

    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
