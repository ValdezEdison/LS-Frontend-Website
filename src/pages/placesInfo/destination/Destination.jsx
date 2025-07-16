// src/pages/placesInfo/destination/Destination.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { fetchDestinationBySlug } from "../../../features/places/placesInfo/destination/DestinationAction";
import { fetchOurPartners } from "../../../features/cms/Pages/PagesAction";
import Header from "../../../components/layouts/Header";
import Footer from "../../../components/layouts/Footer";
import DestinationInfo from "../../../components/PlacesInfo/Destination/DestinationInfo";
import Widget from "../../../components/common/Widget";
import PartnersSection from "../../../components/common/PartnersSection";
import DestinationInfoSkeleton from "../../../components/skeleton/PlacesPage/PlacesInfo/destination/DestinationInfoSkeleton";
import { LanguageContext } from "../../../context/LanguageContext";
import { useTranslation } from "react-i18next";

const Destination = () => {

  const dispatch = useDispatch();
  const { languageId } = useContext(LanguageContext);
  const { t: tCommon } = useTranslation('Common');
  const location = useLocation();
  
  // Get URL parameters
  const { country_slug, city_slug } = useParams();

  const pageUrl = window.location.href;
  
  // Select data from Redux store
  const { loading, destination, error } = useSelector((state) => state.destination);
  const { ourPartners, ourPartnersLoading } = useSelector((state) => state.cms.pages);
  const { loading: NearbyPlacesLoading, NearbyPlaces } = useSelector((state) => state.places);
 
  // Helper function to truncate description for meta tags
  const truncateDescription = (description, maxLength = 160) => {
    if (!description) return "";
    
    // Remove HTML tags if present
    const plainText = description.replace(/<[^>]+>/g, '');
    
    if (plainText.length <= maxLength) return plainText;
    
    // Truncate and add ellipsis
    return plainText.substring(0, maxLength - 3) + "...";
  };

  // Add detailed debugging
  // Fetch destination data
  useEffect(() => {
    if (country_slug && city_slug) {
      dispatch(fetchDestinationBySlug({ country_slug, city_slug }));
    }
  }, [dispatch, country_slug, city_slug]);
  
  // Fetch partners when language changes
  useEffect(() => {
    dispatch(fetchOurPartners(languageId));
  }, [dispatch, languageId]);
  
  // Add a debugging component to directly show what's in the state
 // const DebugInfo = () => (
  //  <div style={{ padding: '10px', background: '#f8f9fa', border: '1px solid #ddd', margin: '10px 0' }}>
   //   <h3>Debug Information:</h3>
  //    <p>Loading: {loading ? 'Yes' : 'No'}</p>
  //    <p>Error: {error ? JSON.stringify(error) : 'None'}</p>
  //    <p>Destination Data Available: {destination ? 'Yes' : 'No'}</p>
  //    {destination && (
  //      <div>
  //        <p>Name: {destination.name}</p>
  //        <p>ID: {destination.id}</p>
  //        <p>Country: {destination.country?.name}</p>
  //      </div>
    //  )}
   // </div>
  //);
  
   return (
    <HelmetProvider>
      <>
        {destination && (
          <Helmet>
            <title>{`${destination.name}, ${destination.country?.name}`}</title>
            <meta name="description" content={truncateDescription(destination.description)} />
            
            {/* Open Graph (Facebook, etc.) */}
            <meta property="og:title" content={`${destination.name}, ${destination.country?.name}`} />
            <meta property="og:description" content={truncateDescription(destination.description)} />
            <meta property="og:image" content={destination.images?.[0]?.fullsize || destination.images?.[0]?.original || "https://www.localsecrets.travel/images/app-local-secrets-logo-2-1.svg"} />
            <meta property="og:url" content={pageUrl} />
            <meta property="og:type" content="article" />
            
            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={`${destination.name}, ${destination.country?.name}`} />
            <meta name="twitter:description" content={truncateDescription(destination.description)} />
            <meta name="twitter:image" content={destination.images?.[0]?.fullsize || destination.images?.[0]?.original || "https://www.localsecrets.travel/images/app-local-secrets-logo-2-1.svg"} />
          </Helmet>
        )}
        
        {!destination && (
          <Helmet>
            <title>Destinations | Local Secrets</title>
            <meta name="description" content="Discover amazing destinations around the world with Local Secrets." />
          </Helmet>
        )}
        <Header />
        <div className="page-center">
          {loading ? (
            <DestinationInfoSkeleton />
          ) : error ? (
            <div>Error: {typeof error === 'string' ? error : JSON.stringify(error)}</div>
          ) : destination ? (
            <DestinationInfo destination={destination} />
          ) : (
            <div>Destination not found.</div>
          )}
          
          {NearbyPlacesLoading ? (
            <div>Loading nearby places...</div>
          ) : (
            <Widget data={NearbyPlaces} title={tCommon("nearbyPlaces")} count={4} seeMore={NearbyPlaces && NearbyPlaces.length > 4} />
          )}
        </div>
        <PartnersSection ourPartners={ourPartners} ourPartnersLoading={ourPartnersLoading} />
        <Footer />
      </>
    </HelmetProvider>
  );
};
export default Destination;