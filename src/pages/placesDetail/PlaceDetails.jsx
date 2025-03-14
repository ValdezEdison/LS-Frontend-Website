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
import { fetchPlaceById, fectchPlaceComments, fetchNearbyPlaces } from "../../features/places/PlaceAction";
import MapSectionSkeleton from "../../components/skeleton/PlacesDetailPage/MapSectionSkeleton";
import MuseumInfoSkeleton from "../../components/skeleton/PlacesDetailPage/MuseumInfoSkeleton";
import ImageGallerySkeleton from "../../components/skeleton/PlacesDetailPage/ImageGallerySkeleton";
import ReviewSectionSkeleton from "../../components/skeleton/PlacesDetailPage/ReviewSectionSkeleton";
import NearbyPlacesSkeleton from "../../components/skeleton/PlacesDetailPage/NearbyPlacesSkeleton";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import TravelerReviews from "../../components/PlacesDetailPage/TravelReviewDrawer/TravelerReviews";
import FeedbackModal from "../../components/PlacesDetailPage/popup/FeedbackModal";
import { useTranslation } from "react-i18next";

const PlaceDetails = () => {
  const dispatch = useDispatch();
  const [showImgGalleryPopup, setShowImgGalleryPopup] = useState(false);
  const [showReviewDrawer, setShowReviewDrawer] = useState(false);
  const [showAlertPopup, setShowAlertPopup] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const { isOpen } = useSelector((state) => state.popup);
  const { place, loading: isLoading, NearbyPlaces: NearByPlaces, comments } = useSelector((state) => state.places);
  
  const { isAuthenticated } = useSelector((state) => state.auth);

  const {languages, loading: languagesLoading } = useSelector((state) => state.languages);
  const { t } = useTranslation("Places");

  const sortByOptions = t("filter.orderOptions", { returnObjects: true }).map((option, index) => ({
    id: index,
    name: option,
  }));
  const scores = [
    { id: 1, name: "1" },
    { id: 2, name: "2" }, 
    { id: 3, name: "3" },
    { id: 4, name: "4" },
    { id: 5, name: "5" },
  ];

  const [state, setState] = useState({
    selectedScore: null,
    selectedLanguage: null,
    selectedSortBy: null,
    scoreSearchQuery: "",
    languageSearchQuery: "",
  });

  const updateState = (key, value) => {
    setState((prevState) => ({ ...prevState, [key]: value }));
  };

  const filters = [
    {
      label: "select score",
      options: scores,
      selectedId: state.selectedScore,
      onSelect: (value) => updateState("selectedScore", value),
      onSearch: (query) => updateState("scoreSearchQuery", query),
      searchQuery: state.scoreSearchQuery,
    },
    {
      label: `select language`,
      options: languages,
      selectedId: state.selectedLanguage,
      onSelect: (value) => updateState("selectedLanguage", value),
      onSearch: (query) => updateState("languageSearchQuery", query),
      searchQuery: state.languageSearchQuery,
    },
    {
      label: `${t("filter.select")} ${t("filter.sortBy")}`,
      options: sortByOptions,
      selectedId: state.selectedSortBy,
      onSelect: (value) => updateState("selectedSortBy", value),
    },
  ];

  const location = useLocation();
  const { id } = location.state || {};

  useEffect(() => {
    if (id) {
      dispatch(fetchPlaceById(id));
      dispatch(fectchPlaceComments(id));
      dispatch(fetchNearbyPlaces(id));
    }
  }, [id, dispatch]);

  const handleClickViewMoreDetails = () => {
    setShowImgGalleryPopup(true);
    dispatch(openPopup());
  };

  const closeModal = () => {
    setShowImgGalleryPopup(false);
    setModalContent(null);
    dispatch(closePopup());
  };

  const handleClickSeeAllComments = () => {
    setShowReviewDrawer(true);
    dispatch(openPopup());
  };

  const handleCloseReviewDrawer = () => {
    setShowReviewDrawer(false);
    dispatch(closePopup());
  };

  const handleClickAddComment = () => {
    if (!isAuthenticated) {
      setShowAlertPopup(true);
      dispatch(openPopup());
    }
  
  };

  return (
    <>
      {isOpen && showImgGalleryPopup && (
        <Modal title={place.title} customClass="galleryReviewPopup"  onClose={closeModal}>
          <ImageGalleryPopupContent images={place.images} />
          <ReviewSectionPopupContent placeDetails={place} reviews={comments}/>
        </Modal>
      )}
        <TravelerReviews onClose={() => handleCloseReviewDrawer()} isOpen={isOpen} showReviewDrawer={showReviewDrawer} filters={filters} isLoading={isLoading} placeDetails={place} reviews={comments}/>


      {isOpen && showAlertPopup && (
        <FeedbackModal onClose={() => setShowAlertPopup(false)} />
      )}
   <div className={`${styles.lugaresContainer} ${showReviewDrawer ? styles.overflowHide : ''}`}>

        <Header />
        <main className={styles.mainContent}>
          <div className="page-center">
            <div className={styles.contentWrapper}>
              {isLoading ? (
                <MapSectionSkeleton />
              ) : (
                <MapSection place={place} />
              )}
              <div className={styles.infoSection}>
                {isLoading ? (
                  <MuseumInfoSkeleton />
                ) : (
                  <MuseumInfo place={place} />
                )}
                {isLoading ? (
                  <ImageGallerySkeleton />
                ) : (
                  <ImageGallery
                    handleClickViewMoreDetails={handleClickViewMoreDetails}
                    images={place?.images}
                  />
                )}
                {isLoading ? (
                  <Skeleton count={5} />
                ) : (
                  <p className={styles.museumDescription}>
                    {place?.description}
                  </p>
                )}
              </div>
            </div>

            {isLoading ? (
              <ReviewSectionSkeleton />
            ) : (
              <ReviewSection handleClickSeeAllComments={handleClickSeeAllComments} handleClickAddComment={handleClickAddComment} comments={comments} placeDetails={place}/>
            )}
            {isLoading ? (
              <NearbyPlacesSkeleton />
            ) : (
              <NearbyPlaces  places={NearByPlaces}/>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default PlaceDetails;