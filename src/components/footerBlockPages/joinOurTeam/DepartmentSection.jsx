import React from "react";
import styles from "../../../pages/joinOurTeam/WorkWithUs.module.css";
import DepartmentCard from "./DepartmentCard";
import { useTranslation } from "react-i18next";

function DepartmentSection() {

  const { t } = useTranslation("WorkWithUs");

  const departments = [
    {
      title:t('departments.engineering'),
      jobCount: 3,
      columnClass: styles.departmentColumn,
      cardClass: styles.departmentCard,
    },
    {
      title: t('departments.sales'),
      jobCount: 1,
      columnClass: styles.departmentColumn,
      cardClass: styles.departmentCard,
    },
    {
      title: t('departments.customerService'),
      jobCount: 0,
      columnClass: styles.departmentColumn,
      cardClass: styles.departmentCard,
    },
    {
      title:t('departments.marketing'),
      jobCount: 2,
      columnClass: styles.departmentColumn,
      cardClass: styles.departmentCard,
    },
    {
      title: t('departments.administration'),
      jobCount: 1,
      columnClass: styles.departmentColumn,
      cardClass: styles.departmentCard,
    },
    {
      title: t('departments.design'),
      jobCount: 3,
      columnClass: styles.departmentColumn,
      cardClass: styles.departmentCard,
    },
  ];

  // First row of departments
  const firstRowDepartments = departments.slice(0, 6);
  // Second row of departments
  // const secondRowDepartments = departments.slice(3);

  return (
    <>
      <div className={styles.departmentRow}>
        <div className={styles.departmentGrid}>
          {firstRowDepartments.map((dept, index) => (
            <DepartmentCard
              key={index}
              title={dept.title}
              jobCount={dept.jobCount}
              columnClass={
                 styles.departmentColumn
              }
              cardClass={
                styles[`departmentCard${index + 1}`] || styles.departmentCard
              }
            />
          ))}
        </div>
       
      </div>
    </>
  );
}

export default DepartmentSection;
