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
import { openPopup, closePopup } from "../../features/popup/PopupSlice";
import { set } from "lodash";
import Loader from "../../components/common/Loader";
import { fetchCountriesPhonecodes } from "../../features/common/countries/CountryAction";
import SocialLogin from "../../components/LoginPage/SocialLogin";
import { socialLogin } from "../../features/authentication/socialLogin/SocialAuthAction";

const TravelerRegistration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      info: "Please enter your full name",
      touched: false,
      focused: false,
      isValid: false,
    },
    email: {
      error: "",
      info: "Please enter a valid email address",
      touched: false,
      focused: false,
      isValid: false,
    },
    phone: {
      error: "",
      info: "Please enter your phone number with country code",
      touched: false,
      focused: false,
      isValid: false,
    },
    phone_prefix: {
      error: "",
      info: "",
      touched: false,
      focused: false,
      isValid: true,
    },
    password: {
      error: "",
      info: "Password must be at least 8 characters with a number, uppercase letter, and symbol",
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
          error = "Please enter your username";
        } else {
          isValid = true;
        }
        break;
      case "email":
        if (!value.trim()) {
          error = "Please enter your email";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Please enter a valid email address";
        } else {
          isValid = true;
        }
        break;
      case "phone":
        if (!value.trim()) {
          error = "Please enter your phone number";
        } else if (!/^\d{9,}$/.test(value)) {
          error = "Please enter a valid phone number";
        } else {
          isValid = true;
        }
        break;
      case "password":
        if (!value.trim()) {
          error = "Please enter a password";
        } else if (!/^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(value)) {
          error = "Password must be at least 8 characters with a number, uppercase letter, and symbol";
        } else {
          isValid = true;
        }
        break;
      case "terms":
        if (!value) {
          error = "You must accept the terms and conditions";
        } else {
          isValid = true;
        }
        break;
      default:
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
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields on submit
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
      allValid = allValid && isValid;
    });

    setFieldStates(newFieldStates);

    if (!allValid) return;

    dispatch(register(formData))
      .then((action) => {
        if (register.fulfilled.match(action)) {
          toast.success("Registration successful! Please check your email for confirmation.");
          setRegisteredEmail(formData.email);
          setShowConfirmation(true);
          dispatch(openPopup());
        } else if (register.rejected.match(action)) {
          toast.error(action.payload?.error_description || "Registration failed");
        }
      })
      .catch((err) => {
        toast.error("An unexpected error occurred");
        console.error(err);
      });
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
    toast.info("Confirmation email resent successfully");
  };

  // Social Login Handler
     const handleSocialLogin = async (provider, token, error) => {
  
      if (error) {
        toast.error(error.message || "Social login failed");
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
            toast.success("Login successful!");
            await dispatch(getProfile()).unwrap();
            const from = location.state?.from?.pathname || "/";
            navigate(from, { replace: true });
          }
        }
      } catch (error) {
        toast.error(error.message || "Social login failed");
        console.error("Social login error:", error);
      }
    };

console.log(formData, 'formData')
  return (
    <div className={`${styles.registrationPage} ${styles.authPage}`}>
      <Header />
      { isOpen && showConfirmation ? (
         <Modal onClose={handleConfirmationClose} customClass="modalMd">
         <EmailConfirmation
           email={registeredEmail}
           onClose={handleConfirmationClose}
           onResend={handleResendEmail}
         />
       </Modal>
      ) : (
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
              { loading &&
                <div className="loaderOverlay">
                </div>
              }
                <div className={styles.formWrapper}>
                  <h1 className={styles.formTitle}>Regístrate como viajero</h1>
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
                  />
                  <SocialLogin onSocialLogin={handleSocialLogin}/>
                  <Footer />
                </div>
              </div>
            </main>
          </div>
        </div>
      )}
    </div>
  );
}
  export default TravelerRegistration;
  