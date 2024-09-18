import React from "react";
import "@/components/formularioData/formularioData.css"


interface FieldProps<T> {
  input: keyof T;
  label: string;
  type: string;
  className?: string;
  useFlex?: boolean;
}

interface FormProps<T> {
  title?: string;
  message?: string;
  initialValues: T;
  funcButton?: (values: T) => void;
  fields?: FieldProps<T>[];
  className?: string;
  renderButtons?: (values: T) => React.ReactNode;
  renderInput?: () => React.ReactNode; // Nueva propiedad para renderizar campos personalizados
}

const CustomForm = <T,>({
  initialValues,
  fields,
  title,
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

  // const handleSubmit = (event: React.FormEvent) => {
  //   event.preventDefault();
  //   funcButton(values);
  // };

  return (
    <>
     
     <form className="form">
        <div className="title">
          {title && <p className="title">{title}</p>}
        </div> 
        
        <div className="container_form">
          {fields.map((field, index) => (
            <div className="field_form" key={index}>
              <input
                placeholder={field.label}
                type={field.type}
                className={`input_field ${field.className}`}
                value={values[field.input] as string}
                onChange={(e) => handleChange(field.input, e.target.value as T[keyof T])}
              />
              <label className="form_label">{field.label}</label>
            </div>
          ))}
        </div>
        
        <div className="flex-button">
          {renderButtons ? renderButtons(values) : <button type="button" className="m-0 p-0">Submit</button>}
        </div>
      </form>


    </>
    

  );
};

export default CustomForm;
