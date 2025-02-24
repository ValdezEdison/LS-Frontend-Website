import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from "./pages/home/HomePage";
import PlacesPage from "./pages/places/PlacesPage";

const Router = () => {
    return (
        <>
            <ToastContainer />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/places" element={<PlacesPage />} />
            </Routes>
        </>
    );
};

export default Router;