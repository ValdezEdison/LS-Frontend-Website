import React from "react";
import { render, screen } from "@testing-library/react";
import NotificationForm from "./NotificationForm";

describe("NotificationForm", () => {
  test("renders NotificationForm component", () => {
    render(<NotificationForm />);

    expect(screen.getByText("Notificaciones")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Decide tus notificaciones y date de baja en lo que no desees.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("Preferencias de email")).toBeInTheDocument();
    expect(screen.getByText("pablop@gmail.com")).toBeInTheDocument();
    expect(screen.getByText("Promociones y novedades")).toBeInTheDocument();
    expect(screen.getByText("Recomendar a un amigo")).toBeInTheDocument();
    expect(screen.getByText("Descubrimiento semanal")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Guardar" })).toBeInTheDocument();

    const toggleInputs = screen.getAllByRole("checkbox");
    expect(toggleInputs).toHaveLength(3);
  });
});
