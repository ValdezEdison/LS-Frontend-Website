import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../components/layouts/Header";
import LoginForm from "../../components/LoginPage/LoginForm";
import SocialLogin from "../../components/LoginPage/SocialLogin";
import Footer from "../../components/LoginPage/Footer";
import styles from "./LoginPage.module.css";
import { login } from "../../features/authentication/AuthActions"; // Import your login action

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location, 'location')

  // Environment variables for client credentials
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

  // State for form inputs
  const [obj, setObj] = useState({
    email: "", // Updated to match API payload
    password: "",
  });

  // State for error messages
  const [errorMsg, setError] = useState({
    has_error_in_email: false,
    has_error_in_password: false,
    has_error_in_account_locked: false,
  });

  const [isLocked, setIsLocked] = useState(false); // State for account lock
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  // Toggle password visibility
  const handleTogglePassword = (e) => {
    e.stopPropagation();
    setShowPassword(!showPassword);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setObj((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate form and submit
  const validateForm = (e) => {
    e.preventDefault();
  
    // Validate inputs
    const newError = {
      has_error_in_email: obj.email.length === 0,
      has_error_in_password: obj.password.length === 0,
      has_error_in_account_locked: isLocked,
    };
  
    setError(newError);
  
    // Check if there are any errors
    const hasError = Object.values(newError).some((item) => item === true);
  
    if (!hasError) {
      // Prepare payload for API
      const payload = {
        client_id: clientId,
        client_secret: clientSecret,
        email: obj.email,
        grant_type: "password",
        password: obj.password,
      };
  
      // Dispatch login action
      dispatch(login(payload))
        .then((action) => {
          if (login.fulfilled.match(action)) {
            // Handle successful login
            toast.success("Login successful!");
            const from = location.state?.from?.pathname || "/";
            navigate(from, { replace: true });

          } else if (login.rejected.match(action)) {
            // Handle rejected action (API error)
            const errorMessage = action.payload.error_description || "An error occurred. Please try again.";
            toast.error(errorMessage);
  
            // Update error state for specific fields
            if (action.payload.error === "invalid_grant") {
              setError((prev) => ({
                ...prev,
                has_error_in_email: true,
                has_error_in_password: true,
              }));
            }
          }
        })
        .catch((err) => {
          console.error("Unexpected Error:", err); // Debugging
          toast.error("An unexpected error occurred. Please try again.");
        });
    }
  };

  const handleNavigate = () => {
    navigate('/register')
  }

  return (
    <div className={`${styles.loginPage} ${styles.authPage}`}>
      <Header />
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
                obj={obj}
                errorMsg={errorMsg}
                showPassword={showPassword}
                handleInputChange={handleInputChange}
                handleTogglePassword={handleTogglePassword}
                validateForm={validateForm}
                handleNavigate={handleNavigate}
              />
              <SocialLogin />
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;