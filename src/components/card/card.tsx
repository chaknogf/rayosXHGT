import React, { useState, useEffect } from "react";
import "@/components/card/card.css";
import Loader from "../loader/loader";
import { renderFunctions } from "@/components/card/rendersFunctions";

// Interfaz para definir las propiedades de cada campo en el card
interface RegistoCard<T> {
  label?: string; // El nombre de la columna o campo
  key?: keyof T; // La key que mapea a los datos de la fila
  render?: (data: T) => React.ReactNode; // Función de renderización personalizada
  svgIcon?: React.ReactNode; // SVG o icono a mostrar en la celda
  customFunction?: (data: T) => React.ReactNode; // Función adicional personalizada
  className?: string; // Clase CSS opcional para estilizar la celda
  section?: "header" | "body" | "option"; // Sección de la celda, puede ser "header" o "body"
  buttons?: Button[];
  iconReact?: string;
}

interface Button {
  label: string;
  onClick: () => void;
}

// Interfaz para el componente CardProps
interface CardProps<T> {
  data: T[]; // Arreglo de datos que se muestran en las celdas
  items: RegistoCard<T>[]; // Arreglo de celdas que indican cómo renderizar cada campo
  renderFunctions?: Record<string, (data: T) => React.ReactNode>;
}

// Interfaz para un objeto con valores de tipo string, number o undefined
interface ObjetX {
  [key: string]: string | number | undefined;
}

const DataCard = <T extends ObjetX>({ data, items }: CardProps<T>) => {
  const [showBody, setShowBody] = useState<boolean>(false);
  let enterTimeout: ReturnType<typeof setTimeout>;
  let leaveTimeout: ReturnType<typeof setTimeout>;

  const handleMouseEnter = () => {
    clearTimeout(leaveTimeout); // Limpiar cualquier timeout anterior de salida
    enterTimeout = setTimeout(() => {
      setShowBody(true);
    }, 100); // Retraso de 300ms antes de mostrar el cuerpo
  };

  const handleMouseLeave = () => {
    clearTimeout(enterTimeout); // Limpiar cualquier timeout anterior de entrada
    leaveTimeout = setTimeout(() => {
      setShowBody(false);
    }, 3200); // Retraso de 300ms antes de ocultar el cuerpo
  };

  return (
    <>
      <div className="card-container" tabIndex={0}>
        <div
          className="card"
          onClick={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Header */}
          <div className="card-header">
            <div className="titulos">
              {items
                .filter((item) => item.section === "header") // Filtrar celdas para el encabezado
                .map((item, itemIndex) => {
                  const renderFnHeader =
                    item.render || renderFunctions[item.key as string]; // Usar función personalizada o renderFunction
                  return (
                    <div
                      key={itemIndex}
                      className={`item-label ${item.className || ""}`}
                    >
                      <strong className="labelStrong zero">
                        {item.label}
                        <br />
                      </strong>{" "}
                      {/* Mostrar la etiqueta en el encabezado */}
                      {renderFnHeader
                        ? renderFnHeader(data[0]) // Usar renderFnHeader para mostrar el valor del primer elemento
                        : item.key &&
                          data.length > 0 &&
                          data[0][item.key] !== undefined
                        ? String(data[0][item.key]) // Mostrar el valor si renderFnHeader no está definido
                        : null}
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Body */}
          {showBody && (
            <div>
              <div className="card-options">
                {items
                  .filter((item) => item.section === "option")
                  .map((item, itemIndex) => {
                    const renderFnHeader =
                      item.render || renderFunctions[item.key as string]; // Usar función personalizada o renderFunction
                    return (
                      <div key={itemIndex} className="card-options-item">
                        <div className="btn-container">
                          <button
                            className="btn btn-opt  zero"
                            key={itemIndex}
                            onClick={item.onClick}
                          >
                            {renderFnHeader
                              ? renderFnHeader(data[0]) // Usar renderFnHeader para mostrar el valor del primer elemento
                              : item.key &&
                                data.length > 0 &&
                                data[0][item.key] !== undefined
                              ? String(data[0][item.key]) // Mostrar el valor si renderFnHeader no está definido
                              : null}
                          </button>
                          <p className="label-btn">{item.label}</p>
                        </div>
                      </div>
                    );
                  })}
              </div>

              <div className="table-vertical">
                {data.map((rowData, index) => (
                  <div key={index} className="table-row">
                    {items
                      .filter((item) => item.section === "body")
                      .map((item, itemIndex) => {
                        const renderFn =
                          item.render || renderFunctions[item.key as string]; // Usar función personalizada o renderFunction
                        return (
                          <div className="table-item" key={itemIndex}>
                            <div className="table-header">{item.label}:</div>
                            <div className="table-body">
                              {renderFn
                                ? renderFn(rowData) // Usar renderFn para mostrar el valor
                                : item.svgIcon // Mostrar SVG si existe
                                ? item.svgIcon
                                : item.key && rowData[item.key] !== undefined // Mostrar el valor si no se pasa renderFn
                                ? String(rowData[item.key])
                                : null}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const DataCards = <T extends ObjetX>({
  data,
  items,
}: {
  data: T[];
  items: RegistoCard<T>[];
}) => {
  const [loading, setLoading] = useState(true);

  // Simula una carga de datos
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Cambia a false después de 1 segundo (ajusta según sea necesario)
    }, 1000);

    return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
  }, []);

  return (
    <div className="registro-card-container">
      {loading ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : (
        data.map((item, index) => (
          <DataCard key={index} data={[item]} items={items} />
        ))
      )}
    </div>
  );
};

export default DataCards;
