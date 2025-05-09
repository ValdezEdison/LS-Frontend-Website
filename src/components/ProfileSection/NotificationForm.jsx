import React from "react";
import styles from "./NotificationForm.module.css";
import { useTranslation } from "react-i18next";

const NotificationForm = ({ user }) => {
  const { t } = useTranslation('ProfileSection');

  return (
    <form className={styles.notificationForm}>
      <h1 className={styles.title}>{t('notifications.title')}</h1>
      <p className={styles.description}>
        {t('notifications.description')}
      </p>
      <div className={styles.divider} />

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('notifications.emailPreferences')}</h2>
        <p className={styles.email}>{user.email}</p>
      </div>

      <div className={styles.toggleSection}>
        <div className={styles.toggleLabel}>
          {t('notifications.toggleOptions.promotions.label')}
        </div>
        <div className={styles.toggleRightWrapper}>
          <label className={styles.switch}>
            <input type="checkbox" disabled />
            <span className={styles.slider}></span>
          </label>
          <span className={`${styles.toggleAction} ${styles.checkedd}`}>
            {t('notifications.toggleOptions.promotions.action')}
          </span>
        </div>
      </div>
      <div className={styles.divider} />

      <div className={styles.toggleSection}>
        <div className={styles.toggleLabel}>
          {t('notifications.toggleOptions.referFriend.label')}
        </div>
        <div className={styles.toggleRightWrapper}>
          <label className={styles.switch}>
            <input type="checkbox" disabled />
            <span className={styles.slider}></span>
          </label>
          <span className={styles.toggleAction}>
            {t('notifications.toggleOptions.referFriend.action')}
          </span>
        </div>
      </div>
      <div className={styles.divider} />

      <div className={styles.toggleSection}>
        <div className={styles.toggleLabel}>
          {t('notifications.toggleOptions.weeklyDiscovery.label')}
        </div>
        <div className={styles.toggleRightWrapper}>
          <label className={styles.switch}>
            <input type="checkbox" disabled />
            <span className={styles.slider}></span>
          </label>
          <span className={styles.toggleAction}>
            {t('notifications.toggleOptions.weeklyDiscovery.action')}
          </span>
        </div>
      </div>

      <div className={styles.btnWrapper}>
        <button type="submit" className={styles.saveButton} disabled>
          {t('notifications.actions.save')}
        </button>
      </div>
      <div className={styles.divider} />
    </form>
  );
};

export default NotificationForm;