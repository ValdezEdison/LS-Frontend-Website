import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PlaceHolderImg2 } from "./Images";
import styles from "../HomePage/PlacesSection.module.css";
import { useTranslation } from "react-i18next";

const CommonSection = ({ title, subtitle, seeMoreLink, items, renderItem, isCarousel }) => {
    
    const { t } = useTranslation("Common");
console.log(items);
    const carouselSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4, // Default for desktop
        slidesToScroll: 1,
        arrows: items.length > 4,
        responsive: [
            {
                breakpoint: 1024, // Tablets
                settings: { slidesToShow: 2 }
            },
            {
                breakpoint: 768, // Mobile
                settings: { slidesToShow: 1 }
            },
        ],
    };

    return (
        <section className={styles.placesSection}>
            <div className="page-center">
                <h2 className={styles.sectionTitle}>{title}</h2>
                <div className={styles.sectionHeader}>
                    <p className={styles.sectionSubtitle}>{subtitle}</p>
                    <a onClick={() => seeMoreLink()} className={styles.seeMoreLink}>
                        {t("seeMore")}
                    </a>
                </div>
                <hr className={styles.divider} />

                {isCarousel ? (
                    <Slider {...carouselSettings} className={styles.carousel}>
                        {items.map((item) => renderItem(item))}
                    </Slider>
                ) : (
                    <div className={styles.placesList}>
                        {items.map((item) => renderItem(item))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default CommonSection;