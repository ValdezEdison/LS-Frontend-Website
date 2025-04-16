import React, { useState, useEffect, useRef } from "react";
import styles from "./RegistrationForm.module.css";
import Loader from "../common/Loader";
import { useSelector } from "react-redux";

const RegistrationForm = ({
  formData,
  fieldStates,
  showPassword,
  handleInputChange,
  togglePasswordVisibility,
  handleSubmit,
  handleNavigate,
  handleFocus,
  handleBlur,
  isFormValid,
  phoneCodes,
  t
}) => {

  const { loading } = useSelector((state) => state.auth);

  const handlePhonePrefixChange = (e) => {
    handleInputChange({
      target: {
        name: "phone_prefix",
        value: e.target.value
      }
    });
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  // Filter phone codes based on search term
  const filteredPhoneCodes = phoneCodes.filter(
    code =>
      code.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      code.phone_code.includes(searchTerm)
  );

  // Handle click outside to close dropdown
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

  const handlePhonePrefixSelect = (code) => {
    handleInputChange({
      target: {
        name: "phone_prefix",
        value: `+${code.phone_code}`
      }
    });
    setIsDropdownOpen(false);
    setSearchTerm("");
  };


  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {/* Username Input */}
      <div className={styles.inputGroup}>
        <label htmlFor="username" className={styles.label}>
        {t('form.username.label')}
        </label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder={t('form.username.placeholder')}
          className={`${styles.input} ${fieldStates.username.error && fieldStates.username.touched ? styles.inputError : ""
            }`}
          value={formData.username}
          onChange={handleInputChange}
          onFocus={() => handleFocus('username')}
          onBlur={() => handleBlur('username')}
        />
        {/* {!fieldStates.username.isValid && fieldStates.username.focused && (
          <div className={styles.infoMessage}>{fieldStates.username.info}</div>
        )} */}
        {fieldStates.username.error && fieldStates.username.touched && (
          <div className={styles.errorMessage}>{fieldStates.username.error}</div>
        )}
      </div>

      {/* Email Input */}
      <div className={styles.inputGroup}>
        <label htmlFor="email" className={styles.label}>
        {t('form.email.label')}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder={t('form.email.placeholder')}
          className={`${styles.input} ${fieldStates.email.error && fieldStates.email.touched ? styles.inputError : ""
            }`}
          value={formData.email}
          onChange={handleInputChange}
          onFocus={() => handleFocus('email')}
          onBlur={() => handleBlur('email')}
        />
        {/* {!fieldStates.email.isValid && fieldStates.email.focused && (
          <div className={styles.infoMessage}>{fieldStates.email.info}</div>
        )} */}
        {fieldStates.email.error && fieldStates.email.touched && (
          <div className={styles.errorMessage}>{fieldStates.email.error}</div>
        )}
      </div>

      {/* Phone Input */}
      <div className={styles.inputGroup}>
        <label htmlFor="phone" className={styles.label}>
        {t('form.phone.label')}
        </label>
        <div className={`${styles.phoneInput} ${isDropdownOpen ? styles.open : ""}`}>
        <div 
            className={styles.phoneCodeWrapper} 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {formData.phone_prefix ? (
              <span className={styles.placeholderText}>{formData.phone_prefix}</span>
            ) : (
              <span className={styles.placeholderText}>{t('form.phone.codePlaceholder')}</span>
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
                  placeholder={t('form.phone.searchPlaceholder')}
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
                        formData.phone_prefix === `+${code.phone_code}`
                          ? styles.selectedItem
                          : ""
                      }
                    >
                      +{code.phone_code} {code.name}
                    </li>
                  ))
                ) : (
                  <li className={styles.selectedItem}>{t('form.phone.noCountries')}</li>
                )}
              </ul>
            </div>
          )}
          
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder={t('form.phone.placeholder')}
            className={`${styles.input} ${fieldStates.phone.error && fieldStates.phone.touched ? styles.inputError : ""
              }`}
            value={formData.phone}
            onChange={handleInputChange}
            onFocus={() => handleFocus('phone')}
            onBlur={() => handleBlur('phone')}
          />
        </div>
        {/* {!fieldStates.phone.isValid && fieldStates.phone.focused && (
          <div className={styles.infoMessage}>{fieldStates.phone.info}</div>
        )} */}
        {fieldStates.phone.error && fieldStates.phone.touched && (
          <div className={styles.errorMessage}>{fieldStates.phone.error}</div>
        )}
      </div>

      {/* Password Input */}
      <div className={styles.inputGroup}>
        <label htmlFor="password" className={styles.label}>
        {t('form.password.label')}
        </label>
        <div 
          className={styles.passwordRequirements} 
          dangerouslySetInnerHTML={{ __html: t('form.password.requirements') }}
        />
        <div className={styles.passwordInput}>
          <div
            className={`${styles.showPassword} ${showPassword ? styles.clicked : ''}`}
            onClick={togglePasswordVisibility}
          ></div>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder={t('form.password.placeholder')}
            className={`${styles.input} ${fieldStates.password.error && fieldStates.password.touched ? styles.inputError : ""
              }`}
            value={formData.password}
            onChange={handleInputChange}
            onFocus={() => handleFocus('password')}
            onBlur={() => handleBlur('password')}
          />
        </div>
        {/* {!fieldStates.password.isValid && fieldStates.password.focused && (
          <div className={styles.infoMessage}>{fieldStates.password.info}</div>
        )} */}
        {fieldStates.password.error && fieldStates.password.touched && (
          <div className={styles.errorMessage}>{fieldStates.password.error}</div>
        )}
      </div>

      {/* Terms and Conditions */}
      <div className={styles.termsGroup}>
        <label className={styles.radioContainer}>
          <input
            type="checkbox"
            id="terms"
            name="terms"
            checked={formData.terms}
            onChange={handleInputChange}
            onFocus={() => handleFocus('terms')}
            onBlur={() => handleBlur('terms')}
          />
          <span className={styles.checkmark}></span>
          {t('form.terms.text')}{" "}
          <span className={styles.termsLink}>{t('form.terms.link')}</span>
        </label>
        {fieldStates.terms.error && fieldStates.terms.touched && (
          <div className={styles.errorMessage}>{fieldStates.terms.error}</div>
        )}
      </div>

      {/* Submit Button */}
      {loading ? <button
        className="submitLoadingButton"
        disabled={!isFormValid}
      >
        <div className="loaderBtnWrapper">
          <Loader />
        </div>

      </button> :
        <button
          type="submit"
          className={`${styles.submitButton} ${isFormValid ? styles.active : ''}`}
          disabled={!isFormValid}
        >
        {t('form.submit')}
        </button>
      }



      {/* Login Prompt */}
      <p className={styles.loginPrompt}>
      {t('form.loginPrompt')}{" "}
        <span className={styles.loginLink} onClick={handleNavigate}>
        {t('form.loginLink')}
        </span>
      </p>
    </form>
  );
};

export default RegistrationForm;