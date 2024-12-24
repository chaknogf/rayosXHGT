import React from "react";
import "@/components/card/css/tableVertical.css";

interface TableVerticalProps<T> {
  data: T[];
  items: Array<{
    label?: string;
    key?: keyof T;
    render?: (data: T) => React.ReactNode;
    svgIcon?: React.ReactNode;
    section?: "body";
    onClick?: (data: T) => void; // Nuevo: manejador de clics
  }>;
  renderFunctions?: Record<string, (data: T) => React.ReactNode>;
}

const DataBody = <T,>({
  data,
  items,
  renderFunctions = {},
}: TableVerticalProps<T>) => {
  return (
    <div className="table-vertical">
      {data.map((rowData, index) => (
        <div key={index} className="table-row_">
          {items
            .filter((item) => item.section === "body")
            .map((item, itemIndex) => {
              const renderFn =
                item.render || renderFunctions[item.key as string];

              // Asegúrate de pasar la función handleCopy correctamente
              const handleClick = item.onClick;

              return (
                <div className="data-item" key={itemIndex}>
                  <div className="data-header">{item.label}:</div>
                  <div
                    className="table-body_"
                    onClick={() => handleClick?.(rowData)}
                  >
                    {renderFn
                      ? renderFn(rowData)
                      : item.key && rowData[item.key] !== undefined
                      ? String(rowData[item.key])
                      : null}
                  </div>
                </div>
              );
            })}
        </div>
      ))}
    </div>
  );
};

export default DataBody;
