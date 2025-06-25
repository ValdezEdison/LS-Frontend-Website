import React from "react";
import FilterDropdown from "../common/FilterDropdown";
import styles from "./FilterBar.module.css";
import FilterBarSkeleton from "../skeleton/PlacesPage/FilterBarSkeleton";
import styles2 from "../PlacesPage/MainContent.module.css";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const FilterBar = ({ filters, isLoading, isDrawer=false, onSearch = () => {} }) => {

  const { t } = useTranslation("Places");
  const location = useLocation();

  const isPlacesPage = location.pathname === "/places";
  

  return (
    <div className={styles.destinationFilter}>
   
        <>
          {filters.map((filter, index) => (
            <FilterDropdown
              key={index}
              label={filter.label}
              options={filter.options}
              selectedId={filter.selectedId}
              onSelect={filter.onSelect}
              onSearch={filter.onSearch}
              searchQuery={filter.searchQuery}
              disabled={filter.disabled}
              checkbox={filter.checkbox}
              type={filter.type}
            />
          ))}
        </>
        {isPlacesPage &&
          <button className={styles2.loginButton} onClick={(e) => onSearch(e)}>{t("searchPlaces")}</button>
        }
    </div>
  );
};

export default FilterBar;