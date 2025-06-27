import React from "react";
import { useTranslation } from "react-i18next";
import { Banner, PlaceHolderImg1 } from "../common/Images";
import { useSelector } from "react-redux";
import config from "../../config";

const HeroSection = ({ handleNavigateToLogin, heroContent }) => {
  const { t } = useTranslation("HeroSection");

  const { images, loading: imagesLoading, error: imagesError } = useSelector((state) => state.images);
  const { isAuthenticated } = useSelector((state) => state.auth);


  // Fallback values in case heroContent is not loaded yet
  const title = heroContent?.title || "Viaja. Conéctate. Descubre.";
  const subtitle = heroContent?.description
    ? heroContent.description.replace(/<[^>]+>/g, '') // Remove HTML tags
    : "Descubre los secretos locales de las ciudades más fascinantes del mundo.";

    // const backgroundImage = heroContent?.background_image_url || images?.[0]?.original || Banner || PlaceHolderImg1;
    const backgroundImage = heroContent?.background_image_url
  ? `${heroContent.background_image_url}`
  : images?.[0]?.original || Banner || PlaceHolderImg1;


  return (
    <section className="hero-section">
      <img
        src={backgroundImage}
        alt="Vibrant cityscape showcasing local attractions"
        className="hero-image"
      />
      <div className="hero-content">
        <h1 className="hero-title" style={{ color: heroContent?.text_color || "#fff" }}>
          {title}
        </h1>
        <p className="hero-subtitle" style={{ color: heroContent?.text_color || "#fff" }}>
          {subtitle}
        </p>
        {!isAuthenticated && (
          <button className="cta-button" onClick={handleNavigateToLogin}>
            {heroContent?.cta_text || "Iniciar sesión"}
          </button>
        )}
      </div>
      <style jsx="true">{`
        .hero-section {
          position: relative;
          min-height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: #010101;
          padding: 2rem;
        }
        .hero-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: -1;
        }
        .hero-content {
          max-width: 659px;
          width: 100%;
          // background-color: rgba(255, 255, 255, 0.8);
          color:#fff;
          // padding: 2rem;
          border-radius: 12px;
        }
        .hero-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
        }
        .hero-subtitle {
          font-size: 1.25rem;
          margin-bottom: 1.5rem;
        }
        .cta-button {
          background-color: #f4c031;
          color: #000000;
          font-size: 1rem;
          font-weight: 600;
          padding: 0.625rem 1rem;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .cta-button:hover {
          background-color: #e5b22e;
        }
        @media (max-width: 768px) {
          .hero-content {
            padding: 1.5rem;
          }
          .hero-title {
            font-size: 1.75rem;
          }
          .hero-subtitle {
            font-size: 1rem;
          }

          .hero-section {
            min-height:295px;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
