import React from "react";
import { useTranslation } from "react-i18next";

const AppPromotionContent = () => {

  const { t } = useTranslation("AppPromotionContent");

  return (
    <div className="app-promotion-content">
      <h2 className="app-promotion-content__title">
        {t("title")}
      </h2>
      <p className="app-promotion-content__description">
      {t("description")}
      </p>
      <style jsx>{`
        .app-promotion-content {
          display: flex;
          min-width: 240px;
          flex-direction: column;
          color: #000001;
          justify-content: start;
          width: 419px;
        }
        .app-promotion-content__title {
          font: 700 32px/42px Montserrat, -apple-system, Roboto, Helvetica,
            sans-serif;
          margin: 0 0 26px 0;
        }
        .app-promotion-content__description {
          font: 400 14px Source Sans Pro, -apple-system, Roboto, Helvetica,
            sans-serif;
          margin: 0;
        }
        @media (max-width: 991px) {
          .app-promotion-content {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default AppPromotionContent;
