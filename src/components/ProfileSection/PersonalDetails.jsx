import React, { useState, useRef, useEffect } from "react";
import styles from "./PersonalDetails.module.css";
import { CalendarIcon, ProfilePlaceholder } from "../common/Images";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PersonalDetails = ({ 
  user, 
  phoneCodes, 
  personalDetails, 
  onPersonalDetailsChange, 
  onSave,
  onProfilePhotoClick
}) => {
  const [editingField, setEditingField] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);
  
  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
    { value: "prefer_not_to_say", label: "Prefer not to say" }
  ];

  const formatDate = (dateString) => {
    if (!dateString) return "Not provided";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const filteredPhoneCodes = phoneCodes.filter(code =>
    code.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    code.phone_code.includes(searchTerm)
  );

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

  const handleEditClick = (label) => {
    setEditingField(label);
  };

  const handleSave = () => {
    onSave();
    setEditingField(null);
  };

  const handleCancel = () => {
    onPersonalDetailsChange('firstName', user.first_name || "");
    onPersonalDetailsChange('lastName', user.last_name || "");
    onPersonalDetailsChange('email', user.email || "");
    onPersonalDetailsChange('phonePrefix', user.phone_prefix || "");
    onPersonalDetailsChange('phone', user.phone || "");
    // onPersonalDetailsChange('birthDate', user.birth_date ? new Date(user.birth_date) : null);
    // onPersonalDetailsChange('nationality', user.nationality || "");
    // onPersonalDetailsChange('gender', user.gender || "");
    // onPersonalDetailsChange('address', user.address || "");
    setEditingField(null);
  };

  const handlePhonePrefixSelect = (code) => {
    onPersonalDetailsChange('phonePrefix', code.phone_code);
    setIsDropdownOpen(false);
    setSearchTerm("");
  };

  const handleGenderChange = (e) => {
    onPersonalDetailsChange('gender', e.target.value);
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
      action: "none", // Changed to "none" to hide button
      verified: true,
    },
    { 
      label: "Phone Number", 
      value: user.phone ? `+${user.phone_prefix} ${user.phone}` : "Not provided", 
      action: "Edit" 
    },
    // {
    //   label: "Birth Date",
    //   value: formatDate(user.birth_date),
    //   action: "Edit"
    // },
    // {
    //   label: "Nationality",
    //   value: user.nationality || "Not provided",
    //   action: "Edit"
    // },
    // {
    //   label: "Gender",
    //   value: user.gender ? genderOptions.find(g => g.value === user.gender)?.label || user.gender : "Not provided",
    //   action: "Edit"
    // },
    // {
    //   label: "Address",
    //   value: user.address || "Not provided",
    //   action: "Edit"
    // }
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
        <div className={styles.profileImageWrapper} onClick={onProfilePhotoClick}>
          {!user.profile_picture?.original && <div className={styles.galleryEditOverlay}>
            <div className={styles.galleryEdit}>
            </div>
          </div>
          }
          <img
            src={user.profile_picture?.original ? user.profile_picture.original : ProfilePlaceholder}
            alt="Profile"
            className={styles.profileImage}
            onError={(e) => {
              e.target.src = ProfilePlaceholder;
            }}
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
                            value={personalDetails.firstName}
                            onChange={(e) => onPersonalDetailsChange('firstName', e.target.value)}
                            className={styles.editInput}
                          />
                        </div>
                        <div className={styles.valueRowFormGroup}>
                          <label>Last Name*</label>
                          <input
                            type="text"
                            value={personalDetails.lastName}
                            onChange={(e) => onPersonalDetailsChange('lastName', e.target.value)}
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
                            {personalDetails.phonePrefix ? (
                              <span className={styles.placeholderText}>+{personalDetails.phonePrefix}</span>
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
                                        personalDetails.phonePrefix === code.phone_code
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
                            value={personalDetails.phone}
                            onChange={(e) => onPersonalDetailsChange('phone', e.target.value)}
                          />
                        </div>
                      </div>
                    ) : detail.label === "Birth Date" ? (
                      <div className={`${styles.inputWithIcon} birthDate`}>
                        <img src={CalendarIcon} alt="Calendar"></img>
                          <DatePicker
                          selected={personalDetails.birthDate}
                          onChange={(date) => onPersonalDetailsChange('birthDate', date)}
                          dateFormat="MM/dd/yyyy"
                          placeholderText="Select birth date"
                          className={styles.editInput}
                          dropdownMode="select"
                          maxDate={new Date()}
                          isClearable
                        />
                      </div>
                    ) : detail.label === "Gender" ? (
                      <div className={styles.radioGroup}>
                        {genderOptions.map((option) => (
                          <label key={option.value} className={styles.radioOption}>
                            <input
                              type="radio"
                              name="gender"
                              value={option.value}
                              checked={personalDetails.gender === option.value}
                              onChange={handleGenderChange}
                              className={styles.radioInput}
                            />
                            <span className={styles.radioLabel}>{option.label}</span>
                          </label>
                        ))}
                      </div>
                    ) : (
                      <input
                        type="text"
                        value={personalDetails[detail.label.toLowerCase().replace(' ', '')] || ""}
                        onChange={(e) => onPersonalDetailsChange(
                          detail.label.toLowerCase().replace(' ', ''), 
                          e.target.value
                        )}
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
                  {detail.verified && !editingField && detail.label === "Email Address" && (
                    <p className={styles.emailNote}>
                      This email address is used for login and receiving all notifications
                    </p>
                  )}
                </div>
              </div>
            </div>
            {detail.action === "none" ? null : editingField === detail.label ? (
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
                onClick={() => handleEditClick(detail.label)}
                disabled={detail.action === "Info" || detail.action === "View"}
              >
                {detail.action}
              </button>
            )}
          </div>
          {editingField === detail.label && detail.action !== "none" && (
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