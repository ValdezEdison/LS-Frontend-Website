import React from "react";
import { render, screen } from "@testing-library/react";
import PreferencesContent from "./PreferencesContent";

test("renders PreferencesContent component", () => {
  render(<PreferencesContent />);

  // Check for main title and description
  expect(screen.getByText("Preferencias")).toBeInTheDocument();
  expect(
    screen.getByText(
      "Cambia tu idioma y haz sugerencias sobre lugares y eventos",
    ),
  ).toBeInTheDocument();

  // Check for language section
  expect(screen.getByText("Idioma")).toBeInTheDocument();
  expect(screen.getByText("Español")).toBeInTheDocument();
  expect(screen.getByAltText("Spanish flag")).toBeInTheDocument();

  // Check for suggestions section
  expect(screen.getByText("Sugerencias")).toBeInTheDocument();
  expect(screen.getByText("Escribe una sugerencia")).toBeInTheDocument();

  // Check for edit buttons
  const editButtons = screen.getAllByText("Editar");
  expect(editButtons).toHaveLength(2);
});
