import { Routes, Route, Navigate } from "react-router-dom";
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
import ItineraryDetails from "./pages/Itinerary/ItineraryDetails";
import ExplorePage from "./pages/ExplorePage/ExplorePage";
import EmailConfirmationPage from "./pages/register/EmailConfirmationPage";
import ProfilePage from "./pages/profile/ProfilePage";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
import MyTrips from "./pages/MyTrips/MyTrips";
import TripDetails from "./pages/MyTrips/TripDetails";
import TravelItinerary from "./pages/MyTrips/TravelItinerary";
const Router = () => {
    return (
        <>
            <ToastContainer />
            <Routes>

                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<TravelerRegistration />} />
                <Route path="/register/email-confirmation" element={<EmailConfirmationPage />} />
                <Route path="/verify-user-email" element={<EmailConfirmationPage />} />
                <Route path="/password-recovery" element={<PasswordRecoveryPage />} />

                <Route path="/profile" element={<Navigate to="/profile/personal" replace />} />
                <Route path="/profile/:tab" element={<ProfilePage />} />

                <Route path="/favorites" element={<FavoritesPage />} />
                
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
                {/* <Route path="/itineraries/details" element={<ItineraryDetails />} /> */}
                <Route path="/itineraries/details" element={<ItineraryDetail />} />

                <Route path="/explore" element={<ExplorePage />} />

                <Route path="/my-trips" element={<MyTrips />} />
                <Route path="/my-trips/details" element={<TripDetails/>} />
                <Route path="/my-trips/edit" element={<TravelItinerary/>} />
            </Routes>
        </>
    );
};

export default Router;