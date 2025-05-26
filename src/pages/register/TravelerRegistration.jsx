import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./TravelerRegistration.module.css";
import Header from "../../components/layouts/Header";
import RegistrationForm from "../../components/TravelerRegistration/RegistrationForm";
// import SocialLogin from "../../components/TravelerRegistration/SocialLogin";
import Footer from "../../components/TravelerRegistration/Footer";
import { register } from "../../features/authentication/AuthActions";
import EmailConfirmation from "../../components/popup/EmailConfirmation/EmailConfirmation";
import Modal from "../../components/modal/Modal";
import { openPopup, closePopup, openEmailConfirmationPopup } from "../../features/popup/PopupSlice";
import { set } from "lodash";
import Loader from "../../components/common/Loader";
import { fetchCountriesPhonecodes } from "../../features/common/countries/CountryAction";
import SocialLogin from "../../components/LoginPage/SocialLogin";
import { socialLogin } from "../../features/authentication/socialLogin/SocialAuthAction";
import { useTranslation } from 'react-i18next';
import { getClientId, getClientSecret } from "../../utils/decryptSecrets";

const TravelerRegistration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation('Registration');

  const clientId = getClientId();
  const clientSecret = getClientSecret();

  const { loading } = useSelector((state) => state.auth);
  const { phoneCodes } = useSelector((state) => state.countries);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  const { isOpen } = useSelector((state) => state.popup);
  

  // State for form inputs
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    terms: false,
    phone_prefix: "+000",
  });

  // State for field validation and messages
  const [fieldStates, setFieldStates] = useState({
    username: {
      error: "",
      info: t('form.username.info'),
      touched: false,
      focused: false,
      isValid: false,
    },
    email: {
      error: "",
      info: t('form.email.info'),
      touched: false,
      focused: false,
      isValid: false,
    },
    phone: {
      error: "",
      info: t('form.phone.info'),
      touched: false,
      focused: false,
      isValid: false,
    },
    phone_prefix: {
      error: "",
      info: "",
      touched: true,
      focused: false,
      isValid: true,
    },
    password: {
      error: "",
      info: t('form.password.info'),
      touched: false,
      focused: false,
      isValid: false,
    },
    terms: {
      error: "",
      info: "",
      touched: false,
      focused: false,
      isValid: false,
    },
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    dispatch(fetchCountriesPhonecodes());
  }, []);

  // Validate individual field
  const validateField = (name, value) => {
    let error = "";
    let isValid = false;

    switch (name) {
      case "username":
        if (!value.trim()) {
          error = t('form.username.errors.required');
        } else if (value.trim().length < 3) {
          error = t('form.username.errors.minLength');
        } else {
          isValid = true;
        }
        break;
      case "email":
        if (!value.trim()) {
          error = t('form.email.errors.required');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = t('form.email.errors.invalid');
        } else {
          isValid = true;
        }
        break;
      case "phone":
        if (!value.trim()) {
          error = t('form.phone.errors.required');
        } else if (!/^\d{7,15}$/.test(value)) {
          error = t('form.phone.errors.invalid');
        } else {
          isValid = true;
        }
        break;
      case "password":
        if (!value.trim()) {
          error = t('form.password.errors.required');
        } else if (value.length < 8) {
          error = t('form.password.errors.minLength');
        } else if (!/[A-Z]/.test(value)) {
          error = t('form.password.errors.uppercase');
        } else if (!/\d/.test(value)) {
          error = t('form.password.errors.number');
        } else if (!/[!@#$%^&*]/.test(value)) {
          error = t('form.password.errors.symbol');
        } else {
          isValid = true;
        }
        break;
      case "terms":
        if (!value) {
          error = t('form.terms.error');
        } else {
          isValid = true;
        }
        break;
      default:
        isValid = true;
        break;
    }

    return { error, isValid };
  };


  // Update form validity when fields change
  useEffect(() => {
    const allValid = Object.values(fieldStates).every(field => field.isValid);
    setIsFormValid(allValid);
  }, [fieldStates]);

  // Handle field focus
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

  // Handle field blur
  const handleBlur = (field) => {
    const value = field === "terms" ? formData.terms : formData[field];
    const { error, isValid } = validateField(field, value);

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

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setFormData(prev => ({ ...prev, [name]: fieldValue }));

    // Validate the field if it's been touched
    if (fieldStates[name].touched || name === "password") {
      const { error, isValid } = validateField(name, fieldValue);
      setFieldStates(prev => ({
        ...prev,
        [name]: {
          ...prev[name],
          error: isValid ? "" : error,
          isValid,
          info: isValid ? "" : prev[name].info
        }
      }));
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle form submission
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields first
    const newFieldStates = { ...fieldStates };
    let allValid = true;

    Object.keys(formData).forEach(key => {
      const value = key === "terms" ? formData.terms : formData[key];
      const { error, isValid } = validateField(key, value);
      
      newFieldStates[key] = {
        ...newFieldStates[key],
        error: isValid ? "" : error,
        touched: true,
        isValid,
        info: isValid ? "" : newFieldStates[key].info
      };
      
      if (key !== "phone_prefix") {
        allValid = allValid && isValid;
      }
    });

    setFieldStates(newFieldStates);

    if (!allValid) {
      toast.error(t('messages.error'));
      return;
    }

    try {
      const resultAction = await dispatch(register(formData));
      
      if (register.fulfilled.match(resultAction)) {
        toast.success(t('messages.success'));
        setRegisteredEmail(formData.email);
        dispatch(openEmailConfirmationPopup(formData.email));
        dispatch(openPopup());
        navigate('/register/email-confirmation');
      } else {
        const error = resultAction.payload?.error_description || 
                      resultAction.error?.message || 
                      t('messages.error');
        toast.error(error);
      }
    } catch (err) {
      
      toast.error(err.message || t('messages.error'));
    }
  };


  const handleNavigate = () => {
    navigate('/login');
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    dispatch(closePopup());
    setRegisteredEmail('');
    navigate('/register'); // Navigate to login after closing the popup
  };

  const handleResendEmail = () => {
    // Implement your resend email logic here
    // This would typically call your API to resend the confirmation email
    toast.info(t('messages.resendSuccess'));
  };

  // Social Login Handler
     const handleSocialLogin = async (provider, token, error) => {
  
      if (error) {
        toast.error(error.message || t('messages.error'));
        return;
      }
  
      try {
        // let token;
        
        // // Google Login
        // // if (provider === 'google') {
        // //   await initializeGoogleSDK();
        // //   token = await handleGoogleLogin();
        // // } 
        // // Facebook Login
        //  if (provider === 'facebook') {
  
        //   // if (window.location.protocol !== 'https:') {
        //   //   throw new Error('Facebook login requires HTTPS');
        //   // }
        
          
        //   const facebookResponse = await handleFacebookLogin();
        //   token = facebookResponse.accessToken;
        //   // token = import.meta.env.VITE_APP_FACEBOOK_TOKEN;
        // }
  
        if (token) {
          const result = await dispatch(socialLogin({
            grant_type: "convert_token",
            client_id: clientId,
            client_secret: clientSecret,
            backend: provider,
            token,
          })).unwrap();
  
          if (result) {
            toast.success(t('messages.success'));
            // await dispatch(getProfile()).unwrap();
            const from = location.state?.from?.pathname || "/";
            navigate(from, { replace: true });
          }
        }
      } catch (error) {
        toast.error(error.message || t('messages.error'));
        
      }
    };

    const handlePrivacyAndTermsActions = (e, action) => {
      if(action === 'terms') {
        navigate('/terms-conditions');
      } else if (action === 'privacy') {
        navigate('/privacy-policy');
      }
    }


  return (
    <div className={`${styles.registrationPage} ${styles.authPage}`}>
      <Header />
      {/* { isOpen && showConfirmation ? (
         <Modal onClose={handleConfirmationClose} customClass="modalMd">
         <EmailConfirmation
           email={registeredEmail}
           onClose={handleConfirmationClose}
           onResend={handleResendEmail}
         />
       </Modal>
      ) : ( */}
        <div className={styles.loginPageOuter}>
          <div className={styles.imageContainerWide}></div>
          <div className="login-page-center">
            <main className={styles.mainContent}>
              <div className={styles.bannerContainer}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/3fac68f4a39f7382628bebc1d839fc16c2c5fef0"
                  alt="Traveler by lake"
                  className={styles.bannerImage}
                />
              </div>
              <div className={styles.formContainer}>
              {/* { loading &&
                <div className="loaderOverlay">
                </div>
              } */}
                <div className={styles.formWrapper}>
                  <h1 className={styles.formTitle}>{t('title')}</h1>
                  <RegistrationForm
                    formData={formData}
                    fieldStates={fieldStates}
                    showPassword={showPassword}
                    handleInputChange={handleInputChange}
                    togglePasswordVisibility={togglePasswordVisibility}
                    handleSubmit={handleSubmit}
                    handleNavigate={handleNavigate}
                    handleFocus={handleFocus}
                    handleBlur={handleBlur}
                    isFormValid={isFormValid}
                    phoneCodes={phoneCodes}
                    t={t}
                  />
                  <SocialLogin onSocialLogin={handleSocialLogin}/>
                  <Footer handlePrivacyAndTermsActions={handlePrivacyAndTermsActions}/>
                </div>
              </div>
            </main>
          </div>
        </div>
      {/* // )} */}
    </div>
  );
}
  export default TravelerRegistration;
  