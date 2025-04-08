import React, { useState } from "react";
import styles from "./FilterPanel.module.css";

const FilterPanel = ({onClose}) => {
  const [selectedTags, setSelectedTags] = useState([]);

  const toggleTag = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag],
    );
  };

  const renderTagSection = (title, tags, showLess = false) => (
    <div className={styles.categorySection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <button className={styles.toggleLink}>
          {showLess ? "Ver menos" : "Ver más"}
        </button>
      </div>
      <div className={`${styles.tagContainer} ${styles.tagMore}`}>
        {tags.map((tag) => (
          <button
            key={tag}
            className={`${styles.tag} ${selectedTags.includes(tag) ? styles.tagSelected : ""}`}
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.filterPanel}>
        <header className={styles.header}>
          <h1 className={styles.title}>Todos los filtros</h1>
          <button
            className={styles.closeIcon}
            aria-label="Cerrar panel de filtros" onClick={onClose}
          >
            <svg
              width="34"
              height="34"
              viewBox="0 0 34 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.2578 23.763L10.237 11.7422C9.82627 11.3315 9.82627 10.6503 10.237 10.2396C10.6477 9.82887 11.3289 9.82887 11.7396 10.2396L23.7604 22.2604C24.1711 22.6711 24.1711 23.3523 23.7604 23.763C23.3497 24.1737 22.6685 24.1737 22.2578 23.763Z"
                fill="#151820"
              />
              <path
                d="M10.2396 23.763C9.82889 23.3523 9.82889 22.6711 10.2396 22.2604L22.2604 10.2396C22.6711 9.82887 23.3523 9.82887 23.763 10.2396C24.1737 10.6503 24.1737 11.3315 23.763 11.7422L11.7422 23.763C11.3315 24.1737 10.6503 24.1737 10.2396 23.763Z"
                fill="#151820"
              />
            </svg>
          </button>
        </header>
        <div className={styles.filterMain}>
        <form className={styles.filterSection}>
          <div className={styles.inputGroup}>
            <label htmlFor="dateRange" className={styles.label}>
              Fechas de inicio - fechas de fin del evento
            </label>
            <div className={styles.inputWrapper}>
              <svg
                className={styles.inputIcon}
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.66797 4.79297C6.3263 4.79297 6.04297 4.50964 6.04297 4.16797V1.66797C6.04297 1.3263 6.3263 1.04297 6.66797 1.04297C7.00964 1.04297 7.29297 1.3263 7.29297 1.66797V4.16797C7.29297 4.50964 7.00964 4.79297 6.66797 4.79297Z"
                  fill="#828282"
                />
                <path
                  d="M13.332 4.79297C12.9904 4.79297 12.707 4.50964 12.707 4.16797V1.66797C12.707 1.3263 12.9904 1.04297 13.332 1.04297C13.6737 1.04297 13.957 1.3263 13.957 1.66797V4.16797C13.957 4.50964 13.6737 4.79297 13.332 4.79297Z"
                  fill="#828282"
                />
                <path
                  d="M7.08333 12.0839C6.975 12.0839 6.86667 12.0589 6.76667 12.0173C6.65833 11.9756 6.575 11.9172 6.49167 11.8422C6.34167 11.6839 6.25 11.4756 6.25 11.2506C6.25 11.1423 6.275 11.0339 6.31667 10.9339C6.35833 10.8339 6.41667 10.7423 6.49167 10.6589C6.575 10.5839 6.65833 10.5256 6.76667 10.4839C7.06667 10.3589 7.44167 10.4256 7.675 10.6589C7.825 10.8173 7.91667 11.0339 7.91667 11.2506C7.91667 11.3006 7.90833 11.3589 7.9 11.4173C7.89167 11.4673 7.875 11.5173 7.85 11.5673C7.83333 11.6173 7.80833 11.6672 7.775 11.7172C7.75 11.7589 7.70833 11.8006 7.675 11.8422C7.51667 11.9922 7.3 12.0839 7.08333 12.0839Z"
                  fill="#828282"
                />
                <path
                  d="M10.0013 12.0837C9.89297 12.0837 9.78463 12.0587 9.68463 12.0171C9.5763 11.9754 9.49297 11.917 9.40964 11.842C9.25964 11.6837 9.16797 11.4754 9.16797 11.2504C9.16797 11.142 9.19297 11.0337 9.23464 10.9337C9.2763 10.8337 9.33464 10.7421 9.40964 10.6587C9.49297 10.5837 9.5763 10.5254 9.68463 10.4837C9.98463 10.3504 10.3596 10.4254 10.593 10.6587C10.743 10.8171 10.8346 11.0337 10.8346 11.2504C10.8346 11.3004 10.8263 11.3587 10.818 11.4171C10.8096 11.4671 10.793 11.5171 10.768 11.5671C10.7513 11.6171 10.7263 11.667 10.693 11.717C10.668 11.7587 10.6263 11.8004 10.593 11.842C10.4346 11.992 10.218 12.0837 10.0013 12.0837Z"
                  fill="#828282"
                />
                <path
                  d="M12.9154 12.0837C12.807 12.0837 12.6987 12.0587 12.5987 12.0171C12.4904 11.9754 12.407 11.917 12.3237 11.842C12.2904 11.8004 12.257 11.7587 12.2237 11.717C12.1904 11.667 12.1654 11.6171 12.1487 11.5671C12.1237 11.5171 12.107 11.4671 12.0987 11.4171C12.0904 11.3587 12.082 11.3004 12.082 11.2504C12.082 11.0337 12.1737 10.8171 12.3237 10.6587C12.407 10.5837 12.4904 10.5254 12.5987 10.4837C12.907 10.3504 13.2737 10.4254 13.507 10.6587C13.657 10.8171 13.7487 11.0337 13.7487 11.2504C13.7487 11.3004 13.7404 11.3587 13.732 11.4171C13.7237 11.4671 13.707 11.5171 13.682 11.5671C13.6654 11.6171 13.6404 11.667 13.607 11.717C13.582 11.7587 13.5404 11.8004 13.507 11.842C13.3487 11.992 13.132 12.0837 12.9154 12.0837Z"
                  fill="#828282"
                />
                <path
                  d="M7.08333 15C6.975 15 6.86667 14.975 6.76667 14.9333C6.66667 14.8917 6.575 14.8333 6.49167 14.7583C6.34167 14.6 6.25 14.3833 6.25 14.1667C6.25 14.0583 6.275 13.95 6.31667 13.85C6.35833 13.7417 6.41667 13.65 6.49167 13.575C6.8 13.2667 7.36667 13.2667 7.675 13.575C7.825 13.7333 7.91667 13.95 7.91667 14.1667C7.91667 14.3833 7.825 14.6 7.675 14.7583C7.51667 14.9083 7.3 15 7.08333 15Z"
                  fill="#828282"
                />
                <path
                  d="M10.0013 15C9.78464 15 9.56797 14.9083 9.40964 14.7583C9.25964 14.6 9.16797 14.3833 9.16797 14.1667C9.16797 14.0583 9.19297 13.95 9.23464 13.85C9.2763 13.7417 9.33464 13.65 9.40964 13.575C9.71797 13.2667 10.2846 13.2667 10.593 13.575C10.668 13.65 10.7263 13.7417 10.768 13.85C10.8096 13.95 10.8346 14.0583 10.8346 14.1667C10.8346 14.3833 10.743 14.6 10.593 14.7583C10.4346 14.9083 10.218 15 10.0013 15Z"
                  fill="#828282"
                />
                <path
                  d="M12.9154 14.9994C12.6987 14.9994 12.482 14.9078 12.3237 14.7578C12.2487 14.6828 12.1904 14.5911 12.1487 14.4828C12.107 14.3828 12.082 14.2744 12.082 14.1661C12.082 14.0578 12.107 13.9494 12.1487 13.8494C12.1904 13.7411 12.2487 13.6494 12.3237 13.5744C12.5154 13.3828 12.807 13.2911 13.0737 13.3494C13.132 13.3578 13.182 13.3744 13.232 13.3994C13.282 13.4161 13.332 13.4411 13.382 13.4745C13.4237 13.4995 13.4654 13.5411 13.507 13.5744C13.657 13.7328 13.7487 13.9494 13.7487 14.1661C13.7487 14.3828 13.657 14.5994 13.507 14.7578C13.3487 14.9078 13.132 14.9994 12.9154 14.9994Z"
                  fill="#828282"
                />
                <path
                  d="M17.0846 8.19922H2.91797C2.5763 8.19922 2.29297 7.91589 2.29297 7.57422C2.29297 7.23255 2.5763 6.94922 2.91797 6.94922H17.0846C17.4263 6.94922 17.7096 7.23255 17.7096 7.57422C17.7096 7.91589 17.4263 8.19922 17.0846 8.19922Z"
                  fill="#828282"
                />
                <path
                  d="M13.3333 18.9596H6.66667C3.625 18.9596 1.875 17.2096 1.875 14.168V7.08464C1.875 4.04297 3.625 2.29297 6.66667 2.29297H13.3333C16.375 2.29297 18.125 4.04297 18.125 7.08464V14.168C18.125 17.2096 16.375 18.9596 13.3333 18.9596ZM6.66667 3.54297C4.28333 3.54297 3.125 4.7013 3.125 7.08464V14.168C3.125 16.5513 4.28333 17.7096 6.66667 17.7096H13.3333C15.7167 17.7096 16.875 16.5513 16.875 14.168V7.08464C16.875 4.7013 15.7167 3.54297 13.3333 3.54297H6.66667Z"
                  fill="#828282"
                />
              </svg>
              <input
                id="dateRange"
                className={styles.input}
                type="text"
                placeholder="Fecha inicio - fecha fin"
                aria-label="Seleccionar rango de fechas"
              />
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="destination" className={styles.label}>
              Destino
            </label>
            <div className={styles.inputWrapper}>
              <svg
                className={styles.inputIcon}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14V14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
                  fill="#828282"
                />
              </svg>
              <input
                id="destination"
                className={styles.input}
                type="text"
                placeholder="Busca tu destino"
                aria-label="Buscar destino"
              />
            </div>
          </div>
          {renderTagSection(
            "Búsqueda",
            [
              "Arte y cultura",
              "Compras",
              "Gastronomía",
              "Ocio y deporte",
              "Planificador de viajes y excursiones",
              "Servicios profesionales",
              "Vida nocturna",
            ],
            true,
          )}
          <div className={styles.divider} />
          {renderTagSection(
            "Categoría",
            [
              "Conciertos",
              "Espectáculos",
              "Exposiciones",
              "Festivales",
              "Obras de teatro",
            ],
            true,
          )}
          <div className={styles.divider} />
          <div className={styles.categorySection}>
            <h2 className={styles.sectionTitle}>Ordenar por</h2>
            <div className={styles.tagContainer}>
              <button className={`${styles.tag} ${styles.tagSelected}`}>
                Más recientes
              </button>
              <button className={styles.tag}>Más valorados</button>
              <button className={styles.tag}>Nuestra recomendación</button>
            </div>
          </div>
        </form>
        <button className={styles.applyButton}>Aplicar</button>
        </div>
        
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
