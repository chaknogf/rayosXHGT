import React from "react";
import "./formularioData.css";

interface Option {
  label: string;
  value: string | number;
}

interface RadioGroupProps {
  name: string;
  label: string;
  options: Option[];
  value: string | number;
  onChange: (name: string, value: string | number) => void;
  className?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  label,
  options,
  value,
  onChange,
  className = "",
}) => (
  <div className="radio_">
    <label className="radio_label">{label}</label>
    {options.map((option, index) => (
      <label key={index} className="radio_container">
        <input
          type="radio"
          name={name}
          value={option.value}
          checked={value === option.value}
          onChange={() => onChange(name, option.value)}
          className={`input_radio ${className}`}
        />
        {option.label}
      </label>
    ))}
  </div>
);

export default RadioGroup;
