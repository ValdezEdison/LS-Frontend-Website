import React, { useState } from "react";
import CommonSection from "../common/CommonSection";
import styles from "./PlacesSection.module.css";
import { PlaceHolderImg2 } from "../common/Images";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { openPopup, closePopup } from "../../features/popup/PopupSlice";
import AlertPopup from "../popup/Alert/AlertPopup";
import Modal from "../modal/Modal";

const PlacesSection = ({ places = [] }) => {

  const { t } = useTranslation("PlacesSection");
  const { t: tCommon } = useTranslation("Common");

  const navigate = useNavigate();
  const location = useLocation();

  const { isOpen } = useSelector((state) => state.popup);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [popupState, setPopupState] = useState({
    map: false,
    gallery: false,
    reviewDrawer: false,
    alert: false,
    comment: false,
    deleteConfirm: false,
    success: false,
    addTrip: false
  });

  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("");


  const togglePopup = (name, state) => {
      setPopupState(prev => ({ ...prev, [name]: state }));
      state ? dispatch(openPopup()) : dispatch(closePopup());
  };


  const renderPlace = (place) => (
    <div key={place.id} className={styles.placeCard}>
      <img
        // src={place.images ? place.images?.original : PlaceHolderImg2}
         src={place?.images?.[0]?.original || place?.image?.original || place?.images?.original || PlaceHolderImg2}
        alt={place.display_text}
        className={styles.placeImage}  onClick={() => handleNavigate(place)}
      />
      <p className={styles.placeName}  onClick={() => handleNavigate(place)}>{place.display_text || place?.title}</p>
    </div>
  );

  const handleNavigate = (place) => {
    if (place) {
      if(isAuthenticated){
        if(place?.absolute_url){
          navigate(place.absolute_url);
          navigate(`/places/details/${encodeURIComponent(place.absolute_url)}`);
        }
        
        else{
          navigate(`/places/details`, { state: { id: place.id } });
        }
        
      }else{
        togglePopup("alert", true);
        setAlertTitle(tCommon('authAlert.viewDetails.title'));
        setAlertMessage(tCommon('authAlert.viewDetails.description'));
      }
      
    }else{
      navigate(`/places`);
    }
  };

  const handleNavigateToLogin = () => {
    navigate('/login', { state: { from: location } });
  };

  return (
    <>    
    {isOpen && popupState.alert && (
      <Modal onClose={() => togglePopup("alert", false)} customClass="modalSmTypeOne">
        <AlertPopup
          handleNavigateToLogin={handleNavigateToLogin}
          title={alertTitle}
          description={alertMessage}
          buttonText={tCommon('authAlert.favorites.button')}
        />
      </Modal>
    )}
    <CommonSection
      title={t("title")}
      subtitle={t("subtitle")}
      seeMoreLink={ () => handleNavigate()}
      items={places}
      renderItem={renderPlace}
      isCarousel={places.length > 0 ? true : false}
    />
    </>
  );
};

export default PlacesSection;