import React, { useState, useRef, useEffect } from "react";
import styles from "./PreferencesForm.module.css";
import { useSelector } from "react-redux";
import { Spain, UK, US } from "../common/Images";
import { set } from "lodash";
import { useTranslation } from "react-i18next";

const PreferencesForm = ({
  user,
  state,
  setState,
  categories,
  handleLevelChange,
  handleCategoryChange,
  handleSubcategoryChange,
  onSaveLanguage,
  onSaveSuggestion,
}) => {
  const [editingField, setEditingField] = useState(null);

  const { languages } = useSelector((state) => state.languages);

  const { t } = useTranslation('ProfileSection');

  // Filter out 'fr' and 'pt' languages
  const filteredLanguages = languages.filter(
    (lang) => lang.code !== "fr" && lang.code !== "pt"
  );

  // Map language codes to their corresponding flag images
  const flagImages = {
    "es": Spain,
    "en": US,
    "en-GB": UK,
  };



  const [openDropdown, setOpenDropdown] = useState({
    levels: false,
    categories: false,
    subcategories: false
  });

  const levelDropdownRef = useRef(null);
  const categoryDropdownRef = useRef(null);
  const subcategoryDropdownRef = useRef(null);

  // Get unique levels from categories data
  const levels = categories?.map(level => ({
    id: level.id,
    title: level.title
  })) || [];

  // Get categories for selected level
  const filteredCategories = categories
    ?.find(level => level.id === state.levelId)
    ?.categories || [];

  // Get subcategories for selected category
  const filteredSubcategories = filteredCategories
    ?.find(category => category.id === state.categoryId)
    ?.subcategories || [];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value, 'ddddd');
    setState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditClick = (field) => {
    setEditingField(field);
  };

  const handleSave = (e) => {
    setEditingField(null);
  };

  const handleCancel = () => {
    setEditingField(null);
    setState(prev => ({
      ...prev,
    
      levelId: null,
      categoryId: null,
      subcategoryId: null
    }))
  };

  const toggleDropdown = (name) => {
    setOpenDropdown(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const handleLevelSelect = (levelId) => {
    setState(prev => ({
      ...prev,
      levelId,
      categoryId: null,
      subcategoryId: null
    }));
    handleLevelChange(levelId);
    toggleDropdown('levels');
  };

  const handleCategorySelect = (categoryId) => {
    setState(prev => ({
      ...prev,
      categoryId,
      subcategoryId: null
    }));
    handleCategoryChange(categoryId);
    toggleDropdown('categories');
  };

  const handleSubcategorySelect = (subcategoryId) => {
    setState(prev => ({
      ...prev,
      subcategoryId
    }));
    handleSubcategoryChange(subcategoryId);
    toggleDropdown('subcategories');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (levelDropdownRef.current && !levelDropdownRef.current.contains(event.target)) {
        setOpenDropdown(prev => ({ ...prev, levels: false }));
      }
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
        setOpenDropdown(prev => ({ ...prev, categories: false }));
      }

    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.preferencesForm}>
      <h1 className={styles.title}>{t('preferences.title')}</h1>
      <p className={styles.description}>
      {t('preferences.description')}
      </p>

      <section className={styles.languageSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionHeaderLeft}>
            <h2>{t('preferences.language.title')}</h2>
            {editingField === 'language' ? (
              <div className={styles.radioGroup}>
                {filteredLanguages.map((lang) => (
                  <label key={lang.code} className={`${styles.languageRadioContainer} radioContainer`}>
                    <input
                      type="radio"
                      name="language"
                      value={lang.id}
                      checked={state.language === lang.id}
                      onChange={handleInputChange}
                    />
                    <span className="checkmark"></span>
                    <img
                      src={flagImages[lang.code]}
                      alt={lang.name}
                      className={styles.flagSmall}
                    />
                    <span>{lang.name}</span>
                  </label>
                ))}
              </div>
            ) : (
              <div className={styles.languageDisplay}>
                <img
                  src={flagImages[state.languageCode]}
                  alt="Flag"
                  className={styles.flagSmall}
                />
                <span>
                  {filteredLanguages.find(lang => lang.id === state.language)?.name || 'English'}
                </span>
              </div>
            )}
          </div>
          {editingField === 'language' ? (
            <div className={styles.editActions}>
              <a className={styles.editLink} onClick={handleCancel}>
              {t('preferences.language.cancel')}
              </a>
            </div>
          ) : (
            <a className={styles.editLink} onClick={() => handleEditClick('language')}>
              {t('preferences.language.edit')}
            </a>
          )}
        </div>
        {editingField === 'language' && (
          <div className={styles.saveButtonWrapper}>
            <button
              className={styles.saveButton}
              onClick={onSaveLanguage}
            >
             {t('preferences.language.save')}
            </button>
          </div>
        )}
      </section>

      <section className={styles.suggestionsSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionHeaderLeft}>
            <h2>{t('preferences.suggestions.title')}</h2>
            <span className={styles.suggestionsText}> {t('preferences.suggestions.description')}</span>
          </div>
          {editingField === 'suggestion' ? (
            <div className={styles.editActions}>
              <a  className={styles.editLink} onClick={handleCancel}>
              {t('preferences.language.cancel')}
              </a>
            </div>
          ) : (
            <a  className={styles.editLink} onClick={() => handleEditClick('suggestion')}>
              {t('preferences.language.edit')}
            </a>
          )}
        </div>

        <p className={styles.disclaimer}>
        {t('preferences.suggestions.disclaimer')}
        </p>

        {editingField === 'suggestion' && (
          <form className={styles.suggestionForm} onSubmit={(e) => {
            e.preventDefault();
            onSaveSuggestion();
          }}>
            <div className={styles.formGroup}>
              <label htmlFor="title" className={styles.label}>
              {t('preferences.suggestions.form.title')}
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={state.title}
                onChange={handleInputChange}
                className={styles.editInput}
                placeholder={t('preferences.suggestions.form.titlePlaceholder')}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}> {t('preferences.suggestions.form.activityType')}</label>
              <div className={styles.radioGroup}>
                <label className={`${styles.languageRadioContainer} radioContainer`}>
                  <input
                    type="radio"
                    name="activity"
                    value="event"
                    checked={state.activity === "event"}
                    onChange={handleInputChange}
                  />
                  <span className="checkmark"></span>
                  <span>{t('preferences.suggestions.form.event')}</span>
                </label>
                <label className={`${styles.languageRadioContainer} radioContainer`}>
                  <input
                    type="radio"
                    name="activity"
                    value="place"
                    checked={state.activity === "place"}
                    onChange={handleInputChange}
                  />
                  <span className="checkmark"></span>
                  <span>{t('preferences.suggestions.form.place')}</span>
                </label>
              </div>
            </div>

            {/* Level Selection */}
            <div className={styles.filterSection}>
              <label>{t('preferences.suggestions.form.level')}</label>
              <div className={styles.dropdown} ref={levelDropdownRef}>
                <div
                  className={styles.filterBlock}
                  onClick={() => toggleDropdown('levels')}
                >
                  <div className={`${styles.filterHeader} ${openDropdown.levels ? styles.open : ''}`}>
                    <div className={styles.filterHeaderContent}>
                      <div className={styles.filterTitle}>
                        {state.levelId ?
                          levels.find(l => l.id === state.levelId)?.title || t('preferences.suggestions.form.selectLevel')
                          : t('preferences.suggestions.form.selectLevel')}
                      </div>
                    </div>
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/b177707cf3dcb933dc1e6538151f45728e247ea5114b8d8a465e0c87724ee044"
                      className={`${styles.dropdownIcon} ${openDropdown.levels ? styles.rotated : ''}`}
                      alt="Toggle Dropdown"
                    />
                  </div>
                </div>

                {openDropdown.levels && (
                  <div className={styles.filterContent}>
                    <ul className={styles.filterList}>
                      {levels.map(level => (
                        <li
                          key={level.id}
                          className={state.levelId === level.id ? styles.selected : ''}
                          onClick={() => handleLevelSelect(level.id)}
                        >
                          {level.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Category Selection */}
            {state.levelId && (
              <div className={styles.filterSection}>
                <h3 className={styles.title}> {t('preferences.suggestions.form.category')}</h3>
                <div className={`${styles.dropdown} ${state.levelId ? '' : styles.disabled}`}
                  ref={categoryDropdownRef}>
                  <div
                    className={styles.filterBlock}
                    onClick={state.levelId ? () => toggleDropdown('categories') : undefined}
                  >
                    <div className={`${styles.filterHeader} ${openDropdown.categories ? styles.open : ''}`}>
                      <div className={styles.filterHeaderContent}>
                        <div className={styles.filterTitle}>
                          {state.categoryId ?
                            filteredCategories.find(c => c.id === state.categoryId)?.title || t('preferences.suggestions.form.selectCategory')
                            : t('preferences.suggestions.form.selectCategory')}
                        </div>
                      </div>
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/b177707cf3dcb933dc1e6538151f45728e247ea5114b8d8a465e0c87724ee044"
                        className={`${styles.dropdownIcon} ${openDropdown.categories ? styles.rotated : ''}`}
                        alt="Toggle Dropdown"
                      />
                    </div>
                  </div>

                  {openDropdown.categories && (
                    <div className={styles.filterContent}>
                      <ul className={styles.filterList}>
                        {filteredCategories.map(category => (
                          <li
                            key={category.id}
                            className={state.categoryId === category.id ? styles.selected : ''}
                            onClick={() => handleCategorySelect(category.id)}
                          >
                            {category.title}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Subcategory Selection */}
            {state.categoryId && filteredSubcategories.length > 0 && (
              <div className={styles.filterSection}>
                <h3 className={styles.title}> {t('preferences.suggestions.form.subcategory')}</h3>
                <div className={styles.dropdown} ref={subcategoryDropdownRef}>
                  <div
                    className={styles.filterBlock}
                    onClick={() => toggleDropdown('subcategories')}
                  >
                    <div className={`${styles.filterHeader} ${openDropdown.subcategories ? styles.open : ''}`}>
                      <div className={styles.filterHeaderContent}>
                        <div className={styles.filterTitle}>
                          {state.subcategoryId ?
                            filteredSubcategories.find(s => s.id === state.subcategoryId)?.title || t('preferences.suggestions.form.selectSubcategory')
                            : t('preferences.suggestions.form.selectSubcategory')}
                        </div>
                      </div>
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/b177707cf3dcb933dc1e6538151f45728e247ea5114b8d8a465e0c87724ee044"
                        className={`${styles.dropdownIcon} ${openDropdown.subcategories ? styles.rotated : ''}`}
                        alt="Toggle Dropdown"
                      />
                    </div>
                  </div>

                  {openDropdown.subcategories && (
                    <div className={styles.filterContent}>
                      <ul className={styles.filterList}>
                        {filteredSubcategories.map(subcategory => (
                          <li
                            key={subcategory.id}
                            className={state.subcategoryId === subcategory.id ? styles.selected : ''}
                            onClick={() => handleSubcategorySelect(subcategory.id)}
                          >
                            {subcategory.title}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            <button type="submit" className={`${styles.submitButton} ${styles.active}`} >
            {t('preferences.suggestions.form.submit')}
            </button>
          </form>
        )}
      </section>

      {editingField === 'suggestion' && (
        <section className={styles.contactSection}>
          <h3 className={styles.contactTitle}> {t('preferences.suggestions.contact.title')}</h3>
          <p className={styles.contactInfo}>
          {t('preferences.suggestions.contact.text', {
              email: t('preferences.suggestions.contact.email'),
              phone: t('preferences.suggestions.contact.phone')
            })}
          </p>
        </section>
      )}
    </div>
  );
};

export default PreferencesForm;