import React from "react";
import styles from "../../../pages/whoWrAre/WhoWeAre.module.css";
import { PlaceHolderImg3 } from "../../common/Images";
import config from "../../../config";
import { useTranslation } from "react-i18next";

const ValuesSection = ({ values }) => {

  const { t } = useTranslation("WhoWeAre");

const handleImage = (url) => {
  if ( url === null || url === undefined) {
    return PlaceHolderImg3
  }else{
    return `${config.api.cmsBaseUrl}${url}`
  }
};

  return (
    <>
      <h2 className={styles.valuesTitle}>{t('values.title')}</h2>
      <div className={styles.valuesContainer}>
        {values.map((value, index) => (
          <div className={styles.valueItem} key={index}>
            <div className={`${styles.valueIcon} ${styles.placeholder}`}>
              <img src={handleImage(value?.icon?.url)} />
            </div>
            <div className={styles.valueText}>{value.title}</div>
          </div>
        ))}

        {/* <div className={styles.valueItem}>
          <div className={`${styles.valueIcon} ${styles.grey}`} />
          <div className={styles.valueText}>Valor 2</div>
        </div>
        <div className={styles.valueItem}>
          <div className={`${styles.valueIcon} ${styles.grey}`} />
          <div className={styles.valueText}>Valor 3</div>
        </div> */}
      </div>
    </>
  );
};

export default ValuesSection;