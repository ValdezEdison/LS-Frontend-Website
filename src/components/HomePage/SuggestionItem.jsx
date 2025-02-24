import React from "react";
import styles from "./SearchInput.module.css";

const SuggestionItem = ({ text }) => {
  return (
    <div className={styles.suggestionItem} tabIndex="0" role="option">
      <div className={styles.suggestionIcon} />
      <div className={styles.suggestionText}>{text}</div>
    </div>
  );
};

export default SuggestionItem;
