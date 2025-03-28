import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ConfirmationPopup from "./ConfirmationPopup";

describe("ConfirmationPopup", () => {
  const mockOnCancel = jest.fn();
  const mockOnConfirm = jest.fn();
  const testProps = {
    title: "Test Title",
    description: "Test Description",
    onCancel: mockOnCancel,
    onConfirm: mockOnConfirm,
  };

  beforeEach(() => {
    render(<ConfirmationPopup {...testProps} />);
  });

  it("renders the title and description", () => {
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("calls onCancel when cancel button is clicked", () => {
    fireEvent.click(screen.getByText("Cancelar"));
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it("calls onConfirm when delete button is clicked", () => {
    fireEvent.click(screen.getByText("Eliminar"));
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });
});
