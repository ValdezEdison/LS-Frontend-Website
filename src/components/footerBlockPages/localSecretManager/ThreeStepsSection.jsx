"use client";
import React from "react";
import styles from "./ThreeStepsSection.module.css";

function ThreeStepsSection() {
  return (
    <section className={styles.stepsSection}>
      <div className={styles.iconsContainer}>
        <div className={styles.iconWrapper}>
          <div className={styles.iconBox}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/78a9d86ed056133b8ec86e645a85b9bc2e9f67cf?placeholderIfAbsent=true"
              alt="Step 1 Icon"
              className={styles.stepIcon}
            />
            <div className={styles.verticalLine} />
          </div>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/04d4996a9e15f0f57336988426049cf187a6c153?placeholderIfAbsent=true"
            alt="Arrow"
            className={styles.arrowIcon}
          />
          <div className={styles.iconBox}>
            <div className={styles.verticalLine} />
            <img
              src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/98d65d63a5ca7536b4f312423addf266f11314be?placeholderIfAbsent=true"
              alt="Step 3 Icon"
              className={styles.stepIcon}
            />
          </div>
        </div>
      </div>
      <div className={styles.stepsContent}>
        <h2 className={styles.mainTitle}>TRES SIMPLES PASOS</h2>
        <div className={styles.stepsContainer}>
          <div className={styles.stepsWrapper}>
            <div className={styles.stepBlock}>
              <h3 className={styles.stepTitle}>GESTIONA</h3>
              <h4 className={styles.stepSubtitle}>
                Crea y gestiona tus anuncios
              </h4>
              <p className={styles.stepDescription}>
                Introduce la información necesaria para crear un anuncio de tu
                local secret o evento. Recuerda que puedes gestionar tu
                establecimiento desde cualquier lugar.
              </p>
            </div>
            <div className={styles.stepBlock}>
              <h3 className={styles.stepTitle}>CONECTA</h3>
              <h4 className={styles.stepSubtitle}>Responde a opiniones</h4>
              <p className={styles.stepDescription}>
                Descubre qué dicen tus clientes sobre tu establecimiento y
                responde a sus comentarios en cualquier momento.
              </p>
            </div>
          </div>
          <div className={styles.stepBlock}>
            <h3 className={styles.stepTitle}>CRECE</h3>
            <h4 className={styles.stepSubtitle}>
              Publica tu establecimiento o evento
            </h4>
            <p className={styles.stepDescription}>
              Finalmente, cuando la validación del anuncio haya sido completada,
              será publicado en la web y app de Local Secrets. Recuerda que
              siempre puedes editar tus anuncios desde tu perfil.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ThreeStepsSection;
