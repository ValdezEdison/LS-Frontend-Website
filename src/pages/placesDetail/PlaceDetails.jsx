import React, { useEffect, useState, useContext } from "react";
import styles from "./PlaceDetails.module.css";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import MapSection from "../../components/PlacesDetailPage/MapSection";
import MuseumInfo from "../../components/PlacesDetailPage/MuseumInfo";
import ImageGallery from "../../components/PlacesDetailPage/ImageGallery";
import ReviewSection from "../../components/PlacesDetailPage/ReviewSection";
import Modal from "../../components/modal/Modal";
import ImageGalleryPopupContent from "../../components/PlacesDetailPage/PlacesDetailPopup/ImageGalleryPopupContent";
import ReviewSectionPopupContent from "../../components/PlacesDetailPage/PlacesDetailPopup/ReviewSectionPopupContent";
import { openPopup, closePopup } from "../../features/popup/PopupSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchPlaceById, fetchPlaceComments, fetchNearbyPlaces } from "../../features/places/PlaceAction";
import MapSectionSkeleton from "../../components/skeleton/PlacesDetailPage/MapSectionSkeleton";
import MuseumInfoSkeleton from "../../components/skeleton/PlacesDetailPage/MuseumInfoSkeleton";
import ImageGallerySkeleton from "../../components/skeleton/PlacesDetailPage/ImageGallerySkeleton";
import ReviewSectionSkeleton from "../../components/skeleton/PlacesDetailPage/ReviewSectionSkeleton";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import TravelerReviews from "../../components/PlacesDetailPage/TravelReviewDrawer/TravelerReviews";
import AlertPopup from "../../components/popup/Alert/AlertPopup";
import { useTranslation } from "react-i18next";
import Widget from "../../components/common/Widget";
import { WidgetSkeleton } from "../../components/skeleton/common/WidgetSkeleton";
import { LanguageContext } from "../../context/LanguageContext";
import MapPopup from "../../components/common/MapPopup";
import CommentPopup from "../../components/popup/Comment/CommentPopup";


const PlaceDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  const [showImgGalleryPopup, setShowImgGalleryPopup] = useState(false);
  const [showReviewDrawer, setShowReviewDrawer] = useState(false);
  const [showAlertPopup, setShowAlertPopup] = useState(false);
  const [showCommentPopup, setShowCommentPopup] = useState(false);
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
    points: "",
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
      dispatch(fetchPlaceComments(id));
      dispatch(fetchNearbyPlaces(id));
    }
  }, [id, dispatch, language]);

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
    }else{
      setShowCommentPopup(true);
      dispatch(openPopup());
    }
  
  };

  const handleNavigateToWebsite = (place) => {
    if (place?.url) {
      window.open(place.url, "_blank"); // Open the external URL in a new tab
    } else {
      console.error("No website URL provided for this place.");
    }
  };


    const [showMapPopup, setShowMapPopup] = useState(false);
  
    const handleShowMapPopup = () => {
      console.log("handleShowMapPopup");
      setShowMapPopup(true);
      dispatch(openPopup());
    };

     const handleCloseMapPopup = () => {
        setShowMapPopup(false);
        dispatch(closePopup());
      };

       const handleActions = (e,action, id) => {
          e.stopPropagation();
          if (action === 'addToFavorites') {
            handleFavClick(e, id);
          } else if (action === 'addToTrip') {
            handleTripClick(e, id);
          }
        };
      
        const handleFavClick = (e, id) => {
          e.stopPropagation();
          if (isAuthenticated) {
            dispatch(toggleFavorite(id));
          }
        };

        const handleNavigateToLogin = () => {
          navigate('/login', { state: { from: location } });
        }

        const handleCloseCommentPopup = () => {
          setShowCommentPopup(false);
          setShowAlertPopup(false);
          dispatch(closePopup());
        }

  return (
    <>
    {isOpen && showMapPopup && <MapPopup onClose={handleCloseMapPopup} categories={{}} ratings={{}} state={state} setState={setState} handleActions={handleActions}/>}
      {isOpen && showImgGalleryPopup && (
        <Modal title={place.title} customClass="galleryReviewPopup"  onClose={closeModal}>
          <ImageGalleryPopupContent images={place.images} />
          <ReviewSectionPopupContent placeDetails={place} reviews={comments}/>
        </Modal>
      )}
        <TravelerReviews onClose={() => handleCloseReviewDrawer()} isOpen={isOpen} showReviewDrawer={showReviewDrawer} filters={filters} isLoading={isLoading} placeDetails={place} reviews={comments}/>


      {isOpen && showAlertPopup && (
      <Modal onClose={() => handleCloseCommentPopup()}customClass="modalSmTypeOne" >  <AlertPopup  handleNavigateToLogin={handleNavigateToLogin}/></Modal>
      )}

      {isOpen && showCommentPopup && (
       <Modal title="Añadir comentario"  onClose={() => handleCloseCommentPopup()} customClass="modalMdTypeOne"><CommentPopup  placeDetails={place} />
       </Modal> 
      )}
   <div className={`${styles.lugaresContainer} ${showReviewDrawer ? styles.overflowHide : ''}`}>

        <Header />
        <main className={styles.mainContent}>
          <div className="page-center">
            <div className={styles.contentWrapper}>
              {isLoading ? (
                <MapSectionSkeleton />
              ) : (
                <MapSection place={place} handleShowMapPopup={handleShowMapPopup}/>
              )}
              <div className={styles.infoSection}>
                {isLoading ? (
                  <MuseumInfoSkeleton />
                ) : (
                  <MuseumInfo place={place} handleNavigateToWebsite={handleNavigateToWebsite}/>
                )}
                {isLoading ? (
                  <ImageGallerySkeleton />
                ) : (
                  <ImageGallery
                    handleClickViewMoreDetails={handleClickViewMoreDetails}
                    images={place?.images}
                  />
                )}
                
              </div>
            </div>

            {isLoading ? (
                  <Skeleton count={5} />
                ) : (
                  <p className={styles.museumDescription}>
                    {place?.description}
                  </p>
                )}

            {isLoading ? (
              <ReviewSectionSkeleton />
            ) : (
              <ReviewSection handleClickSeeAllComments={handleClickSeeAllComments} handleClickAddComment={handleClickAddComment} comments={comments} placeDetails={place}/>
            )}
            {isLoading ? (
              <WidgetSkeleton />
            ) : (
              <Widget  data={NearByPlaces} title="Otros lugares cercanos" count={4}/>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default PlaceDetails;