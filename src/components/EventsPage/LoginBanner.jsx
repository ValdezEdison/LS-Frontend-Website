import React from "react";
import styles from "./LoginBanner.module.css";

const LoginBanner = () => {
  return (
    <div className={styles.loginBanner}>
      <div className={styles.bannerContent}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/7d61f14401c563d0401899176439ecba6e0129e9?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
          alt=""
          className={styles.bannerIcon}
        />
        <p className={styles.bannerText}>
          Inicia sesión y empieza a organizar tu próxima aventura
        </p>
      </div>
      <button className={styles.loginButton}>Iniciar sesión</button>
    </div>
  );
};

export default LoginBanner;
