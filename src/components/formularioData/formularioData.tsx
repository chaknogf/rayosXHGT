import React from "react";
import "@/components/formularioData/formularioData.css"


interface FieldProps<T> {
  name: keyof T;
  label: string;
  type: string;
  placeholder?: string;
  className?: string;
  useFlex?: boolean;
}

interface FormProps<T> {
  title?: string;
  message?: string;
  initialValues: T;
  funcButton: (values: T) => void;
  fields: FieldProps<T>[];
  className?: string;
  renderButtons?: (values: T) => React.ReactNode;
  renderInput?: () => React.ReactNode; // Nueva propiedad para renderizar campos personalizados
}

const CustomForm = <T,>({
  initialValues,
  funcButton,
  fields,
  className,
  title,
  message,
  renderButtons,
  renderInput, // Se agrega aquí
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
      
      {/* Renderizar campos adicionales */}
      {renderInput && renderInput()}

      <div className={`form ${fields.some((field) => field.useFlex) ? "flex" : ""}`}>
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
      <div className="flex-button">
        {renderButtons ? renderButtons(values) : <button type="submit" className="submit">Submit</button>}
      </div>
    </form>
  );
};

export default CustomForm;
