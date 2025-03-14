import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from "./pages/home/HomePage";
import PlacesPage from "./pages/places/PlacesPage";
import PlaceDetails from "./pages/placesDetail/PlaceDetails";
import Destination from "./pages/placesInfo/destination/Destination";
import Events from "./features/places/placesInfo/events/Events";
const Router = () => {
    return (
        <>
            <ToastContainer />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/places" element={<PlacesPage />} />
                <Route path="/places/details" element={<PlaceDetails />} />
                <Route path="/places/destination" element={<Destination />} />
                <Route path="/places/events" element={<Events />} />
            </Routes>
        </>
    );
};

export default Router;