import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './PageNotFound.module.css';

const PageNotFound = ({ type, content, message }) => {
  const { t } = useTranslation('PageNotFound');

  const handleBack = () => {
    window.history.back();
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <div className={styles.pageContainer}>
      <title>{type === t('pageNotFound.404') ? type : t('errorBoundary.oops')}</title>

      <div className={styles.pageCenter}>
        <div className={styles.notfoundPage}>
          <div className={styles.pagecenter}>
            <div className={styles.contentwrap}>
              <img src="/images/oops-img.svg" alt="Error illustration" />
              <h2>{type === t('pageNotFound.404') ? type : t('errorBoundary.oops')}</h2>
              <p className={styles.notfound}>{type === t('pageNotFound.404') ? content : t('errorBoundary.content')}</p>
              <p>{type === t('pageNotFound.404') ? message : t('errorBoundary.message')}</p>
              {type !== t('pageNotFound.404') && (
                <button className={styles.ctaButton} onClick={handleBack}>
                  <span>{t('errorBoundary.backButton')}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
