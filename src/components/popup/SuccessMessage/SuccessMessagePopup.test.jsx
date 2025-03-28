import React from "react";
import { render, screen } from "@testing-library/react";
import SuccessMessage from "./SuccessMessagePopup";

describe("SuccessMessagePopup", () => {
  test("renders success message correctly", () => {
    render(<SuccessMessagePopup />);

    expect(
      screen.getByText("¡Comentario enviado correctamente!"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Recuerda que una vez se valide podrás editar o eliminar tu comentario.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Close")).toBeInTheDocument();
  });

  test("renders icons", () => {
    render(<SuccessMessagePopup />);

    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
    expect(document.querySelector("svg")).toBeInTheDocument();
  });
});
