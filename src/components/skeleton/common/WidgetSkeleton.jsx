import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../../HomePage/PlacesSection.module.css";

export const WidgetSkeleton = () => {
  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3, arrows: false } },
      { breakpoint: 1024, settings: { slidesToShow: 2, arrows: false } },
      { breakpoint: 768, settings: { slidesToShow: 1, arrows: false } },
    ],
  };

  return (
    <section className={styles.placesSection}>
      <div className="page-center">
        <Skeleton width={170} height={30} className={styles.sectionTitle} />
        <div className={styles.sectionHeader}>
          <Skeleton width={300} height={20} className={styles.sectionSubtitle} />
          <Skeleton width={50} height={15} className={styles.seeMoreLink} />
        </div>
        <hr className={styles.divider} />

        <div className={styles.carouselSkeletonWrapper}>
          <Skeleton width={40} height={40} className={`${styles.carouselNav} ${styles.leftNav}`} color={"red"} />
          <Slider {...carouselSettings} className={styles.carousel}>
            {[...Array(4)].map((_, i) => (
              <div key={i} className={styles.placeCard}>
                <Skeleton width={"100%"} height={120} className={styles.placeImage} />
                <Skeleton width={"80%"} height={20} className={styles.placeName} />
              </div>
            ))}
          </Slider>
          <Skeleton width={40} height={40} className={`${styles.carouselNav} ${styles.rightNav}`} />
        </div>
      </div>
    </section>
  );
};
