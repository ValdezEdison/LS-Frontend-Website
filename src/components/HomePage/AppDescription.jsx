import React from "react";

const AppDescription = () => {
  return (
    <div className="app-description">
      <h2 className="app-description__title">
        ¡Descarga tu app de Local Secrets!
      </h2>
      <p className="app-description__subtitle">
        Descarga nuestra app para tener tus Local Secrets siempre a mano. Crea
        itinerarios y guarda tus viajes favoritos.
      </p>
      <style jsx>{`
        .app-description {
          display: flex;
          min-width: 240px;
          flex-direction: column;
          color: #000001;
          justify-content: start;
          width: 419px;
        }
        .app-description__title {
          font: 700 32px/42px Montserrat, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .app-description__subtitle {
          margin-top: 26px;
          font: 400 14px Source Sans Pro, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
      `}</style>
    </div>
  );
};

export default AppDescription;
