import React from "react";
import "@/style.css";

interface FieldProps<T> {
  name: keyof T;
  label: string;
  type: string;
  placeholder?: string;
  className?: string;
  useFlex?: boolean; // Nueva propiedad
}

interface FormProps<T> {
  title?: string;
  message?: string;
  initialValues: T;
  funcButton: (values: T) => void;
  fields: FieldProps<T>[];
  className?: string;
  renderButtons?: (values: T) => React.ReactNode;
}

const CustomForm = <T,>({
  initialValues,
  funcButton,
  fields,
  className,
  title,
  message,
  renderButtons,
}: FormProps<T>) => {
  const [values, setValues] = React.useState<T>(initialValues);

  const handleChange = (name: keyof T, value: T[keyof T]) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    funcButton(values);
  };

  return (
    <form onSubmit={handleSubmit} className={`cuadro ${className}`}>
      {title && <p className="title">{title}</p>}
      {message && <p className="message">{message}</p>}
      <div className="form">
        {fields.map((field, index) => (
          <label key={index} className={field.useFlex ? "flex" : ""}>
            <input
              required
              placeholder={field.placeholder}
              type={field.type}
              className={`input ${field.className}`}
              value={values[field.name] as string}
              onChange={(e) => handleChange(field.name, e.target.value as T[keyof T])}
            />
            <span>{field.label}</span>
          </label>
        ))}
      </div>
      <div className="flex-buttom">
        {renderButtons && renderButtons(values as T)}
      </div>
    </form>
  );
};

export default CustomForm;
