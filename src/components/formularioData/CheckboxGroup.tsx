import React from "react";
import "./formularioData.css";

interface Option {
  label: string;
  value: string | number;
}

interface CheckboxGroupProps {
  name: string;
  label: string;
  options: Option[];
  value: (string | number)[];
  onChange: (name: string, value: (string | number)[]) => void;
  className?: string;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  name,
  label,
  options,
  value,
  onChange,
  className = "",
}) => {
  const handleCheckboxChange = (
    optionValue: string | number,
    checked: boolean
  ) => {
    const updatedValue = checked
      ? [...value, optionValue]
      : value.filter((v) => v !== optionValue);
    onChange(name, updatedValue);
  };

  return (
    <div className="checkbox_container">
      <label className="checkbox_label">{label}</label>
      <div className="checkbox_options">
        {options.map((option, index) => (
          <label key={index} className="checkbox-container">
            <input
              type="checkbox"
              name={name}
              value={option.value}
              checked={value.includes(option.value)}
              onChange={(e) =>
                handleCheckboxChange(option.value, e.target.checked)
              }
              className={`custom-checkbox ${className}`}
            />
            <span className="checkmark"></span>
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default CheckboxGroup;
