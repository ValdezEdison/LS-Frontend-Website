// src/pages/footerBlockPages/ambassadors/Ambassadors.jsx
"use client";

import React, { useEffect, useContext } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { fetchAmbassadorBlocks } from "../../../features/cms/Blocks/BlocksAction";
import { LanguageContext } from "../../../context/LanguageContext";
import Loader from "../../../components/common/Loader";
import Header from "../../../components/layouts/Header";
import Footer from "../../../components/layouts/Footer";
import HeroSection from "../../../components/footerBlockPages/ambassadors/HeroSection";
import BenefitsSection from "../../../components/footerBlockPages/ambassadors/BenefitsSection";
import TestimonialsSection from "../../../components/footerBlockPages/ambassadors/TestimonialsSection";
import ContactSection from "../../../components/footerBlockPages/ambassadors/ContactSection";
import styles from "./Ambassadors.module.css";

 
function AmbassadorsPage() {
  const dispatch = useDispatch();
  const { languageId } = useContext(LanguageContext);
  
  // Add detailed logging
  const { loading, error, blocks } = useSelector((state) => {
    console.log('Full Redux state:', state);
    console.log('Blocks state:', state.cms.blocks);
    console.log('CMS state:', state.cms);
    return state.cms;
  });

const ambassadorData = blocks?.ambassadorBlocks?.[0] || null;
  console.log('Ambassador data:', ambassadorData);

  useEffect(() => {
    console.log('Fetching ambassador blocks for languageId:', languageId);
    dispatch(fetchAmbassadorBlocks(languageId))
      .then((action) => {
        console.log('Dispatch completed:', action);
        console.log('Payload:', action.payload);
      })
      .catch((err) => {
        console.error('Dispatch error:', err);
      });
  }, [dispatch, languageId]);

  if (loading) {
    console.log('Loading state');
    return <Loader />;
  }

  if (error) {
    console.error('Error state:', error);
    return <div>Error loading content: {error}</div>;
  }

  if (!ambassadorData) {
    console.warn('No ambassador data found. Blocks:', blocks);
    return  <Loader />;
  }
  console.log('Rendering AmbassadorPage with data:', ambassadorData);
 

  return (
    <div className={styles.container}>
      <Header />
      <main className="page-center" >  
        <HeroSection
               title={ambassadorData.title}
          description={ambassadorData.description}
          heroImage={ambassadorData.hero_image}
          heroTextColor={ambassadorData.hero_text_color}
        />
        <BenefitsSection 
          benefits={ambassadorData.hero_texts} 
          subtitle={ambassadorData.subtitle}
        />
        <TestimonialsSection 
          testimonials={ambassadorData.review_cards}
          subtitle={ambassadorData.traveler_subtitle}
          description={ambassadorData.traveler_description}
        />
        <ContactSection 
          title={ambassadorData.cta_title}
          description={ambassadorData.cta_description}
          images={ambassadorData.cta_images}
        />
      </main>
      <Footer />
    </div>
  );
}

export default AmbassadorsPage;



