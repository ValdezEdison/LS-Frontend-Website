import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../components/layouts/Header";
import LoginForm from "../../components/LoginPage/LoginForm";
import SocialLogin from "../../components/LoginPage/SocialLogin";
import Footer from "../../components/LoginPage/Footer";
import styles from "./LoginPage.module.css";
import { login } from "../../features/authentication/AuthActions";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  ;

  const clientId = import.meta.env.VITE_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [fieldStates, setFieldStates] = useState({
    email: {
      error: "",
      info: "Please enter a valid email address",
      touched: false,
      focused: false,
      isValid: false,
    },
    password: {
      error: "",
      info: "Please enter a password",
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
          error = "Email is required";
        } else if (!validateEmail(value)) {
          error = "Please enter a valid email";
        } else {
          isValid = true;
        }
        break;
      case "password":
        if (!value) {
          error = "Password is required";
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
        info: isValid ? "" : newFieldStates[key].info
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
      password: formData.password,
      rememberMe: rememberMe
    };

    dispatch(login(payload))
      .then((action) => {
        if (login.fulfilled.match(action)) {
          toast.success("Login successful!");
          
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
        }else if (login.rejected.match(action)) {
          toast.error(action.payload?.error_description || "Login failed");
        }
      })
      .catch((err) => {
        toast.error("An unexpected error occurred");
        console.error(err);
      });
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
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
              <div className={styles.formWrapper}>
                <h1 className={styles.formTitle}>Inicia sesión o crea una cuenta</h1>
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
                <SocialLogin />
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;