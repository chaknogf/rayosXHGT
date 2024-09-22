import React from "react";
import "@/components/formularioData/formularioData.css";

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
  renderInput,
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
        <div className="title">{title && <p className="title">{title}</p>}</div>
        <div className="container_form">
          {fields.map((field, index) => (
            <div className="field_form" key={index}>
              {/* Renderizado condicional para tipo 'radio' */}
              {field.type === "radio" ? (
                <div className="radio_">
                  <label className="radio_label">{field.label}</label>
                  {field.options.map((option, radioIndex) => (
                    <div key={radioIndex} className="radio_container">
                      <label htmlFor={`${field.label}-${option.value}`}>
                        <input
                          type="radio"
                          id={`${field.label}-${option.value}`}
                          name={field.inputName}
                          value={option.value}
                          checked={values[field.inputName] === option.value}
                          onChange={() =>
                            handleChange(
                              field.inputName,
                              option.value as T[keyof T]
                            )
                          }
                          className={`input_radio ${field.className}`}
                        />
                        <span>{option.label}</span>
                      </label>
                    </div>
                  ))}
                </div>
              ) : field.type === "select" ? (
                <div className="select_container">
                  <label className="select_label">{field.label}</label>
                  <select
                    name={field.inputName}
                    className={`input_select ${field.className}`}
                    value={values[field.inputName] || ""}
                    onChange={(e) =>
                      handleChange(
                        field.inputName,
                        e.target.value as T[keyof T]
                      )
                    }
                  >
                    {field.options.map((option, selectIndex) => (
                      <option key={selectIndex} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              ) : field.type === "checkbox" ? (
                <div className="checkbox_container">
                  <label className="checkbox_label">{field.label}</label>
                  <div className="checkbox_options">
                    {field.options.map((option, checkboxIndex) => (
                      <div key={checkboxIndex} className="checkbox_option">
                        <label
                          className="checkbox-container"
                          htmlFor={`${field.label}-${option.value}`}
                        >
                          <input
                            type="checkbox"
                            id={`${field.label}-${option.value}`}
                            name={field.inputName}
                            value={option.value}
                            checked={values[field.inputName]?.includes(
                              option.value
                            )}
                            onChange={(e) => {
                              const newValue = e.target.checked
                                ? [
                                    ...(values[field.inputName] || []),
                                    option.value,
                                  ]
                                : values[field.inputName]?.filter(
                                    (v) => v !== option.value
                                  );

                              handleChange(
                                field.inputName,
                                newValue as T[keyof T]
                              );
                            }}
                            className={`custom-checkbox ${field.className}`}
                          />
                          <span className="checkmark"></span>
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <input
                    placeholder={field.label}
                    type={field.type}
                    className={`input_field ${field.className}`}
                    value={values[field.inputName] || ""}
                    onChange={(e) =>
                      handleChange(
                        field.inputName,
                        e.target.value as T[keyof T]
                      )
                    }
                  />
                  <label className="form_label">{field.label}</label>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="flex-button">
          {renderButtons ? (
            renderButtons(values)
          ) : (
            <button type="button" className="m-0 p-0">
              Submit
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default CustomForm;
