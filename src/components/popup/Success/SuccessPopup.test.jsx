import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SuccessPopup from "./SuccessPopup";

describe("SuccessPopup", () => {
  it("renders the success message", () => {
    render(<SuccessPopup onClose={() => {}} />);
    expect(
      screen.getByText("¡Comentario enviado correctamente!"),
    ).toBeInTheDocument();
  });

  it("renders the description", () => {
    render(<SuccessPopup onClose={() => {}} />);
    expect(
      screen.getByText(/Recuerda que una vez se valide/),
    ).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const mockOnClose = jest.fn();
    render(<SuccessPopup onClose={mockOnClose} />);
    fireEvent.click(screen.getByLabelText("Cerrar modal"));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("renders the check icon", () => {
    render(<SuccessPopup onClose={() => {}} />);
    expect(screen.getByRole("img", { hidden: true })).toBeInTheDocument();
  });
});
