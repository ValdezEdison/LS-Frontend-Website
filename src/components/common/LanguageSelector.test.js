import React from "react";
import { render, screen } from "@testing-library/react";
import LanguageSelector from "./LanguageSelector";

describe("LanguageSelector", () => {
  test("renders all language options", () => {
    render(<LanguageSelector />);

    expect(screen.getByText("Español")).toBeInTheDocument();
    expect(screen.getByText("English (UK)")).toBeInTheDocument();
    expect(screen.getByText("English (US)")).toBeInTheDocument();
  });

  test("displays correct flags for each language", () => {
    render(<LanguageSelector />);

    const flags = screen.getAllByRole("img", { name: /flag$/i });
    expect(flags).toHaveLength(3);
    expect(flags[0]).toHaveAttribute(
      "src",
      "https://cdn.builder.io/api/v1/image/assets/85c469ae9c6c44fcacbfdf79412e1e33/d59d63834e54f25fee62d3cbdd6af956aa89da6a0e4ab4ee51bf05bdcc5c29d1?apiKey=85c469ae9c6c44fcacbfdf79412e1e33&"
    );
    expect(flags[1]).toHaveAttribute(
      "src",
      "https://cdn.builder.io/api/v1/image/assets/85c469ae9c6c44fcacbfdf79412e1e33/9efacf5cdc29130a92864d016b1b9f414a3182a0e54e4c5a5c3b9bf1b8cdc64d?apiKey=85c469ae9c6c44fcacbfdf79412e1e33&"
    );
    expect(flags[2]).toHaveAttribute(
      "src",
      "https://cdn.builder.io/api/v1/image/assets/85c469ae9c6c44fcacbfdf79412e1e33/13b76c7b1a61269142973faa187a0fcd0d2e36009822b38c239d33b490803bdb?apiKey=85c469ae9c6c44fcacbfdf79412e1e33&"
    );
  });

  test("shows selected indicator for Spanish", () => {
    render(<LanguageSelector />);

    const selectedIndicator = screen.getByAltText(
      "Selected language indicator"
    );
    expect(selectedIndicator).toBeInTheDocument();
    expect(selectedIndicator.closest(".languageOption")).toContainElement(
      screen.getByText("Español")
    );
  });
});
