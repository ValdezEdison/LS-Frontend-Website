import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import config from "../../config";
import { PlaceHolderImg4 } from "./Images";
import styles from "./PromotionalBanner.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PromotionalBanner = ({ bannerBlocks, bannerLoading }) => {
  // Get current date in ISO format (YYYY-MM-DD)
  const currentDate = new Date().toISOString();

  // Filter banners based on active status, position, and date range
  const filteredBanners = bannerBlocks.filter(banner => {
    return (
      banner.is_active === true &&
      banner.position === "floating" &&
      currentDate >= banner.start_date &&
      currentDate <= banner.end_date
    );
  });
  // Slider settings configuration
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 8000,
    fade: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: dots => (
      <div style={{ position: "absolute", bottom: "-30px", width: "100%" }}>
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
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



  if (bannerLoading) {
    return (
      <div className={styles.promotionalBannerIn}>
        <div className={styles.promotionalBanner}>
          <Slider {...settings}>
            {[...Array(3)].map((_, index) => (
              <div key={index}>
                <div className={styles.promotionalBannerItem}>
                  <Skeleton 
                  height={250} 
                  containerClassName={styles.promotionalImage}
                    style={{borderRadius: "24px"}}
                  />
                  <div className={styles.promotionalContent}>
                    <Skeleton width={200} height={30} className={styles.promotionalTitle} />
                    <Skeleton height={20} width={400} count={3} className={styles.promotionalText} />
                    <Skeleton width={120} height={40} className={'styles.exploreButton'} />
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    );
  }



  return (
    <div className={styles.promotionalBannerIn}>
      <div className={styles.promotionalBanner}>
        <Slider {...settings}>
          {filteredBanners?.map((slide, index) => (
            <div key={index}>
              <div className={styles.promotionalBannerItem}>
                <img
                  src={slide.background_image?.url ? `${config.api.cmsBaseUrl}${slide.background_image.url}` : PlaceHolderImg4}
                  alt="Discover Japan"
                  className={styles.promotionalImage}
                  onError={(e) => {
                    e.currentTarget.src = PlaceHolderImg4;
                    e.currentTarget.alt = partner.name || "Partner logo";
                  }}
                />
                <div className={styles.promotionalContent}>
                  <h2 className={styles.promotionalTitle}>{slide.header}</h2>
                  <p
                    className={styles.promotionalText}
                    dangerouslySetInnerHTML={{ __html: slide.description }}
                  />
                  <button className={styles.exploreButton} onClick={() => window.location.href = slide?.cta_link} formTarget="_blank">{slide.button_text}</button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default PromotionalBanner;