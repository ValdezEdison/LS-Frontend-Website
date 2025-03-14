import React from "react";
import styles from "./TravelerReviews.module.css";

const FilterDropdown = ({ label, value }) => {
  return (
    <div
      className={styles.filterDropdown}
      tabIndex="0"
      role="button"
      aria-haspopup="listbox"
    >
      <div className={styles.filterLabel}>{label}</div>
      <div className={styles.filterValue}>{value}</div>
      <i
        className={`ti ti-chevron-down ${styles.dropdownIcon}`}
        aria-hidden="true"
      />
    </div>
  );
};

export default FilterDropdown;
