import React, { useState } from "react";
import TextInput from "./TextInput";
import RadioGroup from "./RadioGroup";
import CheckboxGroup from "./CheckboxGroup";
import SelectInput from "./SelectInput";
import "./formularioData.css";

interface Option {
  label: string;
  value: string | number;
}

interface FieldProps<T> {
  inputName: keyof T;
  label: string;
  type:
    | "text"
    | "number"
    | "email"
    | "password"
    | "radio"
    | "checkbox"
    | "select";
  className?: string;
  options?: Option[]; // Opciones para campos de tipo select, radio o checkbox
}

interface FormProps<T> {
  title?: string;
  initialValues: T;
  fields: FieldProps<T>[];
  onSubmit: (values: T) => void;
  renderButtons?: (values: T) => React.ReactNode;
}

const CustomForm = <T extends Record<string, any>>({
  title,
  initialValues,
  fields,
  onSubmit,
  renderButtons,
}: FormProps<T>) => {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = (name: keyof T, value: T[keyof T]) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      {title && <h2 className="title">{title}</h2>}
      <div className="container_form">
        {fields.map((field, index) => {
          const fieldValue = values[field.inputName] || "";

          switch (field.type) {
            case "radio":
              return (
                <RadioGroup
                  key={index}
                  name={String(field.inputName)}
                  label={field.label}
                  options={field.options || []}
                  value={fieldValue}
                  onChange={handleChange}
                  className={field.className}
                />
              );
            case "checkbox":
              return (
                <CheckboxGroup
                  key={index}
                  name={String(field.inputName)}
                  label={field.label}
                  options={field.options || []}
                  value={fieldValue as (string | number)[]}
                  onChange={handleChange}
                  className={field.className}
                />
              );
            case "select":
              return (
                <SelectInput
                  key={index}
                  name={String(field.inputName)}
                  label={field.label}
                  options={field.options || []}
                  value={fieldValue}
                  onChange={handleChange}
                  className={field.className}
                />
              );
            default:
              return (
                <TextInput
                  key={index}
                  name={String(field.inputName)}
                  label={field.label}
                  type={field.type}
                  value={fieldValue}
                  onChange={handleChange}
                  className={field.className}
                />
              );
          }
        })}
      </div>
      <div className="form-buttons">
        {renderButtons ? (
          renderButtons(values)
        ) : (
          <button type="submit">Submit</button>
        )}
      </div>
    </form>
  );
};

export default CustomForm;
