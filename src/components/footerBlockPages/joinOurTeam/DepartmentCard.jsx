import React from "react";
import styles from "../../../pages/joinOurTeam/WorkWithUs.module.css";

function DepartmentCard({ title, jobCount, columnClass, cardClass }) {
  const jobText =
    jobCount === 0
      ? "No hay posiciones"
      : jobCount === 1
        ? "1 trabajo"
        : `${jobCount} trabajos`;

  // Create a safe class name for the department title
  const titleClassName = title.toLowerCase().replace(/\s+/g, "");

  return (
    <div className={columnClass}>
      <div className={cardClass}>
        <h3 className={styles[titleClassName] || styles.departmentTitle}>
          {title}
        </h3>
        <div className={styles.jobCountBadge}>{jobText}</div>
      </div>
    </div>
  );
}

export default DepartmentCard;
