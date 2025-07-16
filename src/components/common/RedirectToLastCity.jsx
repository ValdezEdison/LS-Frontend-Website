// src/components/common/RedirectToLastCity.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectToLastCity = () => {
  const navigate = useNavigate();
  const lastCitySlugUrl = localStorage.getItem('lastCitySlugUrl');
  
  useEffect(() => {
    if (lastCitySlugUrl) {
      navigate(lastCitySlugUrl);
    } else {
      // If no last city, redirect to explore page or home
      navigate('/explore');
    }
  }, [navigate, lastCitySlugUrl]);
  
  return <div>Redirecting...</div>;
};

export default RedirectToLastCity;