import React from "react";
import "@/components/formularioData/formularioData.css"


interface FieldProps<T> {
  inputName: keyof T;
  label: string;
  type: string;
  className?: string;
  useFlex?: boolean;
  options?: string;
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
              {/* Renderizado condicional para tipo 'radio' */}
              {field.type === "radio" ? (
                <>
                  {/* El label solo se muestra una vez para el grupo de radios */}
                  <label className="radio_label">{field.label}</label>

                  {/* Mapeo de las opciones de radio */}
                  {field.options.map((option: { label: string, value: any }, radioIndex: number) => (
                    <div key={radioIndex} className="radio_option">
                      <input
                        type="radio"
                        id={`${field.label}-${option.value}`}
                        name={field.inputName}
                        value={option.value}
                        checked={values[field.inputName] === option.value}
                        onChange={(e) =>
                          handleChange(field.inputName, option.value as T[keyof T])
                        }
                        className={`input_radio ${field.className}`}
                      />
                      <label htmlFor={`${field.label}-${option.value}`}>{option.label}</label>
                    </div>
                  ))}
                </>
              ) : field.type === "select" ? (
                <div className="select_container">
                  <label className="select_label">{field.label}</label>
                  <select
                    name={field.inputName}
                    className={`input_select ${field.className}`}
                    value={values[field.inputName] as string}
                    onChange={(e) =>
                      handleChange(field.inputName, e.target.value as T[keyof T])
                    }
                  >
                    {field.options.map((option: { label: string, value: any }, selectIndex: number) => (
                      <option key={selectIndex} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <>
                  <input
                    placeholder={field.label}
                    type={field.type}
                    className={`input_field ${field.className}`}
                    value={values[field.inputName] as string}
                    onChange={(e) =>
                      handleChange(field.inputName, e.target.value as T[keyof T])
                    }
                  />
                  <label className="form_label">{field.label}</label>
                </>
              )}
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
