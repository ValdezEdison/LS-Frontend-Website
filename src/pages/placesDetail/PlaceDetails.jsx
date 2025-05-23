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
import { fetchPlaceById, fetchPlaceComments, fetchNearbyPlaces, addComment, editComment, deleteComment, fetchGeoLocations, generateLink } from "../../features/places/PlaceAction";
import { toggleFavorite } from "../../features/favorites/FavoritesAction";
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
import { setFavTogglingId, resetNearByPlaces } from "../../features/places/PlaceSlice";
import ConfirmationPopup from "../../components/popup/Confirmation/ConfirmationPopup";
import SuccessMessagePopup from "../../components/popup/SuccessMessage/SuccessMessagePopup";
import { toast } from "react-toastify";
import { resetShareableLink } from "../../features/places/PlaceSlice";


const PlaceDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);


  const [isEditing, setIsEditing] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [successTitle, setSuccessTitle] = useState("");
  const [showShareOptions, setShowShareOptions] = useState(false);

  const { isOpen } = useSelector((state) => state.popup);
  const { place, loading: isLoading, NearbyPlaces: NearByPlaces, comments, isFavoriteToggling, favTogglingId, shareableLink } = useSelector((state) => state.places);

  const { currentLocation } = useSelector((state) => state.locationSettings);

  const { isAuthenticated } = useSelector((state) => state.auth);

  const { languages, loading: languagesLoading } = useSelector((state) => state.languages);
  const { t } = useTranslation("Places");
  const { t: tDetail } = useTranslation("DetailsPage");
  const { t: tCommon } = useTranslation("Common");

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
    latitude: "",
    longitude: "",
  });

  const [comment, setComment] = useState({
    text: "",
    rating: 0,
  });

  const [commentForm, setCommentForm] = useState({
    text: "",
    rating: 0,
    errors: {
      text: '',
      rating: ''
    },
    touched: {
      text: false,
      rating: false
    }
  });



  const [popupState, setPopupState] = useState({
    map: false,
    gallery: false,
    reviewDrawer: false,
    alert: false,
    comment: false,
    deleteConfirm: false,
    success: false,
  });


  // Centralized popup handlers
  const togglePopup = (name, state) => {
    setPopupState((prev) => ({ ...prev, [name]: state }));
    state ? dispatch(openPopup()) : dispatch(closePopup());
  };


  const handleFavClick = (e, id) => {
    if (!isAuthenticated) {
      togglePopup("alert", true);
    } else {
      dispatch(setFavTogglingId(id));
      dispatch(toggleFavorite(id));
    }
  };

  const handleActions = (e, action, id, name) => {
    
    e.stopPropagation();
    switch (action) {
      case 'addToFavorites':
        handleFavClick(e, id);
        break;
      // case 'addToTrip':
      //   handleAddToTripClick(e, id, name);
      //   setFormState(prev => ({ ...prev, type: "place" }));
      //   break;
      case 'viewMore':
        handleViewMoreDetails(e, id);
        break;
      // case 'addToStop':
      //   setFormState(prev => ({
      //     ...prev,
      //     stops: [...prev.stops, id]
      //   }));
      //   break;
      default:
        break;
    }
  };

  const handleViewMoreDetails = (e, id) => {
    togglePopup("map", false);
    if (isAuthenticated) {
      navigate('/places/details', { state: { id } });
    } else {
      togglePopup("alert", true);
      setAlertTitle(tCommon('authAlert.viewDetails.title'));
      setAlertMessage(tCommon('authAlert.viewDetails.description'));
    }
  };

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
      if(currentLocation) {
        dispatch(fetchNearbyPlaces({page: 1, placeId: id, latitude: currentLocation.preferences?.last_known_latitude, longitude: currentLocation.preferences?.last_known_longitude}));
      }else{
        dispatch(fetchNearbyPlaces(id));
      }
     
    }
    return () => {
      dispatch(resetShareableLink());
    }
  }, [id, dispatch, language, currentLocation]);

  const handleClickViewMoreDetails = () => {
    togglePopup("gallery", true);
  };

  // const closeModal = () => {
  //   setShowImgGalleryPopup(false);

  //   dispatch(closePopup());
  // };

  const handleClickSeeAllComments = () => {
    togglePopup("reviewDrawer", true);
  };

  const handleCloseReviewDrawer = () => {
    togglePopup("reviewDrawer", false);
  };

  const handleClickAddComment = () => {
    if (!isAuthenticated) {
      togglePopup("alert", true);
    } else {
      togglePopup("comment", true);
    }

  };

  const handleNavigateToWebsite = (place) => {
    if (place?.url) {
      window.open(place.url, "_blank"); // Open the external URL in a new tab
    } else {
      
    }
  };


  const handleShowMapPopup = () => {
    togglePopup("map", true);
  };

  const handleCloseMapPopup = () => {
    togglePopup("map", false);
  };



  const handleNavigateToLogin = () => {
    navigate('/login', { state: { from: location } });
  }

  const handleCloseCommentPopup = () => {
    togglePopup("comment", false);
    toggleFavorite('alert', false);
  }


  // const handleCommentChange = (e) => {
  //   setComment(prev => ({ ...prev, text: e.target.value }));
  // };

  // const handleRatingChange = (rating) => {
  //   setComment(prev => ({ ...prev, rating }));
  // };

  const handleClickEditComment = (comment) => {
    if (!isAuthenticated) {
      togglePopup("alert", true);
    } else {
      setCommentForm({
        text: comment.body,
        rating: comment.rating,
        errors: {
          text: '',
          rating: ''
        },
        touched: {
          text: true,  // Mark as touched to show validation immediately
          rating: true
        }
      });
      setIsEditing(true);
      setEditingCommentId(comment.id);
      togglePopup("comment", true);
    }
  };

  // const handleSubmitComment = () => {
  //   if (comment.text.trim() && comment.rating > 0) {
  //     const action = isEditing
  //       ? dispatch(editComment({
  //         commentId: editingCommentId,
  //         commentData: {
  //           body: comment.text,
  //           rating: comment.rating,
  //         }
  //       }))
  //       : dispatch(addComment({
  //         placeId: id,
  //         commentData: {
  //           body: comment.text,
  //           rating: comment.rating,
  //         }
  //       }));

  //     action
  //       .unwrap()
  //       .then(() => {
  //         setComment({ text: "", rating: 0 });
  //         setSuccessMessage(editingCommentId ? "Comment updated successfully!" : "Comment added successfully!");
  //         togglePopup("comment", false);
  //         togglePopup("success", true);
  //         setIsEditing(false);
  //         setEditingCommentId(null);
  //         dispatch(fetchPlaceComments(id)); // Refresh comments
  //       })
  //       .catch((error) => {
  //         
  //       });
  //   }
  // };


  const handleClickDeleteComment = (commentId) => {
    if (!isAuthenticated) {
      togglePopup("alert", true);
    } else {
      setCommentToDelete(commentId);
      togglePopup("deleteConfirm", true);
    }
  };

  const handleConfirmDelete = () => {
    dispatch(deleteComment(commentToDelete))
      .unwrap()
      .then(() => {
        dispatch(fetchPlaceComments(id));
        setSuccessTitle(tDetail('reviews.success.deletedTitle'));
        setSuccessMessage(tDetail('reviews.success.deletedMessage'));
        
        togglePopup("deleteConfirm", false);
        togglePopup("success", true);
        setCommentToDelete(null);
      })
      .catch((error) => {
        
      });
  };

  const handleCancelDelete = () => {
    togglePopup("deleteConfirm", false);
    setCommentToDelete(null);
  };

  const handleCloseSuccessPopup = () => {
    togglePopup("success", false);
  };



  const validateCommentForm = () => {
    const errors = {
      text: '',
      rating: ''
    };

    // if (!commentForm.text.trim()) {
    //   errors.text = 'Comment is required';
    // } else if (commentForm.text.trim().length < 0) {
    //   errors.text = 'Comment must be at least 10 characters';
    // }

    if (commentForm.rating === 0) {
      errors.rating = 'Please select a rating';
    }

    setCommentForm(prev => ({
      ...prev,
      errors
    }));

    return Object.values(errors).every(error => !error);
  };

  const handleCommentChange = (e) => {
    const { value } = e.target;
    setCommentForm(prev => ({
      ...prev,
      text: value,
      touched: {
        ...prev.touched,
        text: true
      }
    }));
  };

  const handleRatingChange = (clickedRating) => {
    setCommentForm(prev => {
      // If clicking the current rating, reduce by 1
      // Otherwise set to the clicked rating
      const newRating = prev.rating === clickedRating ? clickedRating - 1 : clickedRating;

      return {
        ...prev,
        rating: newRating,
        touched: {
          ...prev.touched,
          rating: true
        }
      };
    });
  };

  const handleFieldBlur = (field) => {
    setCommentForm(prev => ({
      ...prev,
      touched: {
        ...prev.touched,
        [field]: true
      }
    }));
  };

  const handleSubmitComment = () => {

    // Mark all fields as touched
    setCommentForm(prev => ({
      ...prev,
      touched: {
        text: true,
        rating: true
      }
    }));

    if (validateCommentForm()) {
      togglePopup("comment", false);
      const action = isEditing
        ? dispatch(editComment({
          commentId: editingCommentId,
          commentData: {
            body: commentForm.text,
            rating: commentForm.rating,
          }
        }))
        : dispatch(addComment({
          placeId: id,
          commentData: {
            body: commentForm.text,
            rating: commentForm.rating,
          }
        }));

      action
        .unwrap()
        .then(() => {
          setCommentForm({
            text: "",
            rating: 0,
            errors: {
              text: '',
              rating: ''
            },
            touched: {
              text: false,
              rating: false
            }
          });
          setSuccessTitle(tDetail(isEditing 
            ? 'reviews.success.updatedTitle' 
            : 'reviews.success.addedTitle'));
          
          setSuccessMessage(tDetail(isEditing 
            ? 'reviews.success.updatedMessage' 
            : 'reviews.success.addedMessage'));
          togglePopup("comment", false);
          togglePopup("success", true);
          setIsEditing(false);
          setEditingCommentId(null);
          dispatch(fetchPlaceComments(id));
        })
        .catch((error) => {
          
          togglePopup("comment", false);
          setCommentForm({
            text: "",
            rating: 0,
            errors: {
              text: '',
              rating: ''
            },
            touched: {
              text: false,
              rating: false
            }
          });

          // Check for the specific error about already posted review
          if (error.error === "An error ocurred" && error.detail === "You have already posted a review") {
            // Show toast message
            toast.warning(error.detail, "Error");
          } else {
            // Show generic error message for other errors
            toast.error(error.error_description || tDetail('errors.genericError'));
          }
        });
    }
  };

  useEffect(() => {
    let timer;
    if (popupState.success) {
      timer = setTimeout(() => {
        togglePopup("success", false);
        setSuccessMessage("");
        setSuccessTitle("");
      }, 5000); // 5 seconds in milliseconds
    }

    // Clean up the timer when the component unmounts or when popupState.success changes
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [popupState.success]);


  useEffect(() => {
    if (place) {
      setState({
        ...state,

        latitude: place.address.latitude,
        longitude: place.address.longitude

      })
      // dispatch(fetchGeoLocations({ type: "place"}));
    }

  }, [place]);

  const handleGenerateLink = () => {
    if (id) {
      dispatch(resetShareableLink());
      dispatch(generateLink(id));
    }
  }



  const toggleShareOptions = () => {
    setShowShareOptions(!showShareOptions);
  };

  useEffect(() => {
    if (shareableLink) {
      setShowShareOptions(true);
    }
    
  },[shareableLink])

  const handleNavActions = (e, id, action) => {
    
    if (isAuthenticated && action === "viewDetail") {
      navigate('/places/details', { state: { id } });
    } else if (action === "viewList") {
      navigate('/places');
    } else {
      togglePopup("alert", true);
      setAlertTitle(tCommon('authAlert.viewDetails.title'));
      setAlertMessage(tCommon('authAlert.viewDetails.description'));
    }
  };

  const handleNavigate = () => {
    navigate('/places')
  }

  useEffect(() => {

    return () => {
      dispatch(resetNearByPlaces());
      dispatch(resetShareableLink());
    }
    
  },[])


  return (
    <>
      {isOpen && popupState.map && (
        <MapPopup
        onClose={() => {
          togglePopup("map", false);
          setState(prev => ({ ...prev, latitude: "", longitude: "" }));
        }}
          categories={{}}
          ratings={{}}
          state={state}
          setState={setState}
          handleActions={handleActions}
        />
      )}

      {isOpen && popupState.gallery && (
        <Modal
          title={place.title}
          customClass="galleryReviewPopup"
          onClose={() => togglePopup("gallery", false)}
        >
          <ImageGalleryPopupContent images={place.images} />
          <ReviewSectionPopupContent placeDetails={place} reviews={comments} />
        </Modal>
      )}

      <TravelerReviews
        onClose={() => togglePopup("reviewDrawer", false)}
        isOpen={isOpen && popupState.reviewDrawer}
        showReviewDrawer={popupState.reviewDrawer}
        filters={filters}
        isLoading={isLoading}
        placeDetails={place}
        reviews={comments}
      />

      {isOpen && popupState.alert && (
        <Modal
          onClose={() => togglePopup("alert", false)}
          customClass="modalSmTypeOne"
        >
          <AlertPopup handleNavigateToLogin={handleNavigateToLogin}  title={tDetail("authAlert.title")}
  description={tDetail("authAlert.message")}
  buttonText={tDetail("authAlert.button")}/>
        </Modal>
      )}

      {isOpen && popupState.comment && (
        <Modal
          title={isEditing ? tDetail('commentPopup.editComment') : tDetail('commentPopup.addComment') }
          onClose={() => {
            togglePopup("comment", false);
            setCommentForm({
              text: "",
              rating: 0,
              errors: {
                text: '',
                rating: ''
              },
              touched: {
                text: false,
                rating: false
              }
            });
            setIsEditing(false);
            setEditingCommentId(null);
          }}
          customClass="modalMdTypeOne"
        >
          <CommentPopup
            title={place?.title}
            comment={commentForm.text}
            rating={commentForm.rating}
            errors={commentForm.errors}
            touched={commentForm.touched}
            onCommentChange={handleCommentChange}
            onRatingChange={handleRatingChange}
            onFieldBlur={handleFieldBlur}
            onSubmit={handleSubmitComment}
            isEditing={isEditing}
          />
        </Modal>
      )}

      {isOpen && popupState.deleteConfirm && (
        <Modal
          onClose={() => togglePopup("deleteConfirm", false)}
          customClass="modalSmTypeOne"
          hideCloseButton={true}
        >
          <ConfirmationPopup
            title={tDetail('confirmationPopup.deleteComment.title')}
            description={tDetail('confirmationPopup.deleteComment.description')}
            onCancel={() => togglePopup("deleteConfirm", false)}
            onConfirm={handleConfirmDelete}
          />
        </Modal>
      )}

      {isOpen && popupState.success && (
        <Modal
          title=""
          onClose={() => togglePopup("success", false)}
          customClass="modalSmTypeOne"
          hideCloseButton={true}
        >
          <SuccessMessagePopup
            title={successTitle}
            message={successMessage}
            onClose={() => togglePopup("success", false)}
          />
        </Modal>
      )}
      <div className={`${styles.lugaresContainer} ${popupState.reviewDrawer ? styles.overflowHide : ''}`}>

        <Header />
        <main className={styles.mainContent}>
          <div className="page-center">
            <div className={styles.contentWrapper}>
              {isLoading ? (
                <MapSectionSkeleton />
              ) : (
                <MapSection place={place} handleShowMapPopup={handleShowMapPopup} />
              )}
              <div className={styles.infoSection}>
                {isLoading ? (
                  <MuseumInfoSkeleton />
                ) : (
                  <MuseumInfo place={place} handleNavigateToWebsite={handleNavigateToWebsite} handleActions={handleFavClick}
                    isFavoriteToggling={isFavoriteToggling && favTogglingId === place?.id} handleGenerateLink={handleGenerateLink} showShareOptions={showShareOptions}
                    toggleShareOptions={toggleShareOptions}
                   />
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
              <p 
              className={styles.museumDescription}
              dangerouslySetInnerHTML={{ 
                __html: place?.description
                  ?.replace(/\n/g, '<br />')   // Replace all variations with single line breaks
              }} 
            />
            )}

            {isLoading ? (
              <ReviewSectionSkeleton />
            ) : (
              <ReviewSection handleClickSeeAllComments={handleClickSeeAllComments} handleClickAddComment={handleClickAddComment} handleClickEditComment={handleClickEditComment} handleClickDeleteComment={handleClickDeleteComment} comments={comments} placeDetails={place} />
            )}
            {isLoading ? (
              <WidgetSkeleton />
            ) : (
              <Widget data={NearByPlaces} title={tCommon("nearbyPlaces")} count={4} handleNavActions={handleNavActions}/>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default PlaceDetails;