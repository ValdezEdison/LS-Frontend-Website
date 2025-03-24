import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./TravelerRegistration.module.css";
import Header from "../../components/layouts/Header";
import RegistrationForm from "../../components/TravelerRegistration/RegistrationForm";
import SocialLogin from "../../components/TravelerRegistration/SocialLogin";
import Footer from "../../components/TravelerRegistration/Footer";
import { register } from "../../features/authentication/AuthActions";
const TravelerRegistration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State for form inputs
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    terms: false,
  });

  // State for error messages
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    terms: "",
  });

  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};

    // Validate username
    if (!formData.username.trim()) {
      newErrors.username = "Please enter your username.";
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Validate phone
    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your phone number.";
    } else if (!/^\d{9,}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    // Validate password
    if (!formData.password.trim()) {
      newErrors.password = "Please enter a password.";
    } else if (
      !/^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(formData.password)
    ) {
      newErrors.password =
        "Password must be at least 8 characters long and contain a number, an uppercase letter, and a symbol.";
    }

    // Validate terms
    if (!formData.terms) {
      newErrors.terms = "You must accept the terms and conditions.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Dispatch the register action
      dispatch(register(formData))
        .then((action) => {
          if (register.fulfilled.match(action)) {
            // Handle successful registration
            toast.success("Registration successful!");
            navigate("/login"); // Redirect to the login page
          } else if (register.rejected.match(action)) {
            // Handle registration error
            const errorMessage =
              action.payload?.error_description || "Registration failed. Please try again.";
            toast.error(errorMessage);
          }
        })
        .catch((err) => {
          console.error("Unexpected Error:", err); // Debugging
          toast.error("An unexpected error occurred. Please try again.");
        });
    }
  };

  const handleNavigate = () => {
     navigate('/login');
  }

  return (
    <div className={`${styles.registrationPage} ${styles.authPage}`}>
      <Header />
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
                <div className={styles.formWrapper}>
                  <h1 className={styles.formTitle}>Regístrate como viajero</h1>
                  <RegistrationForm
                    formData={formData}
                    errors={errors}
                    showPassword={showPassword}
                    handleInputChange={handleInputChange}
                    togglePasswordVisibility={togglePasswordVisibility}
                    handleSubmit={handleSubmit}
                    handleNavigate={handleNavigate}
                  />
                  <SocialLogin />
                  <Footer />
                </div>
              </div>
            </main>
          </div>
      </div>
    </div>
  );
};

export default TravelerRegistration;