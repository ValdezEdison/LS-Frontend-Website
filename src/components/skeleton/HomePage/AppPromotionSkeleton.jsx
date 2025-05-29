import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "../../HomePage/AppPromotion.module.css";

const AppPromotionSkeleton = () => {
  return (
    <section className={styles.appPromotion}>
      <div className="page-center">
        <div className={styles.promotionContent}>
          <div className={styles.promotionContentInner}>
            {/* Image skeleton - maintains same dimensions as your image */}
            <Skeleton 
              className={styles.promotionImage} 
              height={200}
              width={"100%"} // Adjust to match your image height
              containerClassName={styles.promotionImageWrapper}
            />
            
            {/* Title skeleton */}
            <h2 className={styles.promotionTitle}>
              <Skeleton width="70%" height={28} />
              <Skeleton width="70%" height={28} />
            </h2>
            
            {/* Description skeleton */}
            <div className={styles.promotionDescription}>
              <Skeleton count={3} width={["100%", "80%", "60%"]} />
            </div>
            
            {/* Button skeleton */}
            <Skeleton 
              className={""} 
              width={120} 
              height={40} 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppPromotionSkeleton;