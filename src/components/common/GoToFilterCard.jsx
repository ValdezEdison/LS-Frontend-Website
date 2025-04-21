import { useTranslation } from "react-i18next";
import styles from "./GoToFilterCard.module.css";
import { PlaceFilter } from "./Images";
const GoToFilterCard = ({ index, handleActionFilter }) => {

    const { t } = useTranslation("Common");

    return (
        <div className={styles.placesBlueBanner} key={`banner-${index}`}>
            <div className={styles.placesBlueBannerLeft}>
                <img src={PlaceFilter} alt={t('banner.filterIconAlt')} />
            </div>
            <div className={styles.placesBlueBannerRight}>
                <div className={styles.placesBannerDescrption}>
                    <h3>{t('banner.title')}</h3>
                    <p>{t('banner.description')}</p>
                </div>
                <button className={styles.filterButton} onClick={handleActionFilter}>
                    {t('banner.button')}
                </button>
            </div>
        </div>
    );
}

export default GoToFilterCard