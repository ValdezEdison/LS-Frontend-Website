import React, { useEffect, useState } from "react";
import styles from "./PlaceDetails.module.css";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import MapSection from "../../components/PlacesDetailPage/MapSection";
import MuseumInfo from "../../components/PlacesDetailPage/MuseumInfo";
import ImageGallery from "../../components/PlacesDetailPage/ImageGallery";
import ReviewSection from "../../components/PlacesDetailPage/ReviewSection";
import NearbyPlaces from "../../components/PlacesDetailPage/NearbyPlaces";
import Modal from "../../components/modal/Modal";
import ImageGalleryPopupContent from "../../components/PlacesDetailPage/PlacesDetailPopup/ImageGalleryPopupContent";
import ReviewSectionPopupContent from "../../components/PlacesDetailPage/PlacesDetailPopup/ReviewSectionPopupContent";
import { openPopup, closePopup } from "../../features/popup/PopupSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import { fetchPlaceById } from "../../features/places/PlaceAction";

const PlaceDetails = () => {
  const dispatch = useDispatch();
  const [showImgGalleryPopup, setShowImgGalleryPopup] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const { isOpen } = useSelector((state) => state.popup);
  const { place } = useSelector((state) => state.places);

  const location = useLocation();
  const { id } = location.state || {};

  useEffect(() => {
    if (id) {
      dispatch(fetchPlaceById(id));
    }
  }, [id, dispatch]);

  const handleClickViewMoreDetails = () => {
    setShowImgGalleryPopup(true);
    dispatch(openPopup());
  };

  // Function to open the modal with specific content
  const openModalWithContent = (content) => {
    setModalContent(content);
  };

  const closeModal = () => {
    setShowImgGalleryPopup(false);
    setModalContent(null);
    dispatch(closePopup());
  };

  return (
    <>
      {isOpen && showImgGalleryPopup && (
        <Modal onClose={closeModal}>
          <ImageGalleryPopupContent images={place.images}/>
          <ReviewSectionPopupContent />
        </Modal>
      )}
      <div className={styles.lugaresContainer}>
        <Header />
        <main className={styles.mainContent}>
          <div className="page-center">
            <div className={styles.contentWrapper}>
            <MapSection place={place} />
              <div className={styles.infoSection}>
                <MuseumInfo place={place}/>
                <ImageGallery
                  handleClickViewMoreDetails={handleClickViewMoreDetails}
                  images={place?.images}
                />
                <p className={styles.museumDescription}>
                {place?.description}
                </p>
              </div>
            </div>

            <ReviewSection />
            <NearbyPlaces />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default PlaceDetails;
