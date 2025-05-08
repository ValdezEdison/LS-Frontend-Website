import React, { useState } from "react";
import styles from "./PreferencesForm.module.css";
import FilterBar from "../common/FilterBar";

const PreferencesForm = ({ user, categories, filters }) => {
  const [editingField, setEditingField] = useState(null);
  const [formData, setFormData] = useState({
    language: user.language || "es",
    title: "",
    activity: "event",
    search: "",
    category: "",
    subcategory: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditClick = (field) => {
    setEditingField(field);
  };

  const handleSave = (e) => {
    if (e) e.preventDefault();
    console.log("Form data saved:", formData);
    setEditingField(null);
  };

  const handleCancel = () => {
    setEditingField(null);
  };

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
            {editingField === 'language' ? (
              <div className={styles.radioGroup}>
                {/* <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="language"
                    value="es"
                    checked={formData.language === "es"}
                    onChange={handleInputChange}
                  />
                  <img 
                    src="https://flagcdn.com/w20/es.png" 
                    alt="Español" 
                    className={styles.flagSmall} 
                  />
                  <span>Español</span>
                </label> */}
                <label className={styles.languageRadioContainer + " radioContainer"}>
                  <input
                    type="radio"
                    name="language"
                    value="es"
                    checked={formData.language === "es"}
                    onChange={handleInputChange}
                  />
                  <span className="checkmark"></span>
                  <img 
                    src="https://flagcdn.com/w20/es.png" 
                    alt="Español" 
                    className={styles.flagSmall} 
                  />
                  <span>Español</span>
                </label>
                {/* <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="language"
                    value="en"
                    checked={formData.language === "en"}
                    onChange={handleInputChange}
                  />
                  <img 
                    src="https://flagcdn.com/w20/gb.png" 
                    alt="English" 
                    className={styles.flagSmall} 
                  />
                  <span>English</span>
                </label> */}
                 <label className={styles.languageRadioContainer + " radioContainer"}>
                  <input
                    type="radio"
                    name="language"
                    value="en"
                    checked={formData.language === "en"}
                    onChange={handleInputChange}
                  />
                  <span className="checkmark"></span>
                  <img 
                    src="https://flagcdn.com/w20/gb.png" 
                    alt="English" 
                    className={styles.flagSmall} 
                  />
                  <span>English</span>
                </label>
              </div>
            ) : (
              <div className={styles.languageDisplay}>
                <img
                  src={formData.language === "es" 
                    ? "https://flagcdn.com/w20/es.png" 
                    : "https://flagcdn.com/w20/gb.png"}
                  alt="Flag"
                  className={styles.flagSmall}
                />
                <span>{formData.language === "es" ? "Español" : "English"}</span>
              </div>
            )}
          </div>
          {editingField === 'language' ? (
            <div className={styles.editActions}>
              <a href="#" className={styles.editLink} onClick={handleCancel}>
                Cancelar
              </a>
              {/* <a href="#" className={styles.editLink} onClick={handleSave}>
                Guardar
              </a> */}
            </div>
          ) : (
            <a href="#" className={styles.editLink} onClick={() => handleEditClick('language')}>
              Editar
            </a>
          )}
        </div>
        <div className={styles.saveButtonWrapper}>
                      <button 
                        className={styles.saveButton}
                        onClick={handleSave}
                      >
                        Guardar
                      </button>
                    </div>
      </section>

      <section className={styles.suggestionsSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionHeaderLeft}>
            <h2>Sugerencias</h2>
            <span className={styles.suggestionsText}>Escribe una sugerencia</span>
          </div>
          {editingField === 'suggestion' ? (
            <div className={styles.editActions}>
              <a href="#" className={styles.editLink} onClick={handleCancel}>
                Cancelar
              </a>
            
            </div>
          ) : (
            <a href="#" className={styles.editLink} onClick={() => handleEditClick('suggestion')}>
              Editar
            </a>
          )}
        </div>
        
        <p className={styles.disclaimer}>
          Una vez tu sugerencia sea enviada, no se podrá editar ni eliminar.
          Responderemos por email lo más rápido posible.
        </p>
        {editingField === 'suggestion' &&(
        <form className={styles.suggestionForm} onSubmit={handleSave}>
          <div className={styles.formGroup}>
            <label htmlFor="title" className={styles.label}>
              Título
            </label>
            {editingField === 'suggestion' ? (
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={styles.editInput}
                placeholder="Escribe un título"
                required
              />
            ) : (
              <div className={styles.fieldValue}>
                {formData.title || "No se ha escrito un título"}
              </div>
            )}
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>Tipo de actividad</label>
            {editingField === 'suggestion' ? (
              <div className={styles.radioGroup}>
                {/* <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="activity"
                    value="event"
                    checked={formData.activity === "event"}
                    onChange={handleInputChange}
                  />
                  <span>Evento</span>
                </label> */}
                 <label className={styles.languageRadioContainer + " radioContainer"}>
                  <input
                    type="radio"
                    name="activity"
                    value="event"
                    checked={formData.activity === "event"}
                    onChange={handleInputChange}
                  />
                  <span className="checkmark"></span>
                  <span>Evento</span>
                </label>
                {/* <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="activity"
                    value="place"
                    checked={formData.activity === "place"}
                    onChange={handleInputChange}
                  />
                  <span>Lugar</span>
                </label> */}
                <label className={styles.languageRadioContainer + " radioContainer"}>
                  <input
                    type="radio"
                    name="activity"
                    value="place"
                    checked={formData.activity === "place"}
                    onChange={handleInputChange}
                  />
                  <span className="checkmark"></span>
                  <span>Lugar</span>
                </label>
              </div>
            ) : (
              <div className={styles.fieldValue}>
                {formData.activity === "event" ? "Evento" : "Lugar"}
              </div>
            )}
          </div>
          
          {editingField === 'suggestion' && <FilterBar filters={filters} />}

          <button type="submit" className={`${styles.submitButton} ${styles.active}`}>
            Enviar
          </button>
        </form>
) 
  
}
      </section>
      {editingField === 'suggestion' && (
        <section className={styles.contactSection}>
        <h3 className={styles.contactTitle}>¿Tienes alguna duda?</h3>
        <p className={styles.contactInfo}>
          Puedes ponerte en contacto con nosotros enviando un email a
          nombre@gmail.com o llamando a +34 123 456 789
        </p>
      </section>
      )}

   
    </div>
  );
};

export default PreferencesForm;