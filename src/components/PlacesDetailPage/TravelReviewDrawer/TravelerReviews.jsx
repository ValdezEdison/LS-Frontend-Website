import React, { useEffect, useRef, useState } from "react";
import styles from "./TravelerReviews.module.css";
import ReviewItem from "./ReviewItem";
import FilterDropdown from "./FilterDropdown";
import FilterBar from "../../common/FilterBar";
import { Star, StarFill } from "../../common/Images";
import { useTranslation } from "react-i18next";

const TravelerReviews = ({ onClose, isOpen, showReviewDrawer, filters, isLoading, placeDetails, reviews }) => {
  // const reviews = [
  //   {
  //     name: "Virginia I",
  //     country: "España",
  //     rating: 4.5,
  //     date: "23 de marzo de 2024",
  //     text: "Mirador muy concurrido! Tiene bonitas vistas, incluido el agua, pero sigo prefiriendo el punto de vista de la dama del monte porque es más alto y ofrece mejores vistas de la ciudad y no está tan lleno de gente.",
  //   },
  //   // Add more review objects here...
  // ];

  const { t } = useTranslation("DetailsPage");

  const ratingPopupTopRef = useRef(null);
  const reviewListRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    if (showReviewDrawer && ratingPopupTopRef.current && reviewListRef.current) {
      const screenHeight = window.innerHeight;
      ;
      const ratingPopupTopHeight = ratingPopupTopRef.current.offsetHeight;
      const calculatedMaxHeight = screenHeight - ratingPopupTopHeight;
      setMaxHeight(calculatedMaxHeight);
    }
  }, [showReviewDrawer]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? styles.starFilled : styles.starEmpty}>
          {i <= rating ? <img src={StarFill} alt="filled star" /> : <img src={Star} alt="empty star" />}
        </span>
      );
    }
    return stars;
  };

  return (
    <>
      <div className={showReviewDrawer ? 'popupOverlay' : ''}></div>
      <div className={`${styles.container} ${showReviewDrawer ? styles.active : ''}`}>
        <div className={styles.ratingPopupTop} ref={ratingPopupTopRef}>
          <header className={styles.header}>
            <h2 className={styles.title}>{t('reviews.title')}</h2>
            <button className={styles.closeButton} aria-label="Cerrar" onClick={onClose}>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.9504 22.3637L9.63664 11.05C9.25009 10.6635 9.25009 10.0224 9.63664 9.63582C10.0232 9.24927 10.6643 9.24927 11.0509 9.63582L22.3646 20.9495C22.7511 21.3361 22.7511 21.9772 22.3646 22.3637C21.978 22.7503 21.3369 22.7503 20.9504 22.3637Z"
                  fill="#292D32"
                />
                <path
                  d="M9.63543 22.3637C9.24888 21.9772 9.24888 21.3361 9.63543 20.9495L20.9491 9.63582C21.3357 9.24927 21.9768 9.24927 22.3634 9.63582C22.7499 10.0224 22.7499 10.6635 22.3634 11.05L11.0496 22.3637C10.6631 22.7503 10.022 22.7503 9.63543 22.3637Z"
                  fill="#292D32"
                />
              </svg>
            </button>
          </header>
          <div className={styles.summary}>
            <div className={styles.ratingContainer}>
              <div className={styles.ratingContainerLeft}>
                <div className={styles.ratingScore}>{placeDetails?.rating}</div>
                <div className={styles.starRating}>
                  {renderStars(placeDetails?.rating)}
                </div>
                <div className={styles.reviewCount}>{t('reviews.reviewsCount', { count: reviews.length })}</div>
              </div>
              <div className={styles.ratingContainerRight}>
                <button className="yellowButton">{t('reviews.addReview')}</button>
              </div>
            </div>
            <div className={styles.categoryTagWrapper}>
            {placeDetails?.tags?.map((tag, index) => (
              <div className={styles.categoryTag} key={index}>
                <span className={styles.tag} >
                  {tag.title}
                </span>
              
              </div>
              ))}
            </div>
            
          </div>
          <div className={styles.filterSection}>
            {/* <div className={styles.filterContainer}> */}
              <FilterBar filters={filters} isLoading={isLoading} isDrawer={true} />
            {/* </div> */}
          </div>
        </div>
        <div className={styles.reviewList} ref={reviewListRef} style={{ maxHeight: `${maxHeight}px` }}>
          {reviews.map((review, index) => (
            <ReviewItem key={index} {...review} />
          ))}
        </div>
      </div>
    </>
  );
};

export default TravelerReviews;