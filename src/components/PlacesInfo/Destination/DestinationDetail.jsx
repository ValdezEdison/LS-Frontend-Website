import React from "react";
import styles from "./DestinationDetail.module.css";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import DestinationInfo from "../../components/DestinationDetailPage/DestinationInfo";
import NearbyPlaces from "../../components/DestinationDetailPage/NearbyPlaces";
import Partners from "../../components/DestinationDetailPage/Partners";

const DestinationDetail = () => {
  return (
    <>
      <Header />
      <DestinationInfo />
      <NearbyPlaces />
      <Partners />
      <Footer />
    </>
  );
};

export default DestinationDetail;
