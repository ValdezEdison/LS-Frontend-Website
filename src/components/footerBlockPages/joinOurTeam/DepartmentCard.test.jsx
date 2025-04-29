import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DepartmentCard from "./DepartmentCard";
import styles from "../../../pages/joinOurTeam/WorkWithUs.module.css";

describe("DepartmentCard", () => {
  test("renders department title correctly", () => {
    render(
      <DepartmentCard
        title="Marketing"
        jobCount={2}
        columnClass={styles.column}
        cardClass={styles.div20}
      />,
    );

    expect(screen.getByText("Marketing")).toBeInTheDocument();
  });

  test("renders correct job count text for multiple jobs", () => {
    render(
      <DepartmentCard
        title="Marketing"
        jobCount={2}
        columnClass={styles.column}
        cardClass={styles.div20}
      />,
    );

    expect(screen.getByText("2 trabajos")).toBeInTheDocument();
  });

  test("renders correct job count text for single job", () => {
    render(
      <DepartmentCard
        title="Ventas"
        jobCount={1}
        columnClass={styles.column2}
        cardClass={styles.div16}
      />,
    );

    expect(screen.getByText("1 trabajo")).toBeInTheDocument();
  });

  test("renders correct text when no jobs available", () => {
    render(
      <DepartmentCard
        title="Atención al cliente"
        jobCount={0}
        columnClass={styles.column3}
        cardClass={styles.div17}
      />,
    );

    expect(screen.getByText("No hay posiciones")).toBeInTheDocument();
  });

  test("applies the correct CSS classes", () => {
    const { container } = render(
      <DepartmentCard
        title="Marketing"
        jobCount={2}
        columnClass={styles.column}
        cardClass={styles.div20}
      />,
    );

    // Check if the column class is applied to the outer div
    expect(container.firstChild).toHaveClass(styles.column);

    // Check if the card class is applied to the inner div
    expect(container.firstChild.firstChild).toHaveClass(styles.div20);
  });
});
