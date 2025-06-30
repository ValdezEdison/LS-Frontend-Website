import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation, Trans } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import styles from "../HomePage/PlacesSection.module.css";
import { Link } from "react-router-dom";
import Loader from "../common/Loader"; // Update path if needed
import { toggleUserLocation, fetchLocationSettings } from "../../features/location/LocationAction"; // Update path accordingly
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import TripCardSkeleton from "../skeleton/common/TripCardSkeleton";
import EventCardSkeleton from "../skeleton/PlacesPage/PlacesInfo/events/EventCardSkeleton";
import { WidgetSkeleton } from "../skeleton/common/WidgetSkeleton";

const ToggleSwitch = ({ checked, onChange, loading, label }) => (
  <label className={styles.switch} style={{alignItems: "center"}}>
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      disabled={loading}
      aria-label={label}
      style={{ display: "none" }}
    />
    <span className={styles.slider}></span>
    <span className={styles.toggleLabel} style={{marginLeft: 8}}>{label}</span>
    {loading && <span style={{marginLeft: 8}}><Loader /></span>}
  </label>
);

const CommonSection = ({ title, subtitle, seeMoreLink, items, renderItem, isCarousel }) => {
  const { t } = useTranslation("Common");
  const { currentLocation } = useSelector((state) => state.locationSettings);
  const trackingEnabled = !!currentLocation?.preferences?.geolocation_enabled;
  const isManuallySelected = currentLocation?.preferences?.location_mode === "manual";
  const isCurrentLocationSelected = currentLocation?.preferences?.location_mode === "current";
  const dispatch = useDispatch();
  const [toggleLoading, setToggleLoading] = useState(false);
  const [toggleError, setToggleError] = useState();

  // Use your Redux-backed toggle
  const handleToggleGeolocation = async () => {
    setToggleLoading(true);
    setToggleError(null);
    try {
      const res = await dispatch(toggleUserLocation({ geolocation_enabled: !trackingEnabled }));
      if (toggleUserLocation.fulfilled.match(res)) {
        await dispatch(fetchLocationSettings()); // refresh settings with thunk
      } else {
        setToggleError(
          res.error?.message || t("toggleGeoError", "Failed to update location tracking.")
        );
      }
    } catch (e) {
      setToggleError(
        e?.response?.data?.detail ||
        t("toggleGeoError", "Failed to update location tracking.")
      );
    } finally {
      setToggleLoading(false);
    }
  };

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

  const NoResults = () => (
    <div className="no-results-wrapper">
      {(currentLocation && trackingEnabled) ? (
        (isManuallySelected || isCurrentLocationSelected) ? (
          <Trans
            i18nKey={
              isManuallySelected
                ? "Places:noResultsBasedOnManualLocation"
                : "Places:noResultsBasedOnCurrentLocation"
            }
            components={{
              changeLocation: <Link to="/profile/location" className="text-link" />,
              disableLocation: (
                <ToggleSwitch
                  checked={!!trackingEnabled}
                  onChange={handleToggleGeolocation}
                  loading={toggleLoading}
                  label={
                    trackingEnabled
                      ? t("disableLocation", "Disable Location")
                      : t("enableLocation", "Enable Location")
                  }
                />
              ),
            }}
          />
        ) : t("noResult")
      ) : t("noResult")}
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
          <WidgetSkeleton />
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