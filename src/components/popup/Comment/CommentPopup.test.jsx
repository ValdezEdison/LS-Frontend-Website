import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CommentPopup from "./CommentPopup";

describe("CommentPopup", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    render(<CommentPopup onClose={mockOnClose} />);
  });

  test("renders modal title", () => {
    expect(screen.getByText("Añadir comentario")).toBeInTheDocument();
  });

  test("renders subtitle", () => {
    expect(screen.getByText("National historical museum")).toBeInTheDocument();
  });

  test("renders star rating", () => {
    expect(
      screen.getByRole("img", { name: /star rating/i })
    ).toBeInTheDocument();
  });

  test("renders textarea for comment", () => {
    expect(
      screen.getByPlaceholderText("Escribe un comentario")
    ).toBeInTheDocument();
  });

  test("updates character count when typing", () => {
    const textarea = screen.getByPlaceholderText("Escribe un comentario");
    fireEvent.change(textarea, { target: { value: "Test comment" } });
    expect(screen.getByText("12/400")).toBeInTheDocument();
  });

  test("calls onClose when close button is clicked", () => {
    const closeButton = screen.getByLabelText("Close");
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("calls onClose when submit button is clicked", () => {
    const submitButton = screen.getByText("Enviar");
    fireEvent.click(submitButton);
    expect(mockOnClose).toHaveBeenCalled();
  });
});
