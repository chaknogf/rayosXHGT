import React from "react";

interface FieldProps<T> {
  name: keyof T;
  label: string;
  type: string;
  placeholder?: string;
  className?: string; // Para personalizar el estilo de cada campo
  render?: (field: FieldProps<T>, value: T[keyof T], onChange: (value: T[keyof T]) => void) => React.ReactNode;
}

interface FormProps<T> {
  initialValues: T;
  onSubmit: (values: T) => void;
  fields: FieldProps<T>[];
  className?: string; // Para personalizar el estilo del formulario
}

const CustomForm = <T,>({ initialValues, onSubmit, fields, className }: FormProps<T>) => {
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
    <form onSubmit={handleSubmit} className={className}>
      <div className="login wrap">
        <div className="h1">Formulario</div>
        {fields.map((field, index) => (
          <input
            key={index}
            id={field.name as string}
            name={field.name as string}
            type={field.type}
            placeholder={field.placeholder || field.label}
            className={field.className}
            value={values[field.name] as string}
            onChange={(e) => handleChange(field.name, e.target.value as T[keyof T])}
          />
        ))}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CustomForm;
