import React from "react";
import styles from "./SearchInput.module.css";

const SuggestionItem = ({ id, text, onSelect, type = "", isUnified = false }) => {

  const handleClick = () => {
    if (isUnified) {
      onSelect(id, type);
    } else {
      onSelect(id);
    }
  };

  return (
    <div
      className={styles.suggestionItem}
      tabIndex="0"
      role="option"
      onClick={handleClick}
    >
      <div className="suggestionIcon" />
      <div className={styles.suggestionText}>{text}</div>
    </div>
  );
};

export default SuggestionItem;
