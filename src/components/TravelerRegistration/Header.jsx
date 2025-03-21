import React from "react";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <svg
          id="159:6949"
          width="85"
          height="72"
          viewBox="0 0 85 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* SVG path data */}
        </svg>
      </div>
      <div className={styles.helpIcon}>
        <svg
          id="159:6992"
          width="89"
          height="33"
          viewBox="0 0 89 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* SVG path data */}
        </svg>
      </div>
    </header>
  );
};

export default Header;
