import React, { ReactNode } from "react";

interface FieldProps<T> {
  name: keyof T;
  label: string;
  type: string;
  placeholder?: string;
  className?: string; // Para personalizar el estilo de cada campo
  render?: (field: FieldProps<T>, value: T[keyof T], onChange: (value: T[keyof T]) => void) => ReactNode;
}

interface FormProps<T> {
  initialValues: T;
  onSubmit: (values: T) => void;
  fields: FieldProps<T>[];
  className?: string; // Para personalizar el estilo del formulario
}

const ReusForm = <T,>({ initialValues, onSubmit, fields, className }: FormProps<T>) => {
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
      {fields.map((field, index) => (
        <div key={index} className={field.className}>
          <label htmlFor={field.name as string}>{field.label}</label>
          {field.render ? (
            field.render(field, values[field.name], (value) => handleChange(field.name, value))
          ) : (
            <input
              type={field.type}
              id={field.name as string}
              name={field.name as string}
              value={values[field.name] as string}
              onChange={(e) => handleChange(field.name, e.target.value as T[keyof T])}
              placeholder={field.placeholder}
              className={field.className}
            />
          )}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default ReusForm;


{/* <div class="form__group field">
    <input type="input" class="form__field" placeholder="Name" required="">
    <label for="name" class="form__label">Nombre</label>
</div> */}

{/* <input type="text" name="text" class="input-robot" placeholder="Write a message"></input> */}