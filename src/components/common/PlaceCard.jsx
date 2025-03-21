import React, { forwardRef } from "react";
import styles from "./PlaceCard.module.css";
import { PlaceHolderImg2 } from "./Images";
import { getRatingText } from "../../constants/RatingText";
import { useLocation } from "react-router-dom";

const PlaceCard = forwardRef(({ place, translate, isAuthenticated, handleViewMoreDetails = () => { }, isPopup = false }, ref) => {
    const hasStopsOrTags = place?.num_of_stops !== undefined || (place?.tags && place?.tags.length > 0);
    const hasComments = place?.comments_count !== undefined;

    const location = useLocation();

    const isItineraryPage = location.pathname.includes("itineraries");

    return (
        <div
            ref={ref}
            className={`${styles.placeCard} ${isPopup ? styles.popupPlaceCard : ""}`}
            onClick={() => handleViewMoreDetails(place?.id)}
        >
            <div className={styles.placeImageContainer}>
                <img
                    src={place?.images?.[0]?.midsize || place?.image?.midsize || PlaceHolderImg2}
                    alt={place?.display_text || place?.title || translate("placeCard.place_image")}
                    className={styles.placeImage}
                />
                {isAuthenticated && <div className={`${styles.favIcon} ${styles.clicked}`}></div>}
            </div>
            <div className={styles.placeInfo}>
                <h3 className={styles.placeName}>{place?.display_text || place?.title || ""}</h3>
                <p className={styles.placeLocation}>
                    {place?.city?.name}
                    {place?.city?.name && place?.city?.country?.name && ", "}
                    {place?.city?.country?.name}
                </p>
                <p className={styles.placeCategory}>{place?.categories?.[0]?.title || place?.levels?.[0]?.title || ""}</p>

                {/* Conditionally render the stops and views section */}
                {hasStopsOrTags && !hasComments && isItineraryPage && (
                    <div className={styles.placeStopsTags}>
                        {place?.num_of_stops !== undefined && (
                            <p className={styles.placeStops}>Stops: {place.num_of_stops}</p>
                        )}
                        {place?.tags?.length > 0 && (
                            <div className={styles.placeTags}>
                                {place.tags.map((tag) => (
                                    <span key={tag.id} className={styles.tag}>
                                        {tag.title}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Conditionally render the rating section */}
                {hasComments && (
                    <div className={styles.placeRating}>
                        <span className={styles.ratingScore}>{place?.rating ?? ""}</span>
                        <div className={styles.ratingInfo}>
                            <p className={styles.ratingText}>
                                {getRatingText(place?.rating, translate)}
                            </p>
                            <p className={styles.reviewCount}>{place?.comments_count ?? 0} {translate("placeCard.comments")}</p>
                        </div>
                    </div>
                )}
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