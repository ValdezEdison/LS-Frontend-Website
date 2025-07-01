import React, { forwardRef } from "react";
import styles from "./PlaceCard.module.css";
import { PlaceHolderImg2 } from "./Images";
import { getRatingText } from "../../constants/RatingText";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet'; 

const PlaceCard = forwardRef(
    ({ place, translate, isAuthenticated, handleViewMoreDetails = () => { }, isPopup = false, handleActions = () => { }, isFavoriteToggling = false }, ref) => {
        
        const location = useLocation();
        const isItineraryPage = location.pathname.includes("itineraries");
        const isEventsPage = location.pathname.includes("events");
        const { isAddToPopupOpen } = useSelector((state) => state.popup);
        const navigate = useNavigate();


        const hasStopsOrTags = place?.num_of_stops !== undefined || (place?.tags && place?.tags.length > 0);
        const hasComments = place?.comments_count !== undefined;

        const handleFavClick = (e) => {

            handleActions(e, 'addToFavorites', place?.id, place?.display_text || place?.title);
            e.stopPropagation();
        };

        const handleTripClick = (e) => {
            e.stopPropagation();
            handleActions(e, 'addToTrip', place?.id, place?.display_text || place?.title);
        };

        const handleStopClick = (e) => {
            e.stopPropagation();
            handleActions(e, 'addToStop', place?.id, place?.display_text || place?.title);
        };

        const handleCardClick = (e) => {
            const identifier = place?.absolute_url || place?.id;
            handleViewMoreDetails(e, isEventsPage? place?.id : identifier, place?.display_text || place?.title);
        };


        // Utility function to get location info
        const getLocationInfo = (place) => {
            // First try the structure where city is directly in the place object
            if (place?.city?.name) {
                return {
                    city: place.city.name,
                    country: place.city.country?.name || place.country?.name
                };
            }

            // Then try the cities array structure
            if (place?.cities?.[0]?.name) {
                return {
                    city: place.cities[0].name,
                    country: place.cities[0].country?.name
                };
            }

            // Fallback to any other possible structure
            return {
                city: place?.address?.city || '',
                country: place?.country?.name || ''
            };
        };

        const handleTagsAction = (e, id, title) => {
            e.stopPropagation();
            navigate('/places/tags', { 
              state: { 
                cityId: place?.cities[0]?.id || place?.city?.id || '',    
                cityName: place?.cities[0]?.name || place?.city?.name || '', 
                tagId: id, 
                title 
              } 
            });
          };
  
        const defaultImage = "http://discover.localsecrets.travel/wp-content/uploads/2024/08/cropped-cropped-logo-web-1.png";  

        return (
             <>
             <Helmet>
                {/* Title Tag */}
                <title>{place?.title || "Discover Amazing Places"}</title>

                {/* General Meta Tags */}
                <meta name="description" content={place?.description || "Explore unique destinations worldwide"} />

                {/* Open Graph Meta Tags */}
                <meta property="og:title" content={place?.title || "Discover Amazing Places"} />
                <meta property="og:description" content={place?.description || "Explore unique destinations worldwide"} />
                <meta property="og:image" content={place?.image || defaultImage} />
                <meta property="og:url" content={`${window.location.origin}/places/${place?.id}`} />
                <meta property="og:type" content="website" /> 

                {/* Twitter Card Meta Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={place?.title || "Explore This Itinerary"} />
                <meta name="twitter:description" content={place?.description || "Embark on an unforgettable journey with this exclusive itinerary."} />
                <meta name="twitter:image" content={place?.image || defaultImage } />
            </Helmet>
            <div
                ref={ref}
                className={`${styles.placeCard} ${isPopup ? styles.popupPlaceCard : ""}`}
                onClick={handleCardClick}
            >

                <div className={styles.placeImageContainer}>
                    {isFavoriteToggling && (
                        <div className={styles.loaderOverlay}>
                            <div className={styles.loaderToCenter}>
                                <Loader />
                            </div>
                        </div>
                    )}
                    <img
                        src={place?.images?.[0]?.original || place?.image?.original || place?.images?.original || PlaceHolderImg2}
                        alt={place?.display_text || place?.title || translate("placeCard.place_image")}
                        className={styles.placeImage}
                    />
                    {isAuthenticated && !isItineraryPage && (
                        <div
                            className={`${styles.favIcon} ${place?.is_fav ? styles.clicked : ""}`}
                            onClick={handleFavClick}
                        />
                    )}
                </div>

                <div className={styles.placeInfo}>
                    {isAddToPopupOpen && isAuthenticated && (
                        <div className={styles.placeCardAdd} onClick={handleStopClick}></div>
                    )}
                    <div className={styles.placeTitleTop}>
                        <div className={styles.placeTitleMain}>
                            <h3 className={`${styles.placeName} ${isAddToPopupOpen ? styles.addTripPlaceName : ""}`}>{place?.display_text || place?.title || ""}</h3>


                        </div>

                        {(isPopup || !isItineraryPage) && <><p className={styles.placeLocation}>
                            {place?.city?.name}
                            {place?.city?.name && place?.city?.country?.name && ", "}
                            {place?.city?.country?.name}
                        </p>
 
                        <p className={styles.placeCategory}>
                            {place?.levels?.[0]?.title || ""}
                        </p>
                        <p className={styles.placeCategory}>
                            {place?.categories?.map(category => category.title).join(', ')}
                        </p>
                        </>
                        }
                        {place?.num_of_stops !== undefined && (
                            <p className={styles.placeStops}> {place.num_of_stops} {translate("placeCard.stops")} </p>
                        )}
                    </div>


                    {/* Conditionally render the stops and views section */}
                    {!isPopup && hasStopsOrTags && !hasComments && isItineraryPage && (
                    <div className={styles.placeStopsTags}>
                        {place?.tags?.length > 0 && (
                        <div className={styles.placeTags}>
                            {place.tags.map((tag, index) => (
                            <p key={index} className={styles.placeItenary} onClick={(e) => handleTagsAction(e, tag.id, tag.title)}>
                                {tag.title}
                            </p>
                            ))}
                        </div>
                        )}
                        {/* <p className={styles.placeItenary}>{translate("placeCard.itinerary")}</p> */}
                        {(() => {
                        const { city, country } = getLocationInfo(place);
                        return (
                            <p className={styles.placeLocation}>
                            {city}
                            {country && `, ${country}`}
                            </p>
                        );
                        })()}
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
                                <p className={styles.reviewCount}>
                                    {place?.comments_count ?? 0} {translate("placeCard.comments")}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {!isPopup && (
                    <div className={styles.placeActions}>
                        <button
                            className={styles.viewMoreButton}
                            onClick={handleCardClick}
                        >
                            {translate("placeCard.view_more")}
                        </button>
                        <button
                            className={styles.addToTripButton}
                            onClick={handleTripClick}
                        >
                            <span className={styles.addIcon}></span>
                            {translate("placeCard.add_to_trip")}
                        </button>
                    </div>
                )}
            </div>
            </>
        );
    });

export default PlaceCard;
