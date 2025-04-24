import React from "react";
import styles from "./SearchBar.module.css";
import { Filter } from "./Images";
import SearchInput from "./SearchInput";
import CustomInput from "./CustomInput";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const EventSearch = ({togglePopup, handleSearch, state}) => {

  const location = useLocation();
  const isFavorites = location.pathname.includes('favorites')

  const { t } = useTranslation("Common");
  return (
    <div className={styles.eventSearch}>
      <div className={styles.searchContainer}>
        <h2 className={styles.searchTitle}>{t('events.searchTitle')}</h2>
        <form className={styles.searchForm}>
          <div className={styles.inputWrapper}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/c60a664a23f01dbed983b94542acfa8a942029c1?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
              alt=""
              className={styles.searchIcon}
            />
            <CustomInput
              type="text"
              placeholder={t("events.searchPlaceholder")}
              className={styles.searchInput}
              aria-label={t("events.searchPlaceholder")}
              value={state.keyword}
              onChange={(e) => handleSearch(e)}
            />
          </div>
        </form>
      </div>
      <div className={styles.actionButtons}>
       {!isFavorites &&  <button className={styles.mapButton} onClick={() => togglePopup('map', true)}>{t("seeMap")}</button>}
        <button className={styles.filterButton} onClick={() => togglePopup('filterPanel', true)}>{t("filters")} <img src={Filter}/></button>
      </div>
    </div>
  );
};

export default EventSearch;
