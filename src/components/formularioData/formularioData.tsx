import React from "react";
import "@/style.css"

interface FieldProps<T> {
  name: keyof T;
  label: string;
  type: string;
  placeholder?: string;
  className?: string; // Para personalizar el estilo de cada campo
  render?: (field: FieldProps<T>, value: T[keyof T], onChange: (value: T[keyof T]) => void) => React.ReactNode;
}

interface FormProps<T> {
  title?: string;
  message?: string;
  initialValues: T;
  onSubmit: (values: T) => void;
  fields: FieldProps<T>[];
  className?: string; // Para personalizar el estilo del formulario
}

const CustomForm = <T,>({ initialValues, onSubmit, fields, className, title, message }: FormProps<T>) => {
  const [values, setValues] = React.useState<T>(initialValues);

  const handleChange = (name: keyof T, value: T[keyof T]) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className={`cuadro ${className}`}>
      {title && <p className="title">{title}</p>}
      {message && <p className="message">{message}</p>}
      <div className="form">
        {fields.map((field, index) => (
          <label key={index}>
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
      <div className="flex ">
        <button type="submit" className="submit">Submit</button>
        <button type="submit" className="submit">Submit</button>
        <button type="submit" className="submit">Submit</button>
        
      </div>
      
    </form>
  );
};

export default CustomForm;
