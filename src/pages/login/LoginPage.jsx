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
      
      // Dispatch getProfile after successful login
      return dispatch(getProfile())
        .then((profileAction) => {
          if (getProfile.fulfilled.match(profileAction)) {
            // Profile fetched successfully
            
            // Show browser location permission popup
            if ("geolocation" in navigator) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  // Location access granted
                  console.log("Location access granted", position);
                  proceedWithNavigation();
                },
                (error) => {
                  // Location access denied or error
                  console.warn("Location access denied or error", error);
                  // Still proceed with navigation even if location is denied
                  proceedWithNavigation();
                },
                { enableHighAccuracy: true }
              );
            } else {
              // Geolocation not supported
              console.warn("Geolocation not supported by browser");
              proceedWithNavigation();
            }
          } else {
            throw new Error("Failed to fetch profile");
          }
        });
    }
  })
  .catch((error) => {
    // toast.error(error.message);
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
                <Footer />
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