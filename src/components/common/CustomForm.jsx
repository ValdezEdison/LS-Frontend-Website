import CustomInput from "./CustomInput";

const CustomForm = ({ fields, values, errors, handleChange, handleFileChange, removeToolTip, onSubmit, addDynamicField, removeDynamicField, updateDynamicField, validateDynamicFields, dynamicFieldNames = [], }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate dynamic fields (if any)
        let isValid = true;
        if (dynamicFieldNames.length > 0) {
            dynamicFieldNames.forEach((fieldName) => {
                const fieldErrors = validateDynamicFields(fieldName);
                if (Object.keys(fieldErrors).length > 0) {
                    isValid = false;
                }
            });
        }

        // If no errors, proceed with submission
        if (isValid) {
            onSubmit();
        }
    };

    const renderInput = (field) => {
        const inputClassName = field.class || "w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";

        switch (field.type) {
            case "text":
            case "email":
            case "number":
            case "password":
                return (
                    <CustomInput
                        type={field.type}
                        name={field.name}
                        value={values[field.name]}
                        placeholder={field.placeholder}
                        onChange={handleChange}
                        onFocus={removeToolTip}
                        className={inputClassName}
                    />
                );

            case "textarea":
                return (
                    <textarea
                        name={field.name}
                        value={values[field.name]}
                        placeholder={field.placeholder}
                        onChange={handleChange}
                        onFocus={removeToolTip}
                        className={inputClassName}
                        rows={4}
                    />
                );

            case "select":
                return (
                    <select
                        name={field.name}
                        value={values[field.name]}
                        onChange={handleChange}
                        onFocus={removeToolTip}
                        className={inputClassName}
                    >
                        <option value="" disabled>
                            {field.placeholder || "Select an option"}
                        </option>
                        {field.options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                );

            case "checkbox":
                return (
                    <CustomInput
                        type="checkbox"
                        name={field.name}
                        checked={values[field.name] || false}
                        onChange={handleChange}
                        onFocus={removeToolTip}
                        className={inputClassName}
                    />
                );

            case "radio":
                return field.options.map((option) => (
                    <label key={option.value} className="flex items-center space-x-2">
                        <CustomInput
                            type="radio"
                            name={field.name}
                            value={option.value}
                            checked={values[field.name] === option.value}
                            onChange={handleChange}
                            onFocus={removeToolTip}
                            className={inputClassName}
                        />
                        <span>{option.label}</span>
                    </label>
                ));

            case "date":
                return (
                    <CustomInput
                        type="date"
                        name={field.name}
                        value={values[field.name]}
                        onChange={handleChange}
                        onFocus={removeToolTip}
                        className={inputClassName}
                    />
                );

            case "file":
                return (
                    <CustomInput
                        type="file"
                        name={field.name}
                        onChange={handleFileChange}
                        onFocus={removeToolTip}
                        className={inputClassName}
                    />
                );

            case "dynamic":
                return (
                    <div>
                        {values[field.name].map((value, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                {field.fields.map((subField) => (
                                    <CustomInput
                                        key={subField.name}
                                        type={subField.type}
                                        name={`${field.name}-${index}-${subField.name}`}
                                        value={value[subField.name]}
                                        placeholder={subField.placeholder}
                                        onChange={(e) => updateDynamicField(field.name, index, { ...value, [subField.name]: e.target.value })}
                                        onFocus={removeToolTip}
                                        className={inputClassName}
                                    />
                                ))}
                                <button
                                    type="button"
                                    onClick={() => removeDynamicField(field.name, index)}
                                    className="px-2 py-1 text-white bg-red-500 rounded-md hover:bg-red-600"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => addDynamicField(field.name, { startTime: "", endTime: "" })}
                            className="mt-2 px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
                        >
                            Add {field.label}
                        </button>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <form onSubmit={handleSubmit} className="">
            {fields.map((field) => (
                <div key={field.name} className="flex flex-col space-y-2">
                    <label className="font-semibold">{field.label}</label>
                    {renderInput(field)}
                    {errors[field.name] && (
                        <span className="text-red-500 text-sm">{errors[field.name]}</span>
                    )}
                </div>
            ))}
            <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Submit
            </button>
        </form>
    );
};

export default CustomForm;