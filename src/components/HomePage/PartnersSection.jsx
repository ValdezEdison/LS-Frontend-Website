import React from "react";
import styles from "./PartnersSection.module.css";
import { useTranslation } from "react-i18next";
import config from "../../config";
import { PlaceHolderImg1 } from "../common/Images";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PartnersSection = ({ ourPartners, ourPartnersLoading }) => {
  const { t } = useTranslation("PartnersSection");



  if (true) {
    return (
      <section className={styles.partnersSection}>
        <div className={styles.sectionTitle}>
          <Skeleton width={200} height={30} />
        </div>
        <div className={styles.partnersSlider}>
          <Slider
            arrow= {true}
            infinite={false}
            slidesToShow={5}
            responsive={[
              {
                breakpoint: 1024,
                settings: { slidesToShow: 3 }
              },
              {
                breakpoint: 991,
                settings: { slidesToShow: 2 }
              },
              {
                breakpoint: 480,
                settings: { slidesToShow: 1 }
              }
            ]}
          >
            {[...Array(6)].map((_, index) => (
              <div key={index} className={styles.partnerLogo}>
                <Skeleton 
                  height={100} 
                  width={150} 
                  containerClassName={styles.logoImage}
                />
              </div>
            ))}
          </Slider>
        </div>
      </section>
    );
  }

  
  // Return null if no partners data or empty array
  if (!ourPartners || !Array.isArray(ourPartners)) {
    return null;
  }

  // Find the first active partner group
  const activePartnerGroup = ourPartners.find(group => group?.is_active);

  // Return null if no active group found
  if (!activePartnerGroup || !activePartnerGroup.partner_items?.length) {
    return null;
  }

  // Get all partners from the active group (without individual active checks)
  const partners = activePartnerGroup.partner_items;

  // Slider settings
  const settings = {
    arrow: true,
    infinite: partners.length > 4,
    speed: 500,
    slidesToShow: activePartnerGroup.items_per_row,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(3, partners.length),
          infinite: partners.length > 3
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: Math.min(2, partners.length),
          infinite: partners.length > 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          infinite: partners.length > 1
        }
      }
    ]
  };

  return (
    <section 
      className={styles.partnersSection}
      style={{ backgroundColor: activePartnerGroup.background_color || '#FFFFFF' }}
    >
      <h2 className={styles.sectionTitle}>{activePartnerGroup.name || t("title")}</h2>
      
      <div className={styles.partnersSlider}>
        <Slider {...settings}>
          {partners.map((partner) => (
            <div key={partner.id} className={styles.partnerLogo}>
              {partner.logo?.url ? (
                <img
                src={partner.logo?.url ? config.api.cmsBaseUrl + partner.logo.url : PlaceHolderImg1}
                  alt={partner.logo.alt || partner.name}
                  width={partner.logo.width}
                  height={partner.logo.height}
                  className={styles.logoImage}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = PlaceHolderImg1;
                    e.currentTarget.alt = partner.name || "Partner logo";
                  }}
                />
              ) : (
                <img
                  src={PlaceHolderImg1}
                  alt={partner.name || "Partner logo"}
                  className={styles.logoImage}
                  loading="lazy"
                />
              )}
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default PartnersSection;