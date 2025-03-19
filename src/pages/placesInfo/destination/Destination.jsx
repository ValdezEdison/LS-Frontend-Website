import React, { useEffect, useState } from "react";
import Header from "../../../components/layouts/Header";
import Footer from "../../../components/layouts/Footer";
import DestinationInfo from "../../../components/PlacesInfo/Destination/DestinationInfo";
import Widget from "../../../components/common/Widget";
import Partners from "../../../components/PlacesInfo/Destination/Partners";
import { fetchDestinationInfo } from "../../../features/places/placesInfo/destination/DestinationAction";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchNearbyPlaces } from "../../../features/places/PlaceAction";
import WigetSkeleton from "../../../components/skeleton/common/WidgetSkeleton";
import DestinationInfoSkeleton from "../../../components/skeleton/PlacesPage/PlacesInfo/destination/DestinationInfoSkeleton";
import Modal from "../../../components/modal/Modal";
import ImageGalleryPopupContent from "../../../components/PlacesDetailPage/PlacesDetailPopup/ImageGalleryPopupContent";
import { openPopup, closePopup } from "../../../features/popup/PopupSlice";


const Destination = () => {

  const dispatch = useDispatch();

  const location = useLocation();
  const { id } = location.state || {};

  const { loading, destination } = useSelector((state) => state.destination);
  const {loading: NearbyPlacesLoading, NearbyPlaces } = useSelector((state) => state.places);
  const { isOpen } = useSelector((state) => state.popup);

  const [showImgGalleryPopup, setShowImgGalleryPopup] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchDestinationInfo({ id }));
      // dispatch(fetchNearbyPlaces(id));

    }
  }, [dispatch]);


    const handleClickViewMoreDetails = () => {
      setShowImgGalleryPopup(true);
      dispatch(openPopup());
    };
  
    const closeModal = () => {
      setShowImgGalleryPopup(false);
      dispatch(closePopup());
    };

  return (
    <>
    {isOpen && showImgGalleryPopup && (
      <Modal title={destination.name} onClose={closeModal}>
        <ImageGalleryPopupContent  images={destination.images} isWide={true}/>
      </Modal>
    )}
      <Header />
    {loading ? <DestinationInfoSkeleton /> : <DestinationInfo destination={destination} handleClickViewMoreDetails={handleClickViewMoreDetails} />}  
     {NearbyPlacesLoading ? <WigetSkeleton /> : <Widget data={NearbyPlaces} title="Otros lugares cercanos" count={4} />}
      <Partners />
      <Footer />
    </>
  );
};

export default Destination;
