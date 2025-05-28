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

const EventsSection = ({ events = [] }) => {
    const { t } = useTranslation("EventsSection");
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

  const renderEvent = (event) => (
    <div key={event.id} className={styles.placeCard}>
      <img
        src={event.images[0] ? event.images[0]?.original : PlaceHolderImg2}
        alt={event.name}
        className={styles.placeImage} onClick={() => handleNavigate(event)}
      />
      <p className={styles.placeName} onClick={() => handleNavigate(event)}>{event.title}</p>
    </div>
  );

  const handleNavigate = (place) => {
    if (place) {
      if(isAuthenticated){
        navigate(`/events/details`, { state: { id: place.id } });
      }else{
        togglePopup("alert", true);
        setAlertTitle(tCommon('authAlert.viewDetails.title'));
        setAlertMessage(tCommon('authAlert.viewDetails.description'));
      }
      
    }else{
      navigate(`/events`);
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
      items={events}
      renderItem={renderEvent}
      isCarousel={events.length > 0 ? true : false}
    />
    </>
  );
};

export default EventsSection;