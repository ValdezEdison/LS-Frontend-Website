import React from "react";

const AppStoreButton = () => {
  return (
    <div className="app-store-button">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/397c9bc3662f496da172c59bad413f0dd0020cd15870884c35184deb0cb3e2ed?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
        alt="Download on App Store"
        className="app-store-button__image"
      />
      <style jsx>{`
        .app-store-button__image {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 180px;
        }
      `}</style>
    </div>
  );
};

export default AppStoreButton;
