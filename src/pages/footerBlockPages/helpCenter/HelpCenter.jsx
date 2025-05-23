"use client";
import React, { useState, useEffect, useContext } from "react";
import styles from "./HelpCenter.module.css";
import Header from "../../../components/layouts/Header";
import Footer from "../../../components/layouts/Footer";
import { Activity, Destinos, Fav, Itinerarios, Lugares, Misviajes, PlaceFilter, Preguntas, Ticket } from "../../../components/common/Images";
import { useDispatch, useSelector } from "react-redux";
import { LanguageContext } from "../../../context/LanguageContext";
import { fetchFaqBlocks } from "../../../features/cms/Pages/PagesAction";
import HelpCenterHeader from "../../../components/footerBlockPages/helpCenter/HelpCenterHeader";
import SearchSection from "../../../components/footerBlockPages/helpCenter/SearchSection";
import TopicsSection from "../../../components/footerBlockPages/helpCenter/TopicsSection";
import FAQSection from "../../../components/footerBlockPages/helpCenter/FAQSection";
import ContactSection from "../../../components/footerBlockPages/helpCenter/ContactSection";
import HelpCenterHeaderSkeleton from "../../../components/skeleton/FooterBlocksPages/HelpCenterHeaderSkeleton";
import SearchSectionSkeleton from "../../../components/skeleton/FooterBlocksPages/SearchSectionSkeleton";
import TopicsSectionSkeleton from "../../../components/skeleton/FooterBlocksPages/TopicsSectionSkeleton";
import FAQSectionSkeleton from "../../../components/skeleton/FooterBlocksPages/FAQSectionSkeleton";
import ContactSectionSkeleton from "../../../components/skeleton/FooterBlocksPages/ContactSectionSkeleton";



// Main component that combines all sections
function HelpCenter() {


  const { language, languageId } = useContext(LanguageContext);
  const { faqBlocks, faqBlocksLoading } = useSelector((state) => state.cms.pages);
  const [activeFaqBlock, setActiveFaqBlock] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(fetchFaqBlocks(languageId));
   
  }, [language]);

  useEffect(() => {
    if (faqBlocks && faqBlocks.length > 0) {
      // Find the first active FAQ block
      const firstActive = faqBlocks.find(block => block.is_active);
      setActiveFaqBlock(firstActive || faqBlocks[0]);
    }
  }, [faqBlocks]);

  return (
    <>
    <Header />
    <main className="page-center" >
      <div className={styles.mainWrapper}>
        <div className={styles.contentContainer}>
          <div className={styles.mainWrapper}>
          {faqBlocksLoading ? <HelpCenterHeaderSkeleton /> : <HelpCenterHeader />}
          {faqBlocksLoading ? <SearchSectionSkeleton /> : <SearchSection />}
          </div>
        </div>
        {faqBlocksLoading ? <TopicsSectionSkeleton /> : <TopicsSection />}
        {faqBlocksLoading ? <FAQSectionSkeleton /> : activeFaqBlock && <FAQSection faqBlock={activeFaqBlock} />}
      </div>
      
    </main>
    {faqBlocksLoading ? <ContactSectionSkeleton /> : <ContactSection />}
    <Footer />
    </>
  );
}

export default HelpCenter;
