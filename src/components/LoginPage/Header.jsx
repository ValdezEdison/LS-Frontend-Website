import React from "react";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/f3b32c2b8998cb87f3022dd6929cd601c3eecf28?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
        alt="Company logo"
        className={styles.logo}
      />
      <div className={styles.iconContainer}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/c7e8530953a972e815c1d4215835261b808cf875?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
          alt="User profile"
          className={styles.icon}
        />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/0f2b7313676b8aa46a1253a72edeac25273a7205?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
          alt="Settings"
          className={styles.icon}
        />
      </div>
    </header>
  );
};

export default Header;
