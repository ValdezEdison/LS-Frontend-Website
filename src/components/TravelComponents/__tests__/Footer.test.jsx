import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../Footer";

describe("Footer Component", () => {
  test("renders app download section", () => {
    render(<Footer />);

    expect(screen.getByAltText("Local Secrets App")).toBeInTheDocument();
    expect(screen.getByText("Descarga nuestra app")).toBeInTheDocument();
  });

  test("renders footer sections", () => {
    render(<Footer />);

    const sectionTitles = ["Conócenos", "Colaboradores", "Recursos"];
    sectionTitles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  test("renders copyright information", () => {
    render(<Footer />);

    expect(
      screen.getByText(/Copyright Local Secrets 2024/),
    ).toBeInTheDocument();
  });

  test("renders social media icon", () => {
    render(<Footer />);

    expect(screen.getByAltText("Social Media")).toBeInTheDocument();
  });
});
