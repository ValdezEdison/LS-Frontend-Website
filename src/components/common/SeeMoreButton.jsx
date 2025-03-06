import React from "react";
import styles from "./SeeMoreButton.module.css";

const SeeMoreButton = ({ onClick, loading, next, translate }) => {
  return (
    <div className={styles.seeMoreContainer}>
      {next && (
        <button
          className={styles.showMoreButton}
          onClick={onClick}
          disabled={loading}
        >
          {loading ? translate('loading') : translate('showMore')}
        </button>
      )}
    </div>
  );
};

export default SeeMoreButton;