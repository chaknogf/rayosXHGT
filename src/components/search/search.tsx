import React, { useState } from "react";
import "./search.css"; // Asegúrate de agregar este archivo de estilos

interface InputConfig {
  name: string;
  type: string;
  placeholder?: string;
}

interface SearchProps {
  inputs: InputConfig[]; // Lista de configuraciones para cada input
  onSearch: (values: { [key: string]: string }) => void; // Función que recibe los valores de los inputs
}

const Search: React.FC<SearchProps> = ({ inputs, onSearch }) => {
  const [formValues, setFormValues] = useState<{ [key: string]: string }>(
    inputs.reduce((acc, input) => ({ ...acc, [input.name]: "" }), {})
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Verificar si al menos un campo tiene valor
    const hasValues = Object.values(formValues).some(
      (value) => value.trim() !== ""
    );

    if (hasValues) {
      onSearch(formValues); // Enviar los valores del formulario
    } else {
      console.log(
        "Al menos un campo debe tener valor para realizar la búsqueda."
      );
    }
  };

  const handleClear = () => {
    // Restablecer todos los valores del formulario
    setFormValues(
      inputs.reduce((acc, input) => ({ ...acc, [input.name]: "" }), {})
    );
  };

  return (
    <form className="search-container" onSubmit={handleSubmit}>
      {inputs.map((input) => (
        <input
          key={input.name}
          type={input.type}
          name={input.name}
          value={formValues[input.name]}
          onChange={handleChange}
          placeholder={input.placeholder}
          className="search-input"
        />
      ))}
      <button type="submit" className="search-button">
        Buscar
      </button>
      <button type="button" onClick={handleClear} className="search-button">
        Borrar
      </button>
    </form>
  );
};

export default Search;
