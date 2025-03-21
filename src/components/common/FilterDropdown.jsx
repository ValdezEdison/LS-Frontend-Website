import React, { useState, useRef, useEffect } from "react";
import styles from "../PlacesPage/FilterBar.module.css";
import CustomInput from "./CustomInput";
import DatePicker from "react-datepicker"; // Import date picker
import "react-datepicker/dist/react-datepicker.css";

const FilterDropdown = ({ label, options = [], selectedId, onSelect, onSearch, searchQuery, disabled = false, checkbox = false, type = "select" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    if (!disabled) setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (id) => {
    let selectedArray = selectedId ? String(selectedId).split(",") : [];

    if (selectedArray.includes(String(id))) {
      selectedArray = selectedArray.filter((item) => item !== String(id));
    } else {
      selectedArray.push(String(id));
    }

    const updatedSelection = selectedArray.join(",");
    onSelect(updatedSelection);
  };



  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  console.log(selectedId, 'selectedId')

  return (
    <div className={`${styles.dropdown} ${disabled ? styles.disabled : ""}`} ref={dropdownRef}>
      <div className={styles.filterBlock} onClick={toggleDropdown}>
        <div className={`${styles.filterHeader} ${isOpen ? styles.open : ""}`}>
          <div className={styles.filterHeaderContent}>
            <div className={styles.filterLabel}>{label}</div>
            <div className={styles.filterTitle}>
              {type === "datePicker" && selectedId !== null && selectedId.startDate !== null
                ? `${selectedId.startDate?.toLocaleDateString() ?? ""} - ${selectedId.endDate?.toLocaleDateString() ?? ""}`
                : label}
            </div>
          </div>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/b177707cf3dcb933dc1e6538151f45728e247ea5114b8d8a465e0c87724ee044?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
            className={styles.dropdownIcon}
            alt="Toggle Dropdown"
          />
        </div>
      </div>

      {isOpen && !disabled && (
        <div className={styles.filterContent}>
          {type === "datePicker" ? (
            <DatePicker
              selectsRange={true}
              startDate={selectedId?.startDate}
              endDate={selectedId?.endDate}
              onChange={(dates) => {
                onSelect({ startDate: dates[0], endDate: dates[1] });
                setIsOpen(false); // Close dropdown after selecting date range
              }}
              isClearable={true}
              inline // Display the calendar inline
            />
          ) : (
            <>
              {onSearch && (
                <div className={styles.filterselectedItem}>
                  <div className={styles.filterselectedInputWrapper}>
                    <CustomInput
                      type="text"
                      name="search"
                      onChange={(e) => onSearch(e.target.value)}
                      value={searchQuery}
                      placeholder={`Search ${label}`}
                      className={styles.selectedItem}
                    />


                    {searchQuery.length > 0 && (
                      <div
                        className={styles.closeIcon}
                        role="button"
                        tabIndex="0"
                        aria-label="Close selection"
                        onClick={() => onSearch("")}
                      />
                    )}
                  </div>
                </div>
              )}
              <ul className={`${styles.filterChecklist} filter-check`}>
                {Array.isArray(options) && options.length > 0 ? ( options.map((option, index) => (
                  <li key={index} onClick={() => {
                    if (!checkbox) {
                      onSelect(option.id);
                      toggleDropdown();
                    }
                  }} onChange={!checkbox ? undefined : () => handleCheckboxChange(option.id)}>
                    {checkbox ? (
                      <label className="check-container">
                        <CustomInput
                          type="checkbox"
                          checked={String(selectedId).split(",").includes(String(option.id))}
                        />


                        <span className="checkmark"></span>
                        {option?.name || option?.title}
                      </label>
                    ) : (
                      option?.name || option?.title
                    )}

                  </li>
                        ))
                      ) : (
                        <div className={styles.filterNoResults}>No results</div>
                      )}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;