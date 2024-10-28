import React, { useState, useEffect } from "react";
import "@/components/card/card.css";
import Loader from "../loader/loader";
import { renderFunctions } from "@/components/card/rendersFunctions";
import Search from "../search/search";

// Interfaz para definir las propiedades de cada campo en el card
interface RegistoCard<T> {
  label?: string;
  key?: keyof T;
  render?: (data: T) => React.ReactNode;
  svgIcon?: React.ReactNode;
  customFunction?: (data: T) => React.ReactNode;
  className?: string;
  section?: "header" | "body" | "option";
  buttons?: Button[];
  iconReact?: string;
}

interface Button {
  label: string;
  onClick: () => void;
}

interface CardProps<T> {
  data: T[];
  items: RegistoCard<T>[];
  renderFunctions?: Record<string, (data: T) => React.ReactNode>;
}

interface ObjetX {
  [key: string]: string | number | undefined;
}

const DataCard = <T extends ObjetX>({ data, items }: CardProps<T>) => {
  const [showBody, setShowBody] = useState<boolean>(false);
  let enterTimeout: ReturnType<typeof setTimeout>;
  let leaveTimeout: ReturnType<typeof setTimeout>;

  const handleMouseEnter = () => {
    clearTimeout(leaveTimeout);
    enterTimeout = setTimeout(() => setShowBody(true), 100);
  };

  const handleMouseLeave = () => {
    clearTimeout(enterTimeout);
    leaveTimeout = setTimeout(() => setShowBody(false), 3200);
  };

  return (
    <div className="card-container" tabIndex={0}>
      <div
        className="card"
        onClick={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="card-header">
          <div className="titulos">
            {items
              .filter((item) => item.section === "header")
              .map((item, itemIndex) => {
                const renderFnHeader =
                  item.render || renderFunctions[item.key as string];
                return (
                  <div key={itemIndex} className={`item-label ${item.className || ""}`}>
                    <strong className="labelStrong zero">{item.label}<br /></strong>
                    {renderFnHeader
                      ? renderFnHeader(data[0])
                      : item.key && data[0][item.key] !== undefined
                      ? String(data[0][item.key])
                      : null}
                  </div>
                );
              })}
          </div>
        </div>

        {showBody && (
          <div>
            <div className="card-options">
              {items
                .filter((item) => item.section === "option")
                .map((item, itemIndex) => {
                  const renderFnHeader =
                    item.render || renderFunctions[item.key as string];
                  return (
                    <div key={itemIndex} className="card-options-item">
                      <div className="btn-container">
                        <button
                          className="btn btn-opt zero"
                          onClick={item.onClick}
                        >
                          {renderFnHeader ? renderFnHeader(data[0]) : item.key && data[0][item.key] !== undefined ? String(data[0][item.key]) : null}
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
                      const renderFn = item.render || renderFunctions[item.key as string];
                      return (
                        <div className="table-item" key={itemIndex}>
                          <div className="table-header">{item.label}:</div>
                          <div className="table-body">
                            {renderFn ? renderFn(rowData) : item.svgIcon ? item.svgIcon : item.key && rowData[item.key] !== undefined ? String(rowData[item.key]) : null}
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
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredData = data.filter((item) =>
    items.some((field) =>
      field.key ? String(item[field.key]).toLowerCase().includes(searchTerm.toLowerCase()) : false
    )
  );

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="registro-card-container">
        {loading ? (
          <div className="loader-container">
            <Loader />
          </div>
        ) : (
          filteredData.map((item, index) => (
            <DataCard key={index} data={[item]} items={items} />
          ))
        )}
      </div>
      
      {/* Contenedor fijo para el componente de búsqueda */}
      <div className="search-container">
        <Search onSearch={setSearchTerm} /> {/* Componente de búsqueda */}
      </div>
    </>
  );
  
};

export default DataCards;
