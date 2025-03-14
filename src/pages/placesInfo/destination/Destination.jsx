import React, { useEffect } from "react";
import Header from "../../../components/layouts/Header";
import Footer from "../../../components/layouts/Footer";
import DestinationInfo from "../../../components/PlacesInfo/Destination/DestinationInfo";
import NearbyPlaces from "../../../components/PlacesInfo/Destination/NearbyPlaces";
import Partners from "../../../components/PlacesInfo/Destination/Partners";
import { fetchDestinationInfo } from "../../../features/places/placesInfo/destination/DestinationAction";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const Destination = () => {

  const dispatch = useDispatch();

  const location = useLocation();
  const { id } = location.state || {};

  const { loading, destination } = useSelector((state) => state.destination);

  useEffect(() => {
    if (id) {
      dispatch(fetchDestinationInfo({ id }));
    }
  }, [dispatch]);
  return (
    <>
      <Header />
      <DestinationInfo destination={destination} />
      <NearbyPlaces />
      <Partners />
      <Footer />
    </>
  );
};

export default Destination;
