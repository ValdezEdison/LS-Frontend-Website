import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from "./pages/home/HomePage";
import PlacesPage from "./pages/places/PlacesPage";
import PlaceDetails from "./pages/placesDetail/PlaceDetails";
import Destination from "./pages/placesInfo/destination/Destination";
import Events from "./pages/placesInfo/events/Events";
import Places from "./pages/placesInfo/places/Places";
import ItineraryList from "./pages/placesInfo/itineries/ItineraryList";
import ItineraryDetail from "./pages/placesInfo/itineries/ItineraryDetail";
import LoginPage from "./pages/login/LoginPage";
import TravelerRegistration from "./pages/register/TravelerRegistration";
import PasswordRecoveryPage from "./pages/PasswordRecovery/PasswordRecoveryPage";
import EventsPage from "./pages/events/EventsPage";
import EventDetails from "./pages/events/EventDetails";
import ItineraryPage from "./pages/Itinerary/ItineraryPage";
const Router = () => {
    return (
        <>
            <ToastContainer />
            <Routes>

                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<TravelerRegistration />} />
                <Route path="/password-recovery" element={<PasswordRecoveryPage />} />

                <Route path="/" element={<HomePage />} />
                <Route path="/places" element={<PlacesPage />} />
                <Route path="/places/details" element={<PlaceDetails />} />
                <Route path="/places/destination" element={<Destination />} />
                <Route path="/places/events" element={<Events />} />
                <Route path="/places/destination-places" element={<Places />} />
                <Route path="/places/itineraries" element={<ItineraryList />} />
                <Route path="/places/itineraries-details" element={<ItineraryDetail />} />

                <Route path="/events" element={<EventsPage />} />
                <Route path="/events/details" element={<EventDetails />} />

                <Route path="/itineraries" element={<ItineraryPage />} />
            </Routes>
        </>
    );
};

export default Router;