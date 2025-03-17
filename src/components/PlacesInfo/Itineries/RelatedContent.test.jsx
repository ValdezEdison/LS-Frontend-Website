import React from "react";
import { render, screen } from "@testing-library/react";
import RelatedContent from "./RelatedContent";

describe("RelatedContent", () => {
  test("renders section title", () => {
    render(<RelatedContent />);
    const titleElement = screen.getByText(/Otras personas también han visto/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("renders related items", () => {
    render(<RelatedContent />);
    const relatedItems = screen.getAllByRole("img");
    expect(relatedItems).toHaveLength(4);
  });

  test("renders specific related item titles", () => {
    render(<RelatedContent />);
    const artesYCiencias = screen.getByText(/Las Artes y las Ciencias/i);
    const pracaDoComercio = screen.getByText(/Praça do Comércio/i);
    const gendarmenmarkt = screen.getByText(/Gendarmenmarkt/i);
    const amsterdam = screen.getByText(/Ámsterdam/i);

    expect(artesYCiencias).toBeInTheDocument();
    expect(pracaDoComercio).toBeInTheDocument();
    expect(gendarmenmarkt).toBeInTheDocument();
    expect(amsterdam).toBeInTheDocument();
  });
});
