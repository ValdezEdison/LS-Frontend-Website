import React from "react";
import AppPromotionContent from "./AppPromotionContent";
import AppPromotionImage from "./AppPromotionImage";
import { QR } from "../common/Images";
const AppPromotion = ({ campaignData }) => {

  return (
    <div className="app-promotion">
      <div className="page-center">
      <div className="app-promotion__container">
        <AppPromotionImage imageUrl={campaignData.image_url}/>
        <AppPromotionContent   title={campaignData.title}
            description={campaignData.description}/>
        {/* <img
          src={QR}
          alt="App QR code"
          className="app-promotion__qr-code"
        /> */}
        </div>
      </div>
      <style jsx="true">{`
        .app-promotion {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 67px 0px 60px;
        }
        .app-promotion__container {
          align-items: center;
          border-radius: 24px;
          border: 2px solid var(--Color-principal-azul, #212d94);
          display: flex;
          width: 100%;
          flex-direction: row;
          overflow: hidden;
          // padding: 42px 50px 0;
          gap: 20px;
          justify-content:space-between;
        }
        .app-promotion__qr-code {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 180px;
        }

      @media screen and (max-width:1400px){
       .app-promotion__container {
          gap: 20px;
          //  padding: 30px 25px 0;
        }
      }

        @media (max-width: 991px) {
          .app-promotion {
            padding: 0;
          }
          .app-promotion__container {
            max-width: 100%;
            // padding: 20px;
          }
        }

        @media (max-width:768px){
        .app-promotion__container {
          flex-direction:column;
          align-items:center;
        }
        }
      `}</style>
    </div>
  );
};

export default AppPromotion;
