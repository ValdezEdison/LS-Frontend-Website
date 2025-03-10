import React from "react";
import { render, screen } from "@testing-library/react";
import ImageGallery from "./ImageGallery";

describe("ImageGallery", () => {
  test("renders main image", () => {
    render(<ImageGallery />);
    const mainImage = screen.getByAltText(/Museum main view/i);
    expect(mainImage).toBeInTheDocument();
  });

  test("renders thumbnail images", () => {
    render(<ImageGallery />);
    const thumbnails = screen.getAllByAltText(/Museum thumbnail/i);
    expect(thumbnails.length).toBe(4);
  });

  test("renders navigation buttons", () => {
    render(<ImageGallery />);
    const prevButton = screen.getByLabelText(/Previous image/i);
    const nextButton = screen.getByLabelText(/Next image/i);
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  test("renders image counter", () => {
    render(<ImageGallery />);
    const counter = screen.getByText("1/6");
    expect(counter).toBeInTheDocument();
  });
});
