import React from "react";
import styles from "./ContactForm.module.css";

function ContactForm() {
  return (
    <form className={styles.form}>
      <div className={styles.fields}>
        <div className={styles.field}>
          <input
            type="text"
            placeholder="Nombre*"
            className={styles.input}
            required
          />
        </div>
        <div className={styles.field}>
          <input
            type="text"
            placeholder="Apellido*"
            className={styles.input}
            required
          />
        </div>
        <div className={styles.field}>
          <input
            type="text"
            placeholder="Perfil de LinkedIn*"
            className={styles.input}
            required
          />
        </div>
        <div className={styles.field}>
          <input
            type="email"
            placeholder="Correo electrónico*"
            className={styles.input}
            required
          />
        </div>
        <div className={styles.field}>
          <textarea
            placeholder="Mensaje*"
            className={styles.textarea}
            required
          ></textarea>
        </div>
      </div>
      <p className={styles.disclaimer}>
        No facilites ningún dato personal o sensible en esta casilla
      </p>
      <p className={styles.privacy}>
        Al hacer clic en "Enviar" confirmas que has leído nuestra{" "}
        <a href="#" className={styles.privacyLink}>
          Política de privacidad
        </a>
        . Si no deseas recibir nuestros correos electrónicos sobre servicios
        similares, escríbenos a nombre@gmail.com
      </p>
      <button type="submit" className={styles.submitButton}>
        Enviar
      </button>
    </form>
  );
}

export default ContactForm;
