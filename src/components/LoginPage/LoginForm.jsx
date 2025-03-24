import React from "react";
import styles from "./LoginForm.module.css";

const LoginForm = ({
  obj,
  errorMsg,
  showPassword,
  handleInputChange,
  handleTogglePassword,
  validateForm,
  handleNavigate
}) => {
  return (
    <form className={styles.loginForm} onSubmit={validateForm}>
      {/* Display error messages */}
     
      
   

      {/* Email Input */}
      <div className={styles.inputGroup}>
      <div className="form-group">
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
      
        <input
          type="email"
          id="email"
          name="email"
          className={`${styles.input} ${
            errorMsg.has_error_in_email ? styles.inputError : ""
          }`}
          placeholder="Enter your email"
          aria-label="Email"
          value={obj.email}
          onChange={handleInputChange}
        />
        {errorMsg.has_error_in_email && (
        <div className={styles.errorMessage}>Please enter a valid email.</div>
        )}
      </div>
      </div>

      {/* Password Input */}
      <div className={styles.inputGroup}>
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <div className={`${styles.formGroup} ${styles.error}`}>
          <div className={styles.passwordInput}>
          <div className={`${styles.showPassword} ${styles.clicked}`} onClick={handleTogglePassword}></div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className={`${styles.input} ${
                errorMsg.has_error_in_password ? styles.inputError : ""
              }`}
              placeholder="Enter your password"
              aria-label="Password"
              value={obj.password}
              onChange={handleInputChange}
            />
            
          </div>
        {errorMsg.has_error_in_password && (
            <div className={styles.errorMessage}>Please enter a valid password.</div>
          )}
        </div>
       
      </div>

      {/* Remember Me and Forgot Password */}
      <div className={styles.optionsRow}>
        <div className={styles.rememberMe}>
          <label className="check-container login-check">
            <input type="checkbox" id="remember" />
            <span className="checkmark"></span>
            Remember Me
          </label>
        </div>
        <a href="#" className={styles.forgotPassword}>
          Forgot Password?
        </a>
      </div>

      {/* Submit Button */}
      <button type="submit" className={`${styles.submitButton} ${styles.active}`}>
        Log In
      </button>

      {/* Register Prompt */}
      <p className={styles.registerPrompt}>
        Don't have an account?{" "}
        <a className={styles.registerLink} onClick={handleNavigate}>
          Register
        </a>
      </p>
    </form>
  );
};

export default LoginForm;