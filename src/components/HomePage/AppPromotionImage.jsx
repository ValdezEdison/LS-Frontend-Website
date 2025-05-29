import React from "react";
import { AppPromotion as AppPromotionImg } from "../common/Images";

const AppPromotionImage = ({ imageUrl }) => {
  return (
    <div className="app-promotion-image">
      <img
        src={imageUrl}
        alt="App background"
        className="app-promotion-image__background"
      />
    
      <style jsx>{`
        .app-promotion-image {
          display: flex;
          flex-direction: column;
          box-shadow: -32px 64px 32px rgba(255, 255, 255, 0.05);
          position: relative;
          aspect-ratio: 1.592;
          min-width: 240px;
          width: 355px;
          padding: 0 3px;
        }
        .app-promotion-image__background {
          position: absolute;
          inset: 0;
          height: 100%;
          width: 100%;
          object-fit: cover;
          object-position: center;
        }
        .app-promotion-image__screenshot {
          aspect-ratio: 1.56;
          object-fit: contain;
          object-position: center;
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default AppPromotionImage;
