import React from "react";
import FilterDropdown from "../common/FilterDropdown";
import styles from "./FilterBar.module.css";
import { useTranslation } from "react-i18next";
import FilterBarSkeleton from "../skeleton/PlacesPage/FilterBarSkeleton";
import { useSelector } from "react-redux";

const FilterBar = ({ state, setState, countries, cities, updateState }) => {
  const { t } = useTranslation("Places");
  const { loading } = useSelector((state) => state.cities);
  const { loading: countriesLoading } = useSelector((state) => state.countries);
  
  const orderOptions = t("filter.orderOptions", { returnObjects: true }).map((option, index) => ({
    id: index,
    name: option,
  }));

  return (

    <div className={styles.destinationFilter}>
      {/* {loading || countriesLoading ? <FilterBarSkeleton /> : ( */}
        <>
          <FilterDropdown
            label={`${t("filter.select")} ${t("filter.country")}`}
            options={countries}
            selectedId={state.selectedCountryId}
            onSelect={(value) => updateState("selectedCountryId", value)}
            onSearch={(query) => updateState("searchQuery", query)}
            searchQuery={state.searchQuery}
          />

          <FilterDropdown
            label={`${t("filter.select")} ${t("filter.destination")}`}
            options={cities}
            selectedId={state.selectedDestinations}
            onSelect={(value) => setState((prevState) => ({ ...prevState, selectedDestinations: value, selectedDestinationId: null }))}
            onSearch={(query) => updateState("destinationSearchQuery", query)}
            searchQuery={state.destinationSearchQuery}
            disabled={!state.selectedCountryId}
            checkbox={true}
          />

          <FilterDropdown
            label={`${t("filter.select")} ${t("filter.sortBy")}`}
            options={orderOptions}
            selectedId={state.selectedOrder}
            onSelect={(value) => updateState("selectedOrder", value)}
            searchQuery={''}
          />
        </>
      {/* )
      } */}
    </div>
  );
};

export default FilterBar;