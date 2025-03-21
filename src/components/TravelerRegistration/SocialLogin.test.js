import React from "react";
import { render, screen } from "@testing-library/react";
import SocialLogin from "./SocialLogin";

describe("SocialLogin", () => {
  test("renders social login options", () => {
    render(<SocialLogin />);

    expect(
      screen.getByText("o usar una de estas opciones")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /facebook/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /google/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /apple/i })).toBeInTheDocument();
  });
});
