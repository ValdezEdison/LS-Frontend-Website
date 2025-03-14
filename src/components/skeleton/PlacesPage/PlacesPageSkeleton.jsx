import React from "react";
import SidebarSkeleton from "./SidebarSkeleton";
import { MainContentSkeleton } from "./PlaceSkeleton";
import PromotionalBannerSkeleton from "./PromotionalBannerSkeleton";
import styles from "../../../pages/places/PlacesPage.module.css";

const PlacesPageSkeleton = () => {
  return (
    <div className={styles.placesPage}>
      {/* <HeaderSkeleton /> */}
      <div className="page-center">
        <div className={styles.content}>

          <SidebarSkeleton />


          <MainContentSkeleton />

        </div>
        <div className={styles.content}>
          {/* <PromotionalBannerSkeleton /> */}
        </div>
      </div>
      {/* <NewsletterSkeleton />
      <FooterSkeleton /> */}
    </div>
  );
};

export default PlacesPageSkeleton;