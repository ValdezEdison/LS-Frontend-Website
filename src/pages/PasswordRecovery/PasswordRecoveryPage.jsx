import React, { useState, useEffect } from "react";
import Header from "../../components/layouts/Header";
import RecoveryForm from "../../components/PasswordRecovery/RecoveryForm";
import styles from "./PasswordRecoveryPage.module.css";
import HeroSection from "../../components/PasswordRecovery/HeroSection";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../features/authentication/AuthActions";
import { useTranslation } from 'react-i18next';

function PasswordRecoveryPage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation('PasswordRecovery');

  const [formData, setFormData] = useState({
    email: "",
  });

  // const { loading } = useSelector((state) => state.auth);

  const [fieldStates, setFieldStates] = useState({
    email: {
      error: "",
      info: "Please enter your registered email address",
      touched: false,
      focused: false,
      isValid: false,
    },
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateField = (name, value) => {
    let error = "";
    let isValid = false;

    if (!value.trim()) {
      error = t('passwordRecovery.form.email.errors.required');
    } else if (!validateEmail(value)) {
      error = t('passwordRecovery.form.email.errors.invalid');
    } else {
      isValid = true;
    }

    return { error, isValid };
  };

  useEffect(() => {
    setIsFormValid(fieldStates.email.isValid);
  }, [fieldStates.email.isValid]);

  const handleFocus = (field) => {
    if (!fieldStates[field].isValid) {
      setFieldStates(prev => ({
        ...prev,
        [field]: {
          ...prev[field],
          focused: true,
        }
      }));
    }
  };

  const handleBlur = (field) => {
    const { error, isValid } = validateField(field, formData[field]);
    setFieldStates(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        error: isValid ? "" : error,
        touched: true,
        focused: false,
        isValid,
        info: isValid ? "" : prev[field].info
      }
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    const { error, isValid } = validateField(name, value);
    setFieldStates(prev => ({
      ...prev,
      [name]: {
        ...prev[name],
        error: isValid ? "" : error,
        isValid,
        info: isValid ? "" : prev[name].info
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate on submit
    const { error, isValid } = validateField('email', formData.email);
    setFieldStates(prev => ({
      ...prev,
      email: {
        ...prev.email,
        error: isValid ? "" : error,
        touched: true,
        isValid
      }
    }));

    if (!isValid) return;

    dispatch(forgotPassword(formData.email))
    .then((response) => {
      
      if (response.error) {
        // Handle cases where the API returns error in success response
        toast.error(response.error_description || t('passwordRecovery.toast.error'));
      } else {
        toast.success(response.payload?.detail || t('passwordRecovery.toast.success'));
        navigate('/login');
      }
    })
    .catch((error) => {
      // Use the structured error from handleApiError
      const errorMsg = error.payload?.error_description || 
      t('passwordRecovery.toast.error');
      
      // You could also customize messages based on error code
      if (error.payload?.error === "network_error") {
        toast.error(t('passwordRecovery.toast.networkError'))
      } else {
        toast.error(errorMsg);
      }
    });
  
  };

  return (
    <div className={`${styles.pageContainer} ${styles.authPage}`}>
      <Header />
      <div className={styles.loginPageOuter}>
        <main className={styles.mainContent}>
          <div className={styles.imageContainerWide}></div>
          <div className="login-page-center">
            <HeroSection />
            <div className={styles.formWrapper}>
            
              <RecoveryForm 
                formData={formData}
                fieldStates={fieldStates}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                handleFocus={handleFocus}
                handleBlur={handleBlur}
                isFormValid={isFormValid}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default PasswordRecoveryPage;