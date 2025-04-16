import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "../Header";

describe("Header Component", () => {
  test("renders logo and navigation items", () => {
    render(<Header />);

    const logo = screen.getByAltText("Local Secrets Logo");
    expect(logo).toBeInTheDocument();

    const navItems = [
      "Lugares",
      "Eventos",
      "Itinerarios",
      "Explorar",
      "Mis viajes",
    ];
    navItems.forEach((item) => {
      const navButton = screen.getByText(item);
      expect(navButton).toBeInTheDocument();
    });
  });

  test("renders user action buttons", () => {
    render(<Header />);

    const blogButton = screen.getByText("Blog");
    expect(blogButton).toBeInTheDocument();

    const contactButton = screen.getByText("Contacto");
    expect(contactButton).toBeInTheDocument();

    const profileIcon = screen.getByAltText("User Profile");
    expect(profileIcon).toBeInTheDocument();
  });
});
