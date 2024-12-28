import React, { useState } from "react";
import "./search.css";

interface InputConfig {
  name: string;
  type: string;
  placeholder?: string;
}

interface SearchProps {
  inputs: InputConfig[]; // Configuración dinámica de campos
  onFetch: (values: { [key: string]: string }) => Promise<any>; // Función para realizar la búsqueda (fetch)
}

const Search: React.FC<SearchProps> = ({ inputs, onFetch }) => {
  const [formValues, setFormValues] = useState<{ [key: string]: string }>(
    inputs.reduce((acc, input) => ({ ...acc, [input.name]: "" }), {})
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await onFetch(formValues); // Llamada a la función fetch
      setData(response); // Guardar los datos obtenidos
      console.log("Datos obtenidos:", response);
    } catch (err) {
      setError("Error al realizar la búsqueda. Por favor, inténtelo de nuevo.");
      console.error("Error al buscar:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setFormValues(
      inputs.reduce((acc, input) => ({ ...acc, [input.name]: "" }), {})
    );
    setData(null);
  };

  return (
    <div id="form-ui">
      <form id="form" onSubmit={handleSubmit}>
        <div id="form-body">
          <div id="welcome-lines">
            <div id="welcome-line-1">Búsqueda de Pacientes</div>
          </div>
          <div id="input-area">
            {inputs.map((input) => (
              <div className="form-inp" key={input.name}>
                <input
                  type={input.type}
                  name={input.name}
                  value={formValues[input.name]}
                  onChange={handleChange}
                  placeholder={input.placeholder}
                />
              </div>
            ))}
          </div>
          <div id="submit-button-cvr">
            <button id="submit-button" type="submit" disabled={isLoading}>
              {isLoading ? "Buscando..." : "Buscar"}
            </button>
            <button
              id="clear-button"
              type="button"
              onClick={handleClear}
              style={{ marginLeft: "10px" }}
            >
              Borrar
            </button>
          </div>
          {error && <div className="error-message">{error}</div>}
        </div>
      </form>
      {data && (
        <div className="results">
          <h3>Resultados:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Search;
