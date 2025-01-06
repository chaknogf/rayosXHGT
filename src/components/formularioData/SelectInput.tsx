import React from "react";
import "./formularioData.css";

interface Option {
  label: string;
  value: string | number;
}

interface SelectInputProps {
  name: string;
  label: string;
  options: Option[];
  value: string | number;
  onChange: (name: string, value: string | number) => void;
  className?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
  name,
  label,
  options,
  value,
  onChange,
  className = "",
}) => (
  <div className="select_container">
    <label htmlFor={name} className="select_label">
      {label}
    </label>
    <select
      id={name}
      value={value}
      onChange={(e) => onChange(name, e.target.value)}
      className={`input_select ${className}`}
    >
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default SelectInput;
