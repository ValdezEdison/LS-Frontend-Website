import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import HelpCenter from "./HelpCenter";

describe("HelpCenter", () => {
  test("renders the help center title", () => {
    render(<HelpCenter />);
    const titleElement = screen.getByText("Centro de ayuda");
    expect(titleElement).toBeInTheDocument();
  });

  test("renders the search section", () => {
    render(<HelpCenter />);
    const searchTitle = screen.getByText("¿Cómo podemos ayudarte?");
    expect(searchTitle).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText("Busca por palabras clave");
    expect(searchInput).toBeInTheDocument();
  });

  test("renders all topic cards", () => {
    render(<HelpCenter />);

    const topicTitles = [
      "Itinerarios",
      "Eventos",
      "Actividades",
      "Lugares",
      "Preguntas frecuentes",
      "Destinos",
      "Mis viajes",
      "Favoritos",
    ];

    topicTitles.forEach((title) => {
      const topicElement = screen.getByText(title);
      expect(topicElement).toBeInTheDocument();
    });
  });

  test("renders FAQ section with questions", () => {
    render(<HelpCenter />);

    const faqTitle = screen.getByText("Preguntas frecuentes");
    expect(faqTitle).toBeInTheDocument();

    const questions = [
      "¿Puedo sugerir una ciudad?",
      "¿Cómo puedo hacer un itinerario?",
      "¿Vais a publicar más ciudades?",
      "¿Puedo compartir mis favoritos?",
      "¿Cuál es la ubicación de las oficinas?",
    ];

    questions.forEach((question) => {
      const questionElement = screen.getByText(question);
      expect(questionElement).toBeInTheDocument();
    });
  });

  test("toggles FAQ answer when clicked", () => {
    render(<HelpCenter />);

    // The first FAQ answer should not be visible initially
    const answerText =
      "Claro, puedes sugerir un lugar o evento desde los ajustes de tu perfil.";
    expect(screen.queryByText(new RegExp(answerText))).not.toBeInTheDocument();

    // Click on the first question
    const firstQuestion = screen.getByText("¿Puedo sugerir una ciudad?");
    const firstQuestionButton = firstQuestion
      .closest("div")
      .querySelector("button");
    fireEvent.click(firstQuestionButton);

    // Now the answer should be visible
    expect(screen.getByText(new RegExp(answerText))).toBeInTheDocument();

    // Click again to hide
    fireEvent.click(firstQuestionButton);

    // The answer should be hidden again
    expect(screen.queryByText(new RegExp(answerText))).not.toBeInTheDocument();
  });

  test("renders contact section", () => {
    render(<HelpCenter />);

    const contactTitle = screen.getByText("Contacta con nosotros");
    expect(contactTitle).toBeInTheDocument();

    const contactButton = screen.getByText("Contacto");
    expect(contactButton).toBeInTheDocument();
  });
});
