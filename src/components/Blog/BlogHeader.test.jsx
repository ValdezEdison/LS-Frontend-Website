import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BlogHeader from "./BlogHeader";

describe("BlogHeader Component", () => {
  test("renders the header with navigation links", () => {
    render(<BlogHeader />);

    // Check if logo is rendered
    const logo = screen.getByAltText("Local Secrets Logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute(
      "src",
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/451aacecc5f25c0e85fcf0059a95436d266850e7?placeholderIfAbsent=true",
    );

    // Check if navigation links are rendered
    expect(screen.getByText("Lugares")).toBeInTheDocument();
    expect(screen.getByText("Eventos")).toBeInTheDocument();
    expect(screen.getByText("Itinerarios")).toBeInTheDocument();
    expect(screen.getByText("Explorar")).toBeInTheDocument();

    // Check if user links are rendered
    expect(screen.getByText("Blog")).toBeInTheDocument();
    expect(screen.getByText("Contacto")).toBeInTheDocument();
    expect(screen.getByText("Iniciar sesión")).toBeInTheDocument();
  });

  test("renders user icons", () => {
    render(<BlogHeader />);

    const userIcon = screen.getByAltText("User icon");
    const blogIcon = screen.getByAltText("Blog icon");

    expect(userIcon).toBeInTheDocument();
    expect(blogIcon).toBeInTheDocument();
    expect(userIcon).toHaveAttribute(
      "src",
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/dee1de9d9d2ca465d2c09fd31034c716872348cf?placeholderIfAbsent=true",
    );
    expect(blogIcon).toHaveAttribute(
      "src",
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/b8ac1cd98e603ddc5b10641c2dee01b3b8682413?placeholderIfAbsent=true",
    );
  });
});
