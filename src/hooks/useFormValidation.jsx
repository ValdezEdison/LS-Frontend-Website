import { useState, useEffect } from "react";

const useFormValidation = (initialValues, validationRules) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});



    // const validate = () => {
    //     const newErrors = {};
    //     Object.keys(validationRules).forEach((field) => {
    //         const isValid = validationRules[field](values[field], values);
    //         newErrors[field] = !isValid;
    //     });
    //     setErrors(newErrors);
    //     return newErrors;
    // };

    const validate = () => {
        const newErrors = {};
        Object.keys(validationRules).forEach((field) => {
            const errorMessage = validationRules[field](values[field], values);
            if (errorMessage) {
                newErrors[field] = errorMessage; // Store the error message
            }
        });
        setErrors(newErrors);
        return newErrors;
    };

    const validateDynamicFields = (fieldName) => {
        const dynamicFieldErrors = {};
        values[fieldName].forEach((field, index) => {
            Object.keys(field).forEach((subField) => {
                const errorMessage = validationRules[fieldName](field[subField], values);
                if (errorMessage) {
                    dynamicFieldErrors[`${fieldName}-${index}-${subField}`] = errorMessage;
                }
            });
        });
        setErrors((prevErrors) => ({ ...prevErrors, ...dynamicFieldErrors }));
        return Object.keys(dynamicFieldErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        // Handle checkbox input differently
        if (type === "checkbox") {
            setValues({
                ...values,
                [name]: checked, // Use the 'checked' property for checkboxes
            });
        } else {
            // Handle other input types (text, email, number, etc.)
            setValues({
                ...values,
                [name]: value,
            });
        }
    };

    const removeToolTip = (e) => {
        const { name } = e.target; // Destructure the 'name' from the event target
        setErrors((prevErrors) => {
            const updatedErrors = { ...prevErrors };
            delete updatedErrors[name]; // Use the 'name' of the input field to clear the error
            return updatedErrors;
        });
    };

    const handleCheckboxChange = (permission) => {
        setValues((prevValues) => {
            const updatedPermissions = prevValues.permissions || [];
            if (updatedPermissions.includes(permission)) {
                // Remove the permission if it exists
                return {
                    ...prevValues,
                    permissions: updatedPermissions.filter((perm) => perm !== permission),
                };
            } else {
                // Add the permission if it doesn't exist
                return {
                    ...prevValues,
                    permissions: [...updatedPermissions, permission],
                };
            }
        });
    };

    const removeTooltipFromRepeatedFormFields = (index, fieldName) => {
        setErrors((prevErrors) => {
            const updatedErrors = { ...prevErrors }; // Copy the previous errors (as an object)

            // Ensure there's an error entry for the specific row (index) and field (fieldName)
            if (updatedErrors.values[index] && updatedErrors.values[index][fieldName]) {
                // ;
                delete updatedErrors.values[index][fieldName]; // Remove the specific error for the field

                // If there are no more errors for this row, remove the entire row's error
                if (Object.keys(updatedErrors.values[index]).length === 0) {
                    delete updatedErrors.values[index]; // Remove the entire row's error object

                }
            }

            return updatedErrors; // Return the updated errors object
        });
    };



    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const updatedFormData = [...values];
        updatedFormData[index][name] = value;
        setValues(updatedFormData);
        removeTooltipFromRepeatedFormFields(index, name);
    };

    const validateRepeatForm = () => {
        const newErrors = {};

        // Validate each field or input using the validation rules
        Object.keys(validationRules).forEach((field) => {
            const isValid = validationRules[field](values[field], values); // Pass the field value and all values
            if (!isValid) {
                // Generate custom error messages
                if (field === "values") {
                    const rows = values;
                    const rowErrors = rows.map((row, index) => {
                        const errors = {};
                        if (!row.config_key || row.config_key.trim() === "") {
                            errors.config_key = `Config Key is required for row ${index + 1}.`;
                        }
                        if (!row.config_value || row.config_value.trim() === "") {
                            errors.config_value = `Config Value is required for row ${index + 1}.`;
                        }
                        return errors;
                    });
                    newErrors[field] = rowErrors; // Assign row-specific errors

                }
            }
        });

        setErrors(newErrors); // Update the errors state
        return newErrors; // Return errors for further use
    };


    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setValues({
            ...values,
            [name]: files[0], // Store the file in values
        });
    };


    const addDynamicField = (fieldName, initialValue) => {
        const isValid = validateDynamicFields(fieldName);
        if (isValid) {
            setValues((prevValues) => ({
                ...prevValues,
                [fieldName]: [...(prevValues[fieldName] || []), initialValue],
            }));
        }
    };

    const removeDynamicField = (fieldName, index) => {
        setValues((prevValues) => ({
            ...prevValues,
            [fieldName]: prevValues[fieldName].filter((_, i) => i !== index),
        }));
    };

    const updateDynamicField = (fieldName, index, value) => {
        setValues((prevValues) => ({
            ...prevValues,
            [fieldName]: prevValues[fieldName].map((item, i) => (i === index ? value : item)),
        }));
    };





    return {
        values,
        errors,
        setValues,
        setErrors,
        handleChange,
        validate,
        removeToolTip,
        handleCheckboxChange,
        handleInputChange,
        validateRepeatForm,
        handleFileChange,
        addDynamicField,
        removeDynamicField,
        updateDynamicField,
        validateDynamicFields,
    };
};

export default useFormValidation;
