import React from "react";
import styles from "../../../pages/joinOurTeam/WorkWithUs.module.css";
import DepartmentCard from "./DepartmentCard";

function DepartmentSection() {
  const departments = [
    {
      title: "Ingeniería y tecnología",
      jobCount: 3,
      columnClass: styles.departmentColumn,
      cardClass: styles.departmentCard,
    },
    {
      title: "Ventas",
      jobCount: 1,
      columnClass: styles.departmentColumn,
      cardClass: styles.departmentCard,
    },
    {
      title: "Atención al cliente",
      jobCount: 0,
      columnClass: styles.departmentColumn,
      cardClass: styles.departmentCard,
    },
    {
      title: "Marketing",
      jobCount: 2,
      columnClass: styles.departmentColumn,
      cardClass: styles.departmentCard,
    },
    {
      title: "Administración",
      jobCount: 1,
      columnClass: styles.departmentColumn,
      cardClass: styles.departmentCard,
    },
    {
      title: "Diseño",
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
                styles[`column${index + 1}`] || styles.departmentColumn
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
