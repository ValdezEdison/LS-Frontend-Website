import React from "react";
import { render, screen } from "@testing-library/react";
import SecurityContent from "./SecuritySettings/SecurityContent";

describe("SecurityContent", () => {
  test("renders SecurityContent component", () => {
    render(<SecurityContent />);

    expect(screen.getByText("Seguridad")).toBeInTheDocument();
    expect(
      screen.getByText("Cambia tus ajustes de seguridad o elimina tu cuenta"),
    ).toBeInTheDocument();

    expect(screen.getByText("Contraseña")).toBeInTheDocument();
    expect(
      screen.getByText("Autentificación en dos pasos"),
    ).toBeInTheDocument();
    expect(screen.getByText("Sesiones activas")).toBeInTheDocument();
    expect(screen.getByText("Eliminar cuenta")).toBeInTheDocument();

    expect(screen.getByText("Editar")).toBeInTheDocument();
    expect(screen.getByText("Configurar")).toBeInTheDocument();
    expect(screen.getByText("Cerrar sesión")).toBeInTheDocument();
    expect(screen.getByText("Eliminar")).toBeInTheDocument();
  });
});
