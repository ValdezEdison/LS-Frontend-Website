import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PlaceHolderImg2 } from "./Images";
import styles from "../HomePage/PlacesSection.module.css";
import { useTranslation, Trans } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

const CommonSection = ({ title, subtitle, seeMoreLink, items, renderItem, isCarousel }) => {
    
    const { t } = useTranslation("Common");
    const { t: tPlaces } = useTranslation("Places");

      const { currentLocation, loading: currentLocationLoading } = useSelector((state) => state.locationSettings);
      const trackingEnabled = currentLocation?.preferences?.geolocation_enabled;
      const isManuallySelected = currentLocation?.preferences?.location_mode === "manual";
      const isCurrentLocationSelected = currentLocation?.preferences?.location_mode === "current";
      const { isAuthenticated } = useSelector((state) => state.auth);
      const { cities, loading: citiesLoading } = useSelector((state) => state.cities);
    
      const [selectedCityBasedOnLocation, setSelectedCityBasedOnLocation] = useState(null);

        useEffect(() => {
      
          if(isManuallySelected && trackingEnabled && isAuthenticated) {
            const selectedCity = cities.find(
              (city) => city.latitude === currentLocation.preferences?.last_known_latitude &&
                city.longitude === currentLocation.preferences?.last_known_longitude
            )
      
            if (selectedCity) {
              setSelectedCityBasedOnLocation(selectedCity.name);
            }
          }
          
        }, [currentLocation, trackingEnabled]);


    const carouselSettings = {
        dots: false,
        infinite: items.length > 4,
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
                    {items.length > 4 &&
                    <a onClick={() => seeMoreLink()} className={styles.seeMoreLink}>
                        {t("seeMore")}
                    </a>
                    }
                </div>
                <hr className={styles.divider} />
                {items.length === 0 ? (
                    currentLocation && trackingEnabled ? (
                        isManuallySelected ? (
                            <div className="no-results-wrapper">   
                             <Trans i18nKey="Places:noResultsBasedOnManualLocation"
                                values={{ city: selectedCityBasedOnLocation }}
                                components={{
                                    changeLocation: <Link to="/profile/location" className="text-link" />,
                                    disableLocation: <Link to="/profile/location" className="text-link" />
                                }}
                            /></div>
                        ) : isCurrentLocationSelected ? (
                            <div className="no-results-wrapper">
                                <Trans i18nKey="Places:noResultsBasedOnCurrentLocation"
                                components={{
                                    changeLocation: <Link to="/profile/location" className="text-link" />,
                                    disableLocation: <Link to="/profile/location" className="text-link" />
                                }}
                            /></div>
                        ) : (
                            <div className="no-results-wrapper">{t('noResult')}</div>
                        )
                    ) : (
                        <div className="no-results-wrapper">{t('noResult')}</div>
                    )
                ) :
                    (isCarousel ? (
                        <Slider {...carouselSettings} className={styles.carousel}>
                            {items.map((item) => renderItem(item))}
                        </Slider>
                    ) : (
                        <div className={styles.placesList}>
                            {items.map((item) => renderItem(item))}
                        </div>
                    )
                    )}
              
            </div>
        </section>
    );
};

export default CommonSection;