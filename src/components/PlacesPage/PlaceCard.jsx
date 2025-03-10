import React, { forwardRef } from "react";
import styles from "./PlaceCard.module.css";
import { PlaceHolderImg2 } from "../common/Images";
import { getRatingText } from "../../constants/RatingText";

const PlaceCard = forwardRef(({ place, translate, isAuthenticated, handleViewMoreDetails = () => {}, isPopup = false }, ref) => {
    return (
        <div 
            ref={ref} 
            className={`${styles.placeCard} ${isPopup ? styles.popupPlaceCard : ""}`} 
            onClick={() => handleViewMoreDetails(place?.id)}
        >
            <div className={styles.placeImageContainer}>
                <img
                    src={place?.images?.[0]?.midsize || PlaceHolderImg2}
                    alt={place?.display_text || place?.title || translate("placeCard.place_image")}
                    className={styles.placeImage}
                />
                {isAuthenticated && <div className={`${styles.favIcon} ${styles.clicked}`}></div>}
            </div>
            <div className={styles.placeInfo}>
                <h3 className={styles.placeName}>{place?.display_text || place?.title || ""}</h3>
                <p className={styles.placeLocation}>{place?.city?.name || ""}, {place?.city?.country?.name || ""}</p>
                <p className={styles.placeCategory}>{place?.categories?.[0]?.title || place?.levels?.[0]?.title || ""}</p>
                <div className={styles.placeRating}>
                    <span className={styles.ratingScore}>{place?.rating ?? ""}</span>
                    <div className={styles.ratingInfo}>
                        <p className={styles.ratingText}>
                            {getRatingText(place?.rating, translate)}
                        </p>
                        <p className={styles.reviewCount}>{place?.comments_count ?? 0} {translate("placeCard.comments")}</p>
                    </div>
                </div>
            </div>
            {!isPopup && (
                <div className={styles.placeActions}>
                    <button className={styles.viewMoreButton} onClick={() => handleViewMoreDetails(place?.id)}>
                        {translate("placeCard.view_more")}
                    </button>
                    {isAuthenticated && (
                        <button className={styles.addToTripButton}>
                            <span className={styles.addIcon}></span>
                            {translate("placeCard.add_to_trip")}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
});

export default PlaceCard;
