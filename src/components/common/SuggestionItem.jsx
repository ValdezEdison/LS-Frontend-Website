import React from "react";
import styles from "./SearchInput.module.css";

const SuggestionItem = ({ id, text, onSelect }) => {
  return (
    <div
      className={styles.suggestionItem}
      tabIndex="0"
      role="option"
      onClick={() => onSelect(id)}
    >
      <div className={styles.suggestionIcon} />
      <div className={styles.suggestionText}>{text}</div>
    </div>
  );
};

export default SuggestionItem;
