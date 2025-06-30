import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PlaceHolderImg2 } from "./Images";
import styles from "../HomePage/PlacesSection.module.css";
import { useTranslation, Trans } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios"; // Swap out for ApiService if preferred

const CommonSection = ({ title, subtitle, seeMoreLink, items, renderItem, isCarousel }) => {
  const { t } = useTranslation("Common");
  const { t: tPlaces } = useTranslation("Places");
  const dispatch = useDispatch();

  const { currentLocation, loading: currentLocationLoading } = useSelector((state) => state.locationSettings);
  const trackingEnabled = currentLocation?.preferences?.geolocation_enabled;
  const isManuallySelected = currentLocation?.preferences?.location_mode === "manual";
  const isCurrentLocationSelected = currentLocation?.preferences?.location_mode === "current";
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { cities } = useSelector((state) => state.cities);

  const [selectedCityBasedOnLocation, setSelectedCityBasedOnLocation] = useState(null);
  const [toggleLoading, setToggleLoading] = useState(false);
  const [toggleError, setToggleError] = useState(null);

  useEffect(() => {
    if (isManuallySelected && trackingEnabled && isAuthenticated) {
      const selectedCity = cities.find(
        (city) =>
          city.latitude === currentLocation.preferences?.last_known_latitude &&
          city.longitude === currentLocation.preferences?.last_known_longitude
      );
      if (selectedCity) {
        setSelectedCityBasedOnLocation(selectedCity.name);
      }
    }
  }, [currentLocation, trackingEnabled, isAuthenticated, cities, isManuallySelected]);

  const carouselSettings = {
    dots: false,
    infinite: items.length > 4,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: items.length > 4,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  // --- Direct geolocation toggle handler
  const handleToggleGeolocation = async () => {
    setToggleLoading(true);
    setToggleError(null);
    try {
      await axios.post("/users/location-toggle", {
        geolocation_enabled: !trackingEnabled,
      });
      // If you have a Redux action to update location, call it here:
      // dispatch(fetchCurrentLocationSettings());
      window.location.reload(); // fallback if Redux action/thunk does not exist
    } catch (e) {
      setToggleError(t("toggleGeoError") || "Failed to update location tracking.");
    } finally {
      setToggleLoading(false);
    }
  };

  // --- No Results Helper ---
  const NoResults = () => (
    <div className="no-results-wrapper">
      {currentLocation && trackingEnabled ? (
        isManuallySelected ? (
          <Trans
            i18nKey="Places:noResultsBasedOnManualLocation"
            values={{ city: selectedCityBasedOnLocation }}
            components={{
              changeLocation: <Link to="/profile/location" className="text-link" />,
              disableLocation: (
                <button
                  onClick={handleToggleGeolocation}
                  className={styles.promotionDescription}
                  aria-label={t("disableLocation")}
                  disabled={toggleLoading}
                >
                  {toggleLoading ? t("deactivating...") : t("disableLocation")}
                </button>
              ),
            }}
          />
        ) : isCurrentLocationSelected ? (
          <Trans
            i18nKey="Places:noResultsBasedOnCurrentLocation"
            components={{
              changeLocation: <Link to="/profile/location" className="text-link" />,
              disableLocation: (
                <button
                  onClick={handleToggleGeolocation}
                  className={styles.promotionDescription}
                  aria-label={t("disableLocation")}
                  disabled={toggleLoading}
                >
                  {toggleLoading ? t("deactivating...") : t("disableLocation")}
                </button>
              ),
            }}
          />
        ) : (
          t("noResult")
        )
      ) : (
        t("noResult")
      )}
      {toggleError && <div style={{ color: "red", marginTop: 5 }}>{toggleError}</div>}
    </div>
  );

  return (
    <section className={styles.placesSection}>
      <div className="page-center">
        <h2 className={styles.sectionTitle}>{title}</h2>
        <div className={styles.sectionHeader}>
          <p className={styles.sectionSubtitle}>{subtitle}</p>
          {items.length > 4 && (
            <a onClick={() => seeMoreLink()} className={styles.seeMoreLink}>
              {t("seeMore")}
            </a>
          )}
        </div>
        <hr className={styles.divider} />
        {items.length === 0 ? (
          <NoResults />
        ) : isCarousel ? (
          <Slider {...carouselSettings} className={styles.carousel}>
            {items.map((item) => renderItem(item))}
          </Slider>
        ) : (
          <div className={styles.placesList}>{items.map((item) => renderItem(item))}</div>
        )}
      </div>
    </section>
  );
};

export default CommonSection;