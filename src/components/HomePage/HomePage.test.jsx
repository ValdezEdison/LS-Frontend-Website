import React from "react";
import { render, screen } from "@testing-library/react";
import HomePage from "./HomePage";

describe("HomePage", () => {
  test("renders all main sections", () => {
    render(<HomePage />);

    expect(screen.getByRole("banner")).toBeInTheDocument(); // Header
    expect(
      screen.getByRole("heading", { name: /Viaja\. Conecta\. Descubre\./i })
    ).toBeInTheDocument(); // HeroSection
    expect(
      screen.getByRole("heading", { name: /Lugares por descubrir/i })
    ).toBeInTheDocument(); // PlacesSection
    expect(
      screen.getByRole("heading", { name: /Eventos que no te puedes perder/i })
    ).toBeInTheDocument(); // EventsSection
    expect(
      screen.getByRole("heading", { name: /¡Conóce nuestra historia!/i })
    ).toBeInTheDocument(); // First AppPromotion
    expect(
      screen.getByRole("heading", {
        name: /Inspiración para tus próximos viajes/i,
      })
    ).toBeInTheDocument(); // ArticlesSection
    expect(
      screen.getByRole("heading", {
        name: /¡Descarga tu app de Local Secrets!/i,
      })
    ).toBeInTheDocument(); // Second AppPromotion
    expect(
      screen.getByRole("heading", { name: /Nuestros partners/i })
    ).toBeInTheDocument(); // PartnersSection
    expect(
      screen.getByRole("heading", {
        name: /¡Suscríbete a nuestra newsletter!/i,
      })
    ).toBeInTheDocument(); // Newsletter
    expect(screen.getByRole("contentinfo")).toBeInTheDocument(); // Footer
    expect(screen.getByRole("search")).toBeInTheDocument(); // SearchBar
  });
});
