import React from "react";
import CustomInput from "./CustomInput";
// import styles from "../../pages/login/LoginPage.module.css";
import  styles from "../TravelerRegistration/RegistrationForm.module.css";
import LoginFormStyles from "../LoginPage/LoginForm.module.css";

const CustomForm = ({
  fields,
  formData,
  fieldStates,
  handleChange,
  handleSubmit,
  handleFocus,
  handleBlur,
  showPassword,
  togglePasswordVisibility,
  isFormValid,
  submitButtonText = "Submit",
  additionalElements,
}) => {
  const renderInput = (field) => {
    const commonProps = {
      name: field.name,
      value: formData[field.name],
      onChange: handleChange,
      onFocus: () => handleFocus(field.name),
      onBlur: () => handleBlur(field.name),
      className: `${styles.input} ${
        fieldStates[field.name]?.error && fieldStates[field.name]?.touched 
          ? styles.inputError 
          : ""
      }`,
      placeholder: field.placeholder,
    };

    switch (field.type) {
      case "text":
      case "email":
      case "tel":
      case "number":
        return <CustomInput type={field.type} {...commonProps} />;
      
      case "password":
        return (
          <div className={styles.passwordInput}>
            <div 
              className={`${styles.showPassword} ${
                showPassword ? styles.clicked : ''
              }`} 
              onClick={togglePasswordVisibility}
            ></div>
            <CustomInput 
              type={showPassword ? "text" : "password"} 
              {...commonProps}
            />
          </div>
        );
      
      case "checkbox":
        return (
          <label className={styles.checkboxLabel}>
            <CustomInput 
              type="checkbox" 
              checked={formData[field.name] || false}
              {...commonProps}
            />
            <span className={styles.checkmark}></span>
            {field.labelText}
          </label>
        );
      
      case "select":
        return (
          <select {...commonProps}>
            <option value="" disabled>{field.placeholder}</option>
            {field.options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {fields.map((field) => (
        <div key={field.name} className={styles.inputGroup}>
          {field.type !== "checkbox" && (
            <label htmlFor={field.name} className={styles.label}>
              {field.label}
            </label>
          )}
          
          {field.type === "password" && field.requirements && (
            <div className={styles.passwordRequirements}>
              {field.requirements}
            </div>
          )}
          
          {renderInput(field)}
          
          {!fieldStates[field.name]?.isValid && fieldStates[field.name]?.focused && (
            <div className={styles.infoMessage}>
              {fieldStates[field.name]?.info}
            </div>
          )}
          
          {fieldStates[field.name]?.error && fieldStates[field.name]?.touched && (
            <div className={styles.errorMessage}>
              {fieldStates[field.name]?.error}
            </div>
          )}
        </div>
      ))}
      
      {additionalElements?.beforeSubmit}
      
      <button 
        type="submit" 
        className={`${styles.submitButton} ${
          isFormValid ? styles.active : ''
        }`}
        disabled={!isFormValid}
      >
        {submitButtonText}
      </button>
      
      {additionalElements?.afterSubmit}
    </form>
  );
};

export default CustomForm;