import React from "react";
import { useTranslation } from "react-i18next";

const AppPromotionContent = ({ title, description }) => {

  const { t } = useTranslation("AppPromotionContent");

  return (
    <div className="app-promotion-content">
      <h2 className="app-promotion-content__title">
      {title}
      </h2>
      <p className="app-promotion-content__description"   dangerouslySetInnerHTML={{ __html: description }}>
      {/* {t("description")} */}
      </p>
      <style jsx>{`
        .app-promotion-content {
          display: flex;
          // min-width: 240px;
          flex-direction: column;
          color: #000001;
          justify-content: start;
          width: 100%;
          max-width: 50%;
          padding: 10px;

        }
        .app-promotion-content__title {
          font: 700 32px/42px Montserrat, -apple-system, Roboto, Helvetica,
            sans-serif;
          margin: 0 0 26px 0;
          color:#212D94;
        }
        .app-promotion-content__description {
          font: 400 14px Source Sans Pro, -apple-system, Roboto, Helvetica,
            sans-serif;
          margin: 0;
          color:#212D94;
        }
        @media (max-width: 991px) {
          .app-promotion-content {
            width: 100%;
          }
        }
        @media (max-width: 768px) {
          .app-promotion-content {
            max-width: 100%;
          }
          
        }
      `}</style>
    </div>
  );
};

export default AppPromotionContent;
