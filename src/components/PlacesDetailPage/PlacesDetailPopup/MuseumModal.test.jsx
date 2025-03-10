import React from "react";
import { render, screen } from "@testing-library/react";
import MuseumModal from "./MuseumModal";

describe("MuseumModal", () => {
  test("renders modal title", () => {
    render(<MuseumModal />);
    const titleElement = screen.getByText(/National historical museum/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("renders close button", () => {
    render(<MuseumModal />);
    const closeButton = screen.getByLabelText(/Close modal/i);
    expect(closeButton).toBeInTheDocument();
  });

  test("renders main image", () => {
    render(<MuseumModal />);
    const mainImage = screen.getByAltText(/Museum main view/i);
    expect(mainImage).toBeInTheDocument();
  });

  test("renders thumbnail images", () => {
    render(<MuseumModal />);
    const thumbnails = screen.getAllByAltText(/Museum thumbnail/i);
    expect(thumbnails.length).toBe(4);
  });

  test("renders rating score", () => {
    render(<MuseumModal />);
    const ratingScore = screen.getByText("4,5");
    expect(ratingScore).toBeInTheDocument();
  });

  test("renders review count", () => {
    render(<MuseumModal />);
    const reviewCount = screen.getByText(/123 reseñas/i);
    expect(reviewCount).toBeInTheDocument();
  });

  test("renders review items", () => {
    render(<MuseumModal />);
    const reviewItems = screen.getAllByText(/Mirador muy concurrido!/i);
    expect(reviewItems.length).toBe(6);
  });
});
