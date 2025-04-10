import React from "react";
import { render, screen } from "@testing-library/react";
import ProfilePage from "./ProfilePage";

jest.mock("./Header", () => () => <div data-testid="header">Header</div>);
jest.mock("./Sidebar", () => () => <div data-testid="sidebar">Sidebar</div>);
jest.mock("./PersonalDetails", () => () => (
  <div data-testid="personal-details">Personal Details</div>
));
jest.mock("./Footer", () => () => <div data-testid="footer">Footer</div>);

describe("ProfilePage", () => {
  it("renders all components correctly", () => {
    render(<ProfilePage />);

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("personal-details")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("has the correct structure", () => {
    const { container } = render(<ProfilePage />);

    expect(container.firstChild).toHaveClass("profilePage");
    expect(container.querySelector("main")).toHaveClass("mainContent");
  });
});
