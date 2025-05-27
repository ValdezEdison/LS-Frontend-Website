import React from "react";
import styles from "./PrivacySettings.module.css";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Loader from "../common/Loader";

const PrivacyContent = ({ user, handleManagePrivacy }) => {
  const { t } = useTranslation('ProfileSection');

  const { loading } = useSelector((state) => state.auth);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className={styles.mainSection}>
      <div className={styles.privacyContent}>
        <h1 className={styles.sectionTitle}>{t('privacy.title')}</h1>
        <p className={styles.sectionDescription}>
          {t('privacy.description')}
        </p>
        <hr className={styles.separator} />
        <div className={styles.privacySettings}>
          <div className={styles.settingsGroup}>
            <h2 className={styles.settingsTitle}>{t('privacy.settings.title')}</h2>
            <div className={styles.settingsDetails}>
              <p className={styles.userEmail}>{user?.email}</p>
              <p className={styles.settingsDescription}>
                {t('privacy.settings.description')}
              </p>
            </div>
          </div>
          <button className={styles.manageButton} onClick={handleManagePrivacy}>
            {t('privacy.actions.manage')}
          </button>
        </div>
        <hr className={styles.separator} />
      </div>
    </section>
  );
};

export default PrivacyContent;