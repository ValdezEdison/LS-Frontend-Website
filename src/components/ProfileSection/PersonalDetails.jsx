import React from "react";
import styles from "./PersonalDetails.module.css";

const PersonalDetails = () => {
  const details = [
    { label: "Tipo de perfil", value: "Viajero", action: "Información" },
    { label: "Nombre", value: "Pablo Perez", action: "Editar" },
    {
      label: "Dirección de email",
      value: "pablop@gmail.com",
      action: "Editar",
      verified: true,
    },
    { label: "Número de teléfono", value: "+34 123 456 789", action: "Editar" },
    {
      label: "Fecha de nacimiento",
      value: "Introduce tu fecha de nacimiento",
      action: "Editar",
    },
    {
      label: "Nacionalidad",
      value: "Selecciona el país/región de nacimiento",
      action: "Editar",
    },
    { label: "Dirección", value: "Introduce tu dirección", action: "Editar" },
  ];

  return (
    <div className={styles.personalDetails}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Detalles personales</h2>
          <p className={styles.subtitle}>
            Actualiza tu información personal editando el perfil
          </p>
        </div>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/35c1ae669b6a59673cc682ded7cdd6d74bbdca31?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
          alt="Profile"
          className={styles.profileImage}
        />
      </div>
      {details.map((detail, index) => (
        <React.Fragment key={index}>
          <div className={styles.detailRow}>
            <div className={styles.labelValue}>
              <span className={styles.label}>{detail.label}</span>
              <div className={styles.valueRow}>
                <div className={styles.valueRowTop}>
                  <span className={styles.value}>{detail.value}</span>
                  {detail.verified && (
                    <span className={styles.verifiedBadge}>Verificado</span>
                  )}
                </div>
                <div className={styles.valueRowBottom}>
                  {details[2].verified && (
                    <p className={styles.emailNote}>
                      Esta dirección de email es la que has utilizado para iniciar sesión y
                      a la que se envían todas las notificaciones
                    </p>
                  )}
                </div>
              </div>
             
            </div>
            <button className={styles.actionButton}>{detail.action}</button>
          </div>
          {index < details.length - 1 && <div className={styles.separator} />}
        </React.Fragment>
      ))}
     
    </div>
  );
};

export default PersonalDetails;
