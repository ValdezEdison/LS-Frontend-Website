import React from "react";

const AppDownloadImage = () => {
  return (
    <div className="app-download-image">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/e23ccfee9276912998fcbf8602c13063250991f23bb23b62931709f26e2b4abd?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
        alt="App download background"
        className="app-download-image__background"
      />
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/f49252382528e5cf5ebca27ad28ecea4075558a361c4e71debeb9725a50ed4e4?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
        alt="App download preview"
        className="app-download-image__preview"
      />
      <style jsx>{`
        .app-download-image {
          display: flex;
          flex-direction: column;
          box-shadow: -32px 64px 32px rgba(255, 255, 255, 0.05);
          position: relative;
          aspect-ratio: 1.592;
          min-width: 240px;
          width: 355px;
          padding: 0 3px;
        }
        .app-download-image__background {
          position: absolute;
          inset: 0;
          height: 100%;
          width: 100%;
          object-fit: cover;
          object-position: center;
        }
        .app-download-image__preview {
          aspect-ratio: 1.56;
          object-fit: contain;
          object-position: center;
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default AppDownloadImage;
