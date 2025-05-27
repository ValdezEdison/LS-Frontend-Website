import React from "react";
import styles from "./NotificationForm.module.css";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Loader from "../common/Loader";

const NotificationForm = ({ user,   notificationPreferences, onPreferenceChange }) => {
  const { t } = useTranslation('ProfileSection');

  const handleToggleChange = (field) => (e) => {
    onPreferenceChange(field, e.target.checked);
  };

  const getToggleAction = (preferenceKey, translationPath) => {
    const isChecked = notificationPreferences[preferenceKey];
    return t(`${translationPath}.${isChecked ? 'actionUnsubscribed' : 'actionSubscribed'}`);
  };

  const { loading } = useSelector((state) => state.auth);

  if (loading) {
    return <Loader />;
  }

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
            <input type="checkbox"  checked={notificationPreferences.is_promotion} 
              onChange={handleToggleChange('is_promotion')}/>
            <span className={styles.slider}></span>
          </label>
          <span className={`${styles.toggleAction} ${styles.checkedd}`}>
          {getToggleAction('is_promotion', 'notifications.toggleOptions.promotions')}
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
            <input type="checkbox"   checked={notificationPreferences.is_recommendation} 
              onChange={handleToggleChange('is_recommendation')}/>
            <span className={styles.slider}></span>
          </label>
          <span className={styles.toggleAction}>
          {getToggleAction('is_recommendation', 'notifications.toggleOptions.referFriend')}
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
            <input type="checkbox" checked={notificationPreferences.is_weekly_discovery} 
              onChange={handleToggleChange('is_weekly_discovery')}/>
            <span className={styles.slider}></span>
          </label>
          <span className={styles.toggleAction}>
          {getToggleAction('is_weekly_discovery', 'notifications.toggleOptions.weeklyDiscovery')}
          </span>
        </div>
      </div>

      <div className={styles.btnWrapper}>
        {/* <button className={styles.saveButton}>
          {t('notifications.actions.save')}
        </button> */}
      </div>
      <div className={styles.divider} />
    </form>
  );
};

export default NotificationForm;