import React from "react";
import FilterDropdown from "../common/FilterDropdown";
import styles from "./FilterBar.module.css";
import FilterBarSkeleton from "../skeleton/PlacesPage/FilterBarSkeleton";

const FilterBar = ({ filters, isLoading, isDrawer=false }) => {
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
    </div>
  );
};

export default FilterBar;