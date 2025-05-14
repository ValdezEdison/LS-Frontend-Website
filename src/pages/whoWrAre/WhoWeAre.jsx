"use client";
import React, { useEffect, useContext } from "react";
import styles from "./WhoWeAre.module.css";
import Header from "../../components/layouts/Header";
import Sidebar from "../../components/footerBlockPages/common/Sidebar";
import AboutContent from "../../components/footerBlockPages/whoWeAre/AboutContent";
import MissionSection from "../../components/footerBlockPages/whoWeAre/MissionSection";
import ValuesSection from "../../components/footerBlockPages/whoWeAre/ValuesSection";
import VisionSection from "../../components/footerBlockPages/whoWeAre/VisionSection";
import CompanyStats from "../../components/footerBlockPages/whoWeAre/CompanyStats";
import TeamStats from "../../components/footerBlockPages/whoWeAre/TeamStats";
import NewsLetterBanner from "../../components/footerBlockPages/common/NewsLetterBanner";
import Footer from "../../components/layouts/Footer";
import { fetchWhoWeAre } from "../../features/cms/Pages/PagesAction";
import { useDispatch, useSelector } from "react-redux";
import { LanguageContext } from "../../context/LanguageContext";
import AboutContentSkeleton from "../../components/skeleton/WhoWeArePage/AboutContentSkeleton";
import MissionSectionSkeleton from "../../components/skeleton/WhoWeArePage/MissionSectionSkeleton";
import ValuesSectionSkeleton from "../../components/skeleton/WhoWeArePage/ValuesSectionSkeleton";
import VisionSectionSkeleton from "../../components/skeleton/WhoWeArePage/VisionSectionSkeleton";
import CompanyStatsSkeleton from "../../components/skeleton/WhoWeArePage/CompanyStatsSkeleton";
import TeamStatsSkeleton from "../../components/skeleton/WhoWeArePage/TeamStatsSkeleton";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { PlaceHolderImg1 } from "../../components/common/Images";
import config from "../../config";

function WhoWeAre() {
  const { language, languageId } = useContext(LanguageContext);
  const { whoWeAre, whoWeAreLoading } = useSelector((state) => state.cms.pages);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWhoWeAre(languageId));
  }, [dispatch, language, languageId]);

  const isLoading = whoWeAreLoading || !whoWeAre?.[0];
  const data = whoWeAre?.[0];

  const backgroundImage = whoWeAre?.[0]?.hero_image?.url
  ? `${config.api.cmsBaseUrl}${whoWeAre[0].hero_image.url}`
  :  PlaceHolderImg1;


  return (
    <main className={styles.pageContainer}>
      <Header />
      <div className="page-center">
        <section className={styles.contentWrapper}>
          <Sidebar />
          {isLoading ? (
            <AboutContentSkeleton />
          ) : (
            <AboutContent 
              title={data.title} 
              description={data.description} 
            />
          )}
        </section>
      </div>
      
      {isLoading ? (
        <Skeleton height={400} className={styles.companyImage} />
      ) : (
        <img
          src={backgroundImage}
          alt={data.hero_image.alt || "Company image"}
          className={styles.companyImage}
        />
      )}
      
      <div className="page-center">
        <section className={styles.infoSectionsContainer}>
          {isLoading ? <MissionSectionSkeleton /> : <MissionSection mission={data.mission} />}
          <hr className={styles.sectionDivider} />
          {isLoading ? <ValuesSectionSkeleton /> : <ValuesSection values={data.values} />}
          <hr className={styles.sectionDivider} />
          {isLoading ? <VisionSectionSkeleton /> : <VisionSection vision={data.vision} />}
          <hr className={styles.sectionDivider} />
          {isLoading ? <CompanyStatsSkeleton /> : <CompanyStats stats={data.company_stats} />}
          <hr className={styles.sectionDivider} />
          {isLoading ? <TeamStatsSkeleton /> : <TeamStats stats={data.team_stats} />}
        </section>
      </div>
      
      <NewsLetterBanner 
        title="¿Quieres conocer más sobre la vida en Local Secrets?" 
        buttonText="Descubrir más"
      />
      <Footer />
    </main>
  );
}

export default WhoWeAre;