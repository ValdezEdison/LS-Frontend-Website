import React from "react";
import styles from "../../../pages/joinOurTeam/WorkWithUs.module.css";
import { useTranslation } from "react-i18next";

function DepartmentCard({ title, jobCount, columnClass, cardClass }) {

  const { t } = useTranslation("WorkWithUs");
  // const jobText =
  //   jobCount === 0
  //     ? "No hay posiciones"
  //     : jobCount === 1
  //       ? "1 trabajo"
  //       : `${jobCount} trabajos`;

  const jobText = t(`departments.${ 
    jobCount === 0 ? "none" : 
    jobCount === 1 ? "singular" : "plural"
  }`, { count: jobCount });

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
