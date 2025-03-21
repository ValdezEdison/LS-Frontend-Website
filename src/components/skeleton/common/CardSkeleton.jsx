import styles from "../../common/PlaceCard.module.css";
import { PlaceHolderImg2 } from "../../common/Images";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const CardSkeleton = () => {
    return (
      <div className={styles.placeCard}>
        <div className={styles.placeImageContainer}>
          <img src={PlaceHolderImg2} alt="" />
        </div>
        <div className={styles.placeInfo}>
          <Skeleton height={20} width={200} />
          <Skeleton height={20} width={150} />
          <Skeleton height={20} width={120} />
          <Skeleton height={30} width={100} />
        </div>
        <div className={styles.placeActions}>
          <Skeleton height={40} width={`45%`} />
          <Skeleton height={40} width={`45%`} />
        </div>
      </div>
    );
  };

  export default CardSkeleton