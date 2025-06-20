import React, { useContext } from "react";
import styles from "./TripCard.module.css";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../../context/LanguageContext";
import { PlaceHolderImg2 } from "../common/Images";

const TripCard = ({ trip, isPast, handleActions }) => {
  const { t } = useTranslation("MyTrips");
  const { currentLanguage } = useContext(LanguageContext);

  const firstCity = trip.cities?.[0];
  const firstImage = firstCity?.images?.[0]?.original;
  const title =
    trip.title ||
    `${firstCity?.name || t("tripCard.defaultTitle")} ${t(
      "tripCard.defaultTitle"
    )}`;

  /**
   * FIX #2: Ensures the language code is a standard locale format
   * that toLocaleDateString can reliably use for translation.
   * @param {string} lang - The language code from context (e.g., 'es', 'en').
   * @returns {string} A BCP 47 language tag (e.g., 'es-ES', 'en-US').
   */
  const getLocaleForDate = (lang) => {
    const localeMap = {
      es: "es-ES",
      en: "en-US",
      // Add other language mappings as needed
    };
    return localeMap[lang] || "en-US"; // Default to English if no match
  };

  const locale = getLocaleForDate(currentLanguage);

  // Function to format date as "Month Day, Year"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // Function to format the date range
  const formatDateRange = (startDate, endDate) => {
    if (!startDate || !endDate) {
      return ""; // Handle cases where dates are not available
    }
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // If same year
    if (start.getFullYear() === end.getFullYear()) {
      const startStr = start.toLocaleDateString(locale, {
        month: "long",
        day: "numeric",
      });
      // The 't' function can be used here if the key exists and works well.
      // Example: "August 28 - September 5, 2024"
      const endStr = end.toLocaleDateString(locale, {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      return `${startStr} - ${endStr}`;
    }

    /**
     * FIX #1: Directly format the string for different years to avoid
     * relying on a potentially missing translation key.
     */
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  const dateRange = formatDateRange(trip.initial_date, trip.end_date);

  return (
    <>
      <div className={styles.tripDate}>{dateRange}</div>
      <div
        className={styles.tripCard}
        onClick={(e) => handleActions(e, "showTripDetails", trip.id)}
      >
        <div className={styles.tripInfo}>
          <img
            src={firstImage || PlaceHolderImg2}
            alt={title}
            className={styles.tripImage}
            onError={(e) => {
              e.target.src = PlaceHolderImg2;
            }}
          />
          <div className={styles.tripDetails}>
            <h3 className={styles.tripTitle}>{title}</h3>
            <p className={styles.tripSites}>
              {" "}
              {t("tripCard.sitesAdded", { count: trip.num_of_places || 0 })}
            </p>
            <p className={styles.tripDates}>{dateRange}</p>
          </div>
        </div>
        <div className={styles.tripActions}>
          <div className={styles.tripActionsDropdown}>
            <div
              className={styles.editButton}
              onClick={(e) => handleActions(e, "editTrip", trip.id)}
            >
              {t("tripCard.editButton")}
            </div>
            <div
              className={styles.deleteButton}
              onClick={(e) => handleActions(e, "deleteTrip", trip.id)}
            >
              {t("tripCard.deleteButton")}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TripCard;
