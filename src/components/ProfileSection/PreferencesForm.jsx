import React from "react";
import styles from "./PreferencesForm.module.css";

const PreferencesForm = () => {
  return (
    <div className={styles.preferencesForm}>
      <h1 className={styles.title}>Preferencias</h1>
      <p className={styles.description}>
        Cambia tu idioma y haz sugerencias sobre lugares y eventos
      </p>

      <section className={styles.languageSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionHeaderLeft}>
          <h2>Idioma</h2>
          <div className={styles.languageDisplay}>
            <img
              src="path-to-flag"
              alt="Spanish flag"
              className={styles.flagSmall}
            />
            <span>Español</span>
          </div>
          </div>
         
          <a href="#" className={styles.editLink}>
            Editar
          </a>
        </div>
      </section>

      <section className={styles.suggestionsSection}>
        <div className={styles.sectionHeader}>
        <div className={styles.sectionHeaderLeft}>
          <h2>Sugerencias</h2>
          <span>Escribe una sugerencia</span>
        </div>
          
          <a href="#" className={styles.editLink}>
            Editar
          </a>
        </div>
        {/* <p className={styles.disclaimer}>
          Una vez tu sugerencia sea enviada, no se podrá editar ni eliminar.
          Responderemos por email lo más rápido posible.
        </p> */}
        {/* <form className={styles.suggestionForm}>
          <div className={styles.formGroup}>
            <label htmlFor="title" className={styles.label}>
              Título
            </label>
            <input
              type="text"
              id="title"
              value="Más eventos deportivos en Italia"
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Tipo de actividad</label>
            <div className={styles.radioGroup}>
              <label className={styles.radioLabel}>
                <input type="radio" name="activity" checked />
                <span>Evento</span>
              </label>
              <label className={styles.radioLabel}>
                <input type="radio" name="activity" />
                <span>Lugar</span>
              </label>
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="search" className={styles.label}>
              Búsqueda
            </label>
            <select id="search" className={styles.select}>
              <option>Ocio y Deporte</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="category" className={styles.label}>
              Categoría
            </label>
            <select id="category" className={styles.select}>
              <option>Eventos deportivos</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="subcategory" className={styles.label}>
              Subcategoría
            </label>
            <select id="subcategory" className={styles.select}>
              <option>Baloncesto</option>
            </select>
          </div>
          <button type="submit" className={styles.submitButton}>
            Enviar
          </button>
        </form> */}
      </section>

      {/* <section className={styles.contactSection}>
        <h3 className={styles.contactTitle}>¿Tienes alguna duda?</h3>
        <p className={styles.contactInfo}>
          Puedes ponerte en contacto con nosotros enviando un email a
          nombre@gmail.com o llamando a +34 123 456 789
        </p>
      </section> */}
    </div>
  );
};

export default PreferencesForm;
