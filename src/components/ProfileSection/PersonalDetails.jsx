import React, { useState, useRef, useEffect } from "react";
import styles from "./PersonalDetails.module.css";
import { CalendarIcon, ProfilePlaceholder } from "../common/Images";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";

const PersonalDetails = ({ 
  user, 
  phoneCodes, 
  personalDetails, 
  onPersonalDetailsChange, 
  onSave,
  onProfilePhotoClick,
  groups
}) => {
  const [editingField, setEditingField] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);
  const [showGroupsInfo, setShowGroupsInfo] = useState(false);

  const { t } = useTranslation('ProfileSection');

  // const toggleGroupsInfo = () => {
  //   setShowGroupsInfo(!showGroupsInfo);
  // };
  
  const genderOptions = [
    { value: "male", label: t('personalDetails.genderOptions.male') },
    { value: "female", label: t('personalDetails.genderOptions.female') },
    { value: "other", label: t('personalDetails.genderOptions.other') },
    { value: "prefer_not_to_say", label: t('personalDetails.genderOptions.preferNotToSay') }
  ];

  const formatDate = (dateString) => {
    if (!dateString) return t('personalDetails.status.notProvided');
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
    // { 
    //   label: "Profile Type", 
    //   value: user?.current_trip?.type || "Not provided", 
    //   action: "Info" 
    // },
    { 
      label: t('personalDetails.fields.profileType'), 
      value: user?.current_trip?.type || groups.find(g => g.name === user?.group)?.name || "", 
      action: t('personalDetails.actions.info'),
      // onClick: toggleGroupsInfo
    },
    { 
      label: t('personalDetails.fields.name'), 
      value: `${user?.first_name} ${user?.last_name}` || "", 
      action: t('personalDetails.actions.edit')
    },
    {
      label: t('personalDetails.fields.email'),
      value: user?.email || "",
      action: "none",
      verified: true,
    },
    { 
      label: t('personalDetails.fields.phone'), 
      value: user?.phone ? `${user?.phone_prefix} ${user?.phone}` : "", 
      action: t('personalDetails.actions.edit')
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
          <h2 className={styles.title}>{t('personalDetails.title')}</h2>
          <p className={styles.subtitle}>
          {t('personalDetails.subtitle')}
          </p>
        </div>
        <div className={styles.profileUserDetail}>
           <div className={styles.profileImageWrapper}>
              <div className={styles.galleryEditOverlay}>
                <div className={styles.galleryEdit} onClick={onProfilePhotoClick}>
                </div>
              </div>
              <img
                src={user?.profile_picture?.original ? user.profile_picture.original : ProfilePlaceholder}
                alt="Profile"
                className={styles.profileImage}
                onError={(e) => {
                  e.target.src = ProfilePlaceholder;
                }}
              />
          
            </div>
            <div className={styles.userInfo}>
              <p className={styles.username}>{user?.username}</p>
              <p className={styles.tripStats}>
                {/* {user?.num_of_past_travels || 0} trips made, {user?.visited_places || 0} places visited and {user?.visited_events || 0} events seen */}
                {t('personalDetails.user_stats', {
                trips: user?.num_of_past_travels || 0,
                places: user?.visited_places || 0,
                events: user?.visited_events || 0
              })}
              </p>
            </div>
        </div>
       
        
      </div>
      

   


      {details.map((detail, index) => (
        <React.Fragment key={index}>
          <div className={styles.detailRow}>
            <div className={`${styles.labelValue} ${
                editingField === t('personalDetails.fields.profileType') ? styles.profileTypeLabel : ''
              }`}>
              <span className={styles.label}>{detail.label}</span>
              <div className={styles.valueRow}>
                <div className={styles.valueRowTop}>
                  {editingField === detail.label ? (
                    detail.label === t('personalDetails.fields.name') ? (
                      <div className={styles.formNameGroup}>
                        <div className={styles.valueRowFormGroup}>
                          <label>{t('personalDetails.labels.firstName')}*</label>
                          <input
                            type="text"
                            value={personalDetails.firstName}
                            onChange={(e) => onPersonalDetailsChange('firstName', e.target.value)}
                            className={styles.editInput}
                          />
                        </div>
                        <div className={styles.valueRowFormGroup}>
                          <label>{t('personalDetails.labels.lastName')}*</label>
                          <input
                            type="text"
                            value={personalDetails.lastName}
                            onChange={(e) => onPersonalDetailsChange('lastName', e.target.value)}
                            className={styles.editInput}
                          />
                        </div>
                      </div>
                    ) : detail.label === t('personalDetails.fields.phone') ? (
                      <div className={styles.phoneInputGroup}>
                        <div className={`${styles.phoneInput} ${isDropdownOpen ? styles.open : ""}`}>
                          <div 
                            className={styles.phoneCodeWrapper} 
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          >
                            {personalDetails.phonePrefix ? (
                              <span className={styles.placeholderText}>+{personalDetails.phonePrefix}</span>
                            ) : (
                              <span className={styles.placeholderText}>{t('personalDetails.placeholders.phoneCode')}</span>
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
                                  placeholder={t('personalDetails.placeholders.countrySearch')}
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
                                  <li className={styles.selectedItem}>{t('personalDetails.status.noCountriesFound')}</li>
                                )}
                              </ul>
                            </div>
                          )}
                          <input
                            type="tel"
                            placeholder={t('personalDetails.placeholders.phoneNumber')}
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
                      // <input
                      //   type="text"
                      //   value={personalDetails[detail.label.toLowerCase().replace(' ', '')] || ""}
                      //   onChange={(e) => onPersonalDetailsChange(
                      //     detail.label.toLowerCase().replace(' ', ''), 
                      //     e.target.value
                      //   )}
                      //   className={styles.editInput}
                      // />
                      editingField === t('personalDetails.fields.profileType') && (
                        <div className={styles.categorySection}>
                        <h2 className={styles.sectionTitle}>{t('personalDetails.userCategories.title')}</h2>
                        <p className={styles.sectionText}>
                        {t('personalDetails.userCategories.description')}
                        </p>
                        
                        <h3 className={styles.subsectionTitle}>{t('personalDetails.userCategories.subtitle')}</h3>
                       {groups.length > 0 && groups.map((group, index) => (
                           <div className={styles.categoryItem}>
                           <h4 className={styles.categoryName}>{group.name}:</h4>
                           <p className={styles.categoryDescription}>
                             {group.description || group.general_description}
                           </p>
                         </div>
                       ))}
                      </div>
                     )
                      // <></>
                    )
                  ) : (
                    <span className={styles.value}>{detail.value}</span>
                  )}
                  {detail.verified &&  (
                    <span className={styles.verifiedBadge}>{t('personalDetails.actions.verified')}</span>
                  )}
                </div>
                <div className={styles.valueRowBottom}>
                  {detail.verified && detail.label === t('personalDetails.fields.email') && (
                    <p className={styles.emailNote}>
                      {t('personalDetails.emailNote')}
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
                   {t('personalDetails.actions.cancel')}
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
          {editingField === detail.label && detail.action !== "none" && editingField !== t('personalDetails.fields.profileType') && (
            <div className={styles.saveButtonWrapper}>
              <button 
                className={`${styles.actionButton} ${styles.saveButton}`}
                onClick={handleSave}
              >
                 {t('personalDetails.actions.save')}
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