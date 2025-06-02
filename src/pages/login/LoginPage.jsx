import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../components/layouts/Header";
import LoginForm from "../../components/LoginPage/LoginForm";
import SocialLogin from "../../components/LoginPage/SocialLogin";
import Footer from "../../components/LoginPage/Footer";
import styles from "./LoginPage.module.css";
import { login, getProfile } from "../../features/authentication/AuthActions";
import Loader from "../../components/common/Loader";
import { socialLogin } from "../../features/authentication/socialLogin/SocialAuthAction";
import { handleFacebookLogin } from "../../utils/FacebookLogin";
import { initializeGoogleSDK, handleGoogleLogin } from "../../utils/GoogleLogin";
import { useTranslation } from 'react-i18next';
import { getClientId, getClientSecret } from "../../utils/decryptSecrets";
import { updateLocation, toggleUserLocation } from "../../features/location/LocationAction";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation('Login');

  const { loading } = useSelector((state) => state.auth);
  const clientId = getClientId();
  const clientSecret = getClientSecret();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [fieldStates, setFieldStates] = useState({
    email: {
      error: "",
      info: t('emailInfo'),
      touched: false,
      focused: false,
      isValid: false,
    },
    password: {
      error: "",
      info: t('passwordInfo'),
      touched: false,
      focused: false,
      isValid: false,
    },
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(
    localStorage.getItem('rememberMe') === 'true'
  );

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateField = (name, value) => {
    let error = "";
    let isValid = false;

    switch (name) {
      case "email":
        if (!value) {
          error = t('emailError.required');
        } else if (!validateEmail(value)) {
          error = t('emailError.invalid');
        } else {
          isValid = true;
        }
        break;
      case "password":
        if (!value) {
          error = t('passwordError.required');
        }else {
          isValid = true;
        }
        break;
      default:
        break;
    }

    return { error, isValid };
  };

  useEffect(() => {
    const emailValid = fieldStates.email.isValid;
    const passwordValid = fieldStates.password.isValid;
    setIsFormValid(emailValid && passwordValid);
  }, [fieldStates.email.isValid, fieldStates.password.isValid]);

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
        info: isValid ? "" :  t(`${field}Info`)
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
        info: isValid ? "" : t(`${name}Info`)
      }
    }));
  };

  const handleTogglePassword = (e) => {
    e.stopPropagation();
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields on submit
    const newFieldStates = { ...fieldStates };
    let formIsValid = true;
  
    Object.keys(formData).forEach(key => {
      const { error, isValid } = validateField(key, formData[key]);
      newFieldStates[key] = {
        ...newFieldStates[key],
        error: isValid ? "" : error,
        touched: true,
        isValid,
        info: isValid ? "" : t(`${key}Info`)
      };
      formIsValid = formIsValid && isValid;
    });
  
    setFieldStates(newFieldStates);
  
    if (!formIsValid) return;
  
    // Save rememberMe preference
    localStorage.setItem('rememberMe', rememberMe.toString());
      
    const payload = {
      client_id: clientId,
      client_secret: clientSecret,
      email: formData.email,
      grant_type: "password",
      password: formData.password.trim(),
      rememberMe: rememberMe
    };
  
    dispatch(login(payload))
    .then((action) => {
      if (login.fulfilled.match(action)) {
        toast.success(t('messages.success'));
        
        const fromLocation = location.state?.from;
        const fromPath = fromLocation?.pathname || "/";
        
        // Preserve all original navigation properties
        const navigationOptions = {
          replace: true,
          ...(fromLocation?.state && { state: fromLocation.state }),
          ...(fromLocation?.search && { search: fromLocation.search }),
          ...(fromLocation?.hash && { hash: fromLocation.hash })
        };
        requestLocationAccess();
        navigate(fromPath, navigationOptions);
        dispatch(getProfile());
    
      } else if (login.rejected.match(action)) {
        toast.error(action.payload?.error_description || t('messages.error'));
        throw new Error("Login failed");
      }
    })
    .catch((err) => {
      // toast.error(err.message || t('messages.error'));
      
    });
  };

  const handleNavigate = (path) => {
    navigate(path);
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
      if (provider === 'google-oauth2') {
        await initializeGoogleSDK();
        token = await handleGoogleLogin();
        
      } 
      // // Facebook Login
       if (provider === 'facebook') {

        // if (window.location.protocol !== 'https:') {
        //   throw new Error('Facebook login requires HTTPS');
        // }
      
        
        const facebookResponse = await handleFacebookLogin();
        token = facebookResponse.accessToken;
        // token = import.meta.env.VITE_APP_FACEBOOK_TOKEN;
      }

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
          const fromLocation = location.state?.from;
          const fromPath = fromLocation?.pathname || "/";
          
          // Preserve all original navigation properties
          const navigationOptions = {
            replace: true,
            ...(fromLocation?.state && { state: fromLocation.state }),
            ...(fromLocation?.search && { search: fromLocation.search }),
            ...(fromLocation?.hash && { hash: fromLocation.hash })
          };
          // requestLocationAccess();
          navigate(fromPath, navigationOptions);
          await requestLocationAccess();
         
        }
      }
    } catch (error) {
      toast.error(error.message || t('messages.error'));
      
    }
  };

  function proceedWithNavigation() {
    const fromLocation = location.state?.from;
    const fromPath = fromLocation?.pathname || "/";
    
    // Preserve all original navigation properties
    const navigationOptions = {
      replace: true,
      ...(fromLocation?.state && { state: fromLocation.state }),
      ...(fromLocation?.search && { search: fromLocation.search }),
      ...(fromLocation?.hash && { hash: fromLocation.hash })
    };
  
    navigate(fromPath, navigationOptions);
  }


  const handleLocationAccess = async () => {
    try {
      // First check if we have location access
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      
      // If we get here, user granted access
      const { latitude, longitude } = position.coords;
      await dispatch(updateLocation({ latitude, longitude })).unwrap();
      await dispatch(toggleUserLocation({geolocation_enabled: true})).unwrap();
      return true;
    } catch (error) {
      // User denied location access or error occurred
      await dispatch(toggleUserLocation({geolocation_enabled: false})).unwrap();
      return false;
    }
  };

  const requestLocationAccess = async () => {
    try {
      // Request location permission (this will show the browser's native popup)
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          resolve,
          reject,
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
      });
  
      // If permission granted, update location
      const { latitude, longitude } = position.coords;
      await dispatch(updateLocation({ latitude, longitude, location_mode: "current" })).unwrap();
       dispatch(toggleUserLocation({geolocation_enabled: true})).unwrap();
      return true;
    } catch (error) {
      // Permission denied or error occurred
      console.log('Location access denied or error:', error);
      await dispatch(toggleUserLocation({geolocation_enabled: false})).unwrap();
      return false;
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
    <>
    
    <div className={`${styles.loginPage} ${styles.authPage}`}>
      <Header />
      <div className={styles.loginPageOuter}>
        <div className={styles.imageContainerWide}></div>
        <div className="login-page-center">
          <div className={styles.contentWrapper}>
            <div className={styles.imageContainer}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/49bebf84406b700c1b9c1bb3a9744dbf366034f8?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
                alt="Login page decorative image"
                className={styles.decorativeImage}
              />
            </div>
            <div className={styles.formContainer}>
            {/* { loading &&
                <div className="loaderOverlay">
                  <div className="loaderBtnWrapper">
                  </div>
                </div>
               } */}
              <div className={styles.formWrapper}>
                <h1 className={styles.formTitle}>{t('title')}</h1>
                <LoginForm
                  formData={formData}
                  fieldStates={fieldStates}
                  showPassword={showPassword}
                  handleInputChange={handleInputChange}
                  handleTogglePassword={handleTogglePassword}
                  handleSubmit={handleSubmit}
                  handleNavigate={handleNavigate}
                  isFormValid={isFormValid}
                  handleFocus={handleFocus}
                  handleBlur={handleBlur}
                  rememberMe={rememberMe}
                  setRememberMe={setRememberMe}
                />
                <SocialLogin onSocialLogin={handleSocialLogin}/>
                <Footer handlePrivacyAndTermsActions={handlePrivacyAndTermsActions}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default LoginPage;