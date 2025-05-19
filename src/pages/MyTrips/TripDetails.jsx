import React, { useState, useEffect, useContext } from "react";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import TripInfo from "../../components/TripDetails/TripInfo";
import StopList from "../../components/TripDetails/StopList";
import SimilarPlaces from "../../components/TripDetails/SimilarPlaces";
import ItineraryMap from "../../components/PlacesInfo/Itineries/ItineraryMap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchTripDetails, fetchSimilarStops, fetchTravelTime, downloadTrip } from "../../features/myTrips/MyTripsAction";
import { LanguageContext } from "../../context/LanguageContext";
import Widget from "../../components/common/Widget";
import { WidgetSkeleton } from "../../components/skeleton/common/WidgetSkeleton";
import { resetTripDetails, resetDownloadedTrip } from "../../features/myTrips/MyTripsSlice";
import { useTranslation } from "react-i18next";

const TripDetails = () => {

  const location = useLocation();

  const { id } = location.state;

  const [formState, setFormState] = useState({
     
      mode: 'driving',
      page: 1
    
    });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { t } = useTranslation('MyTrips');

  const { language } = useContext(LanguageContext);
  const { tripDetails, similarStops, loading, similarStopsLoading, downloadedTrip } = useSelector((state) => state.myTrips);

  

  useEffect(() => {
    if(id){
      dispatch(fetchTripDetails(id));
      dispatch(fetchSimilarStops({page: 1, tripId: id}));
      dispatch(fetchTravelTime({ travelId: id, mode: formState.mode }));
    }

    return () => {
      dispatch(resetTripDetails());
    }
    
  }, [language, id, dispatch]);

  const handleViewMoreDetails = (e,id) => {
    ;
    navigate('/places/details', { state: { id } });
  };

  const handleActions = (e, action, id) => {
   if(action === 'editTrip') {
    navigate('/my-trips/edit', { state: { id: id } });
   }
  };

    useEffect(() => {
      if (formState.mode) {
        dispatch(fetchTravelTime({ travelId: id, mode: formState.mode }));
      }
    }, [formState.mode, dispatch, id]);

     const handleClickDownloadTrip = () => {
        if (id) {
          dispatch(resetDownloadedTrip());
          dispatch(downloadTrip(id));
        }
      }

       useEffect(() => {
          if (downloadedTrip) {
            // Create a blob from the PDF data
            const blob = new Blob([downloadedTrip], { type: 'application/pdf' });
      
            // Create a URL for the blob
            const url = window.URL.createObjectURL(blob);
      
            // Create a temporary anchor element to trigger the download
            const a = document.createElement('a');
            a.href = url;
            a.download = `${tripDetails?.title || 'trip'}.pdf`;
            document.body.appendChild(a);
            a.click();
      
            // Clean up
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
          }
        }, [downloadedTrip, tripDetails?.title]);


  return (
    <>
      <Header />
      <main className="page-center">
        <TripInfo handleActions={handleActions} id={id} tripDetails={tripDetails} loading={loading}/>
        <ItineraryMap places={tripDetails?.stops} formState={formState} setFormState={setFormState} />
        {/* {tripDetails?.stops?.length > 0 && ( */}
        <StopList tripDetails={tripDetails} handleViewMoreDetails={handleViewMoreDetails} setFormState={setFormState} handleClickDownloadTrip={handleClickDownloadTrip}/>
        {/* )} */}
        {similarStopsLoading ? (
              <WidgetSkeleton />
            ) : (
              <Widget data={similarStops} title={t('tripDetails.similarPlaces')} count={4} seeMore={false}/>
            )}
      </main>
      <Footer />
    </>
  );
};

export default TripDetails;
