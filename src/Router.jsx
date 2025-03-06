import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from "./pages/home/HomePage";
import PlacesPage from "./pages/places/PlacesPage";
import PlaceDetails from "./pages/placesDetail/PlaceDetails";

const Router = () => {
    return (
        <>
            <ToastContainer />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/places" element={<PlacesPage />} />
                <Route path="/places/details" element={<PlaceDetails />} />
            </Routes>
        </>
    );
};

export default Router;