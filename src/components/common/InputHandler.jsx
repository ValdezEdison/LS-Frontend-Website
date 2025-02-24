import React from 'react';
import CustomInput from './CustomInput'; // Import the CustomInput component

const InputHandler = ({
    type = 'text',
    name = '',
    id = '',
    label = '',
    value = '',
    placeholder = '',
    accept = '',
    min = '',
    max = '',
    checked = false,
    isReadOnly = false,
    disabled = false,
    autoComplete = 'off',
    className = '',
    options = [],
    onChange = () => { },
    onFocus = () => { },
    onBlur = () => { },
    onClick = () => { },
    onKeyDown = () => { },
}) => {
    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        const inputValue = type === 'checkbox' || type === 'radio' ? checked : value;
        onChange(name, inputValue);
    };

    switch (type) {
        case 'select':
            return (
                <div>
                    {label && <label>{label}</label>}
                    <select
                        name={name}
                        id={id}
                        value={value}
                        onChange={handleChange}
                        className={className}
                        disabled={disabled}
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            );

        case 'radio':
            return (
                <div>
                    {label && <label>{label}</label>}
                    {options.map((option) => (
                        <div key={option.value}>
                            <input
                                type="radio"
                                name={name}
                                id={id}
                                value={option.value}
                                checked={value === option.value}
                                onChange={handleChange}
                                onFocus={onFocus}
                                onBlur={onBlur}
                                onClick={onClick}
                                className={className}
                                disabled={disabled}
                            />
                            {option.label}
                        </div>
                    ))}
                </div>
            );

        case 'checkbox':
            return (
                <div>
                    <label>
                        <input
                            type="checkbox"
                            name={name}
                            id={id}
                            checked={checked}
                            onChange={handleChange}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            onClick={onClick}
                            className={className}
                            disabled={disabled}
                        />
                        {label}
                    </label>
                </div>
            );

        case 'textarea':
            return (
                <div>
                    {label && <label>{label}</label>}
                    <textarea
                        name={name}
                        id={id}
                        value={value}
                        placeholder={placeholder}
                        onChange={handleChange}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onClick={onClick}
                        className={className}
                        readOnly={isReadOnly}
                        disabled={disabled}
                    />
                </div>
            );

        default:
            // Use CustomInput for default input types (text, email, password, etc.)
            return (
                <CustomInput
                    type={type}
                    name={name}
                    id={id}
                    label={label}
                    value={value}
                    placeholder={placeholder}
                    accept={accept}
                    min={min}
                    max={max}
                    checked={checked}
                    onChange={handleChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onClick={onClick}
                    onKeyDown={onKeyDown}
                    className={className}
                    isReadOnly={isReadOnly}
                    disabled={disabled}
                    autoComplete={autoComplete}
                />
            );
    }
};

export default InputHandler;