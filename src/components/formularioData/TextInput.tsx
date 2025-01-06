import React from "react";
import "./formularioData.css";

interface TextInputProps {
  name: string;
  label: string;
  value: string | number;
  type?: "text" | "number" | "email" | "password";
  onChange: (name: string, value: string | number) => void;
  className?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  name,
  label,
  value,
  type = "text",
  onChange,
  className = "",
}) => (
  <div className="field_form">
    <input
      id={name}
      type={type}
      value={value}
      onChange={(e) => onChange(name, e.target.value)}
      className={`input_field ${className}`}
    />
    <label htmlFor={name} className="form_label">
      {label}
    </label>
  </div>
);

export default TextInput;
