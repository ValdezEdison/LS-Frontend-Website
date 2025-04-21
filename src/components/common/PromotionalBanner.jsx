import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import config from "../../config";
import { PlaceHolderImg4 } from "./Images";

const PromotionalBanner = ({ styles, bannerBlocks }) => {
  console.log(bannerBlocks, 'banners')
  // Slider settings configuration
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };



  return (
    <div className={styles.promotionalBanner}>
      <Slider {...settings}>
        {bannerBlocks.map((slide, index) => (
          <div key={index}>
            <img
              src={slide.background_image?.url ? `${config.api.cmsBaseUrl}${slide.background_image.url}` : PlaceHolderImg4}
              alt="Discover Japan"
              className={styles.promotionalImage}
            />
            <div className={styles.promotionalContent}>
              <h2 className={styles.promotionalTitle}>{slide.name}</h2>
              <p className={styles.promotionalText}>
                {slide.description}
              </p>
              <button className={styles.exploreButton}>{slide.button_text}</button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PromotionalBanner;