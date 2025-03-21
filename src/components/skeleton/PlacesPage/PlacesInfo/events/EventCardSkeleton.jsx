import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import the skeleton CSS
import styles from "../../../../PlacesInfo/Events/EventCard.module.css";
import { PlaceHolderImg2 } from "../../.././/../common/Images"

function EventCardSkeleton() {
  return (
    <div className={styles.eventCard}>
      <div className={styles.eventImageContainer}>
      <img src={PlaceHolderImg2} alt="" />
        {/* <div className={styles.favIcon}></div> */}
      </div>
      
      <div className={styles.eventInfo}>
        <Skeleton width={150} height={20} />
        <Skeleton width={120} height={15} />
        <Skeleton width={100} height={15} />
        <Skeleton width={80} height={15} />
      </div>
      <div className={styles.eventActions}>
        <Skeleton width={100} height={30} />
        <Skeleton width={100} height={30} />
      </div>
    </div>
  );
}

export default EventCardSkeleton;