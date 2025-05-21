import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LocalSecretManager from "./LocalSecretManager";

// Mock all CSS modules
jest.mock("./LocalSecretManager.module.css", () => ({}));
jest.mock("./Header.module.css", () => ({}));
jest.mock("./HeroSection.module.css", () => ({}));
jest.mock("./InfoSection.module.css", () => ({}));
jest.mock("./ThreeStepsSection.module.css", () => ({}));
jest.mock("./TestimonialsSection.module.css", () => ({}));
jest.mock("./TestimonialCard.module.css", () => ({}));
jest.mock("./CallToAction.module.css", () => ({}));
jest.mock("./Footer.module.css", () => ({}));

// Mock the component imports
jest.mock("./Header", () => {
  return function MockHeader() {
    return (
      <header>
        <button>Lugares</button>
        <button>Eventos</button>
        <button>Iniciar sesión</button>
      </header>
    );
  };
});

jest.mock("./HeroSection", () => {
  return function MockHeroSection() {
    return (
      <section>
        <h1>Local secret manager</h1>
        <p>¡Haz crecer tu negocio con Local Secrets!</p>
      </section>
    );
  };
});

jest.mock("./InfoSection", () => {
  return function MockInfoSection() {
    return (
      <section>
        <h2>¿Qué significa ser local secret manager?</h2>
        <p>
          Local Secret Manager es el propietario de un anuncio en Local
          Secrets...
        </p>
      </section>
    );
  };
});

jest.mock("./ThreeStepsSection", () => {
  return function MockThreeStepsSection() {
    return (
      <section>
        <h2>TRES SIMPLES PASOS</h2>
        <h3>GESTIONA</h3>
        <h3>CONECTA</h3>
        <h3>CRECE</h3>
      </section>
    );
  };
});

jest.mock("./TestimonialsSection", () => {
  return function MockTestimonialsSection() {
    return (
      <section>
        <h2>Qué opinan nuestros viajeros</h2>
      </section>
    );
  };
});

jest.mock("./CallToAction", () => {
  return function MockCallToAction() {
    return (
      <section>
        <h2>Crea una cuenta o inicia sesión como LS manager</h2>
        <button>Regístrate o inicia sesión</button>
      </section>
    );
  };
});

jest.mock("./Footer", () => {
  return function MockFooter() {
    return (
      <footer>
        <h3>Conócenos</h3>
        <h3>Colaboradores</h3>
        <h3>Recursos</h3>
        <p>Copyright Local Secrets 2024</p>
      </footer>
    );
  };
});

describe("LocalSecretManager", () => {
  test("renders the component with all sections", () => {
    render(<LocalSecretManager />);

    // Check for header elements
    expect(screen.getByText("Lugares")).toBeInTheDocument();
    expect(screen.getByText("Eventos")).toBeInTheDocument();
    expect(screen.getByText("Iniciar sesión")).toBeInTheDocument();

    // Check for main content
    expect(screen.getByText("Local secret manager")).toBeInTheDocument();
    expect(
      screen.getByText("¡Haz crecer tu negocio con Local Secrets!"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("¿Qué significa ser local secret manager?"),
    ).toBeInTheDocument();

    // Check for three steps section
    expect(screen.getByText("TRES SIMPLES PASOS")).toBeInTheDocument();
    expect(screen.getByText("GESTIONA")).toBeInTheDocument();
    expect(screen.getByText("CONECTA")).toBeInTheDocument();
    expect(screen.getByText("CRECE")).toBeInTheDocument();

    // Check for testimonials section
    expect(
      screen.getByText("Qué opinan nuestros viajeros"),
    ).toBeInTheDocument();

    // Check for call to action section
    expect(
      screen.getByText("Crea una cuenta o inicia sesión como LS manager"),
    ).toBeInTheDocument();
    expect(screen.getByText("Regístrate o inicia sesión")).toBeInTheDocument();

    // Check for footer elements
    expect(screen.getByText("Conócenos")).toBeInTheDocument();
    expect(screen.getByText("Colaboradores")).toBeInTheDocument();
    expect(screen.getByText("Recursos")).toBeInTheDocument();
    expect(
      screen.getByText("Copyright Local Secrets 2024"),
    ).toBeInTheDocument();
  });
});
