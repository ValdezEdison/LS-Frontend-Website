import React, { useState, useRef, useEffect } from "react";
import styles from "./PersonalDetails.module.css";
import { CalendarIcon, ProfilePlaceholder } from "../common/Images";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PersonalDetails = ({ user, phoneCodes }) => {
  const [editingField, setEditingField] = useState(null);
  const [editedValue, setEditedValue] = useState("");
  const [firstName, setFirstName] = useState(user.first_name || "");
  const [lastName, setLastName] = useState(user.last_name || "");
  const [birthDate, setBirthDate] = useState(user.birth_date ? new Date(user.birth_date) : null);
  const [phonePrefix, setPhonePrefix] = useState(user.phone_prefix || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);
  
  const formatDate = (dateString) => {
    if (!dateString) return "Not provided";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Filter phone codes based on search term
  const filteredPhoneCodes = phoneCodes.filter(code =>
    code.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    code.phone_code.includes(searchTerm)
  );

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEditClick = (label, currentValue) => {
    setEditingField(label);
    if (label === "Name") {
      setFirstName(user.first_name || "");
      setLastName(user.last_name || "");
    } else if (label === "Phone Number") {
      setPhonePrefix(user.phone_prefix || "");
      setPhone(user.phone || "");
    } else {
      setEditedValue(currentValue);
    }
  };

  const handleSave = () => {
    if (editingField === "Name") {
      console.log(`Saving Name: ${firstName} ${lastName}`);
    } else if (editingField === "Phone Number") {
      console.log(`Saving Phone: +${phonePrefix} ${phone}`);
    } else if (editingField === "Birth Date") {
      console.log(`Saving Birth Date: ${birthDate}`);
    } else {
      console.log(`Saving ${editingField}: ${editedValue}`);
    }
    setEditingField(null);
  };

  const handleCancel = () => {
    setEditingField(null);
  };

  const handleInputChange = (e) => {
    setEditedValue(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handlePhonePrefixSelect = (code) => {
    setPhonePrefix(code.phone_code);
    setIsDropdownOpen(false);
    setSearchTerm("");
  };

  const details = [
    { 
      label: "Profile Type", 
      value: user.current_trip.type || "Not provided", 
      action: "Info" 
    },
    { 
      label: "Name", 
      value: `${user.first_name} ${user.last_name}` || "Not provided", 
      action: "Edit" 
    },
    {
      label: "Email Address",
      value: user.email || "Not provided",
      action: "Edit",
      verified: true,
    },
    { 
      label: "Phone Number", 
      value: user.phone ? `+${user.phone_prefix} ${user.phone}` : "Not provided", 
      action: "Edit" 
    },
    {
      label: "Birth Date",
      value: formatDate(user.birth_date),
      action: "Edit"
    },
    {
      label: "Nationality",
      value: user.nationality || "Not provided",
      action: "Edit"
    },
    {
      label: "Gender",
      value: user.gender || "Not provided",
      action: "Edit"
    },
    {
      label: "Address",
      value: user.address || "Not provided",
      action: "Edit"
    }
  ];

  return (
    <div className={styles.personalDetails}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Personal Details</h2>
          <p className={styles.subtitle}>
            Update your personal information by editing the profile
          </p>
        </div>
        <div className={styles.profileImageWrapper}>
          <div className={styles.galleryEditOverlay}>
            <div className={styles.galleryEdit}></div>
          </div>
          <img
            src={user.profile_picture?.fullsize || ProfilePlaceholder}
            alt="Profile"
            className={styles.profileImage}
          />
        </div>
      </div>
      {details.map((detail, index) => (
        <React.Fragment key={index}>
          <div className={styles.detailRow}>
            <div className={styles.labelValue}>
              <span className={styles.label}>{detail.label}</span>
              <div className={styles.valueRow}>
                <div className={styles.valueRowTop}>
                  {editingField === detail.label ? (
                    detail.label === "Name" ? (
                      <div className={styles.formNameGroup}>
                        <div className={styles.valueRowFormGroup}>
                          <label>First Name*</label>
                          <input
                            type="text"
                            value={firstName}
                            onChange={handleFirstNameChange}
                            className={styles.editInput}
                          />
                        </div>
                        <div className={styles.valueRowFormGroup}>
                          <label>Last Name*</label>
                          <input
                            type="text"
                            value={lastName}
                            onChange={handleLastNameChange}
                            className={styles.editInput}
                          />
                        </div>
                      </div>
                    ) : detail.label === "Phone Number" ? (
                      <div className={styles.phoneInputGroup}>
                        <div className={`${styles.phoneInput} ${isDropdownOpen ? styles.open : ""}`}>
                          <div 
                            className={styles.phoneCodeWrapper} 
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          >
                            {phonePrefix ? (
                              <span className={styles.placeholderText}>+{phonePrefix}</span>
                            ) : (
                              <span className={styles.placeholderText}>Code</span>
                            )}
                            <span className={isDropdownOpen ? styles.arrowUp : styles.arrowDown}></span>
                          </div>
                          {isDropdownOpen && (
                            <div 
                              className={styles.phoneCodeDropdownWrapperOuter}
                              ref={dropdownRef}
                            >
                              <div className={styles.phoneCodeinputWrapper}>
                                <input
                                  type="text"
                                  placeholder="Search country"
                                  className={styles.selectedItem}
                                  value={searchTerm}
                                  onChange={(e) => setSearchTerm(e.target.value)}
                                  autoFocus
                                />
                              </div>
                              <ul className={styles.droplist}>
                                {filteredPhoneCodes.length > 0 ? (
                                  filteredPhoneCodes.map((code) => (
                                    <li
                                      key={code.code}
                                      onClick={() => handlePhonePrefixSelect(code)}
                                      className={
                                        phonePrefix === code.phone_code
                                          ? styles.selectedItem
                                          : ""
                                      }
                                    >
                                      +{code.phone_code} {code.name}
                                    </li>
                                  ))
                                ) : (
                                  <li className={styles.selectedItem}>No countries found</li>
                                )}
                              </ul>
                            </div>
                          )}
                          <input
                            type="tel"
                            placeholder="Phone number"
                            className={styles.editInput}
                            value={phone}
                            onChange={handlePhoneChange}
                          />
                        </div>
                      </div>
                    ) : detail.label === "Birth Date" ? (
                      <div className={`${styles.inputWithIcon} birthDate`}>
                        <img src={CalendarIcon} alt="Calendar"></img>
                          <DatePicker
                          selected={birthDate}
                          onChange={(date) => setBirthDate(date)}
                          dateFormat="MM/dd/yyyy"
                          placeholderText="Select birth date"
                          className={styles.editInput}
                          showYearDropdown
                          dropdownMode="select"
                          maxDate={new Date()}
                          isClearable
                        />
                      </div>
                     
                    ) : (
                      <input
                        type="text"
                        value={editedValue}
                        onChange={handleInputChange}
                        className={styles.editInput}
                      />
                    )
                  ) : (
                    <span className={styles.value}>{detail.value}</span>
                  )}
                  {detail.verified && !editingField && (
                    <span className={styles.verifiedBadge}>Verified</span>
                  )}
                </div>
                <div className={styles.valueRowBottom}>
                  {detail.verified && !editingField && (
                    <p className={styles.emailNote}>
                      This email address is used for login and receiving all notifications
                    </p>
                  )}
                </div>
              </div>
            </div>
            {editingField === detail.label ? (
              <div className={styles.editActions}>
                <button 
                  className={`${styles.actionButton} ${styles.cancelButton}`}
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button 
                className={styles.actionButton}
                onClick={() => handleEditClick(detail.label, detail.value)}
                disabled={detail.action === "Info" || detail.action === "View"}
              >
                {detail.action}
              </button>
            )}
          </div>
          {editingField === detail.label && (
            <div className={styles.saveButtonWrapper}>
              <button 
                className={`${styles.actionButton} ${styles.saveButton}`}
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          )}
          {index < details.length - 1 && <div className={styles.separator} />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default PersonalDetails;