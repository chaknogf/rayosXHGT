import React from "react";
import "@/components/card/css/option.css";

interface OptionsProps<T> {
  data: T[];
  items: Array<{
    label?: string;
    key?: keyof T;
    render?: (data: T) => React.ReactNode;
    svgIcon?: React.ReactNode;
    section?: "option";
    onClick?: (data: T) => void; // Nuevo: manejador de clics
  }>;
  renderFunctions?: Record<string, (data: T) => React.ReactNode>;
}

const OptionCard = <T,>({
  data,
  items,
  renderFunctions = {},
}: OptionsProps<T>) => {
  return (
    <div className=" zero">
      {data.map((rowData, index) => (
        <div key={index} className="card-options">
          {items
            .filter((item) => item.section === "option")
            .map((item, itemIndex) => {
              const renderFn =
                item.render || renderFunctions[item.key as string];

              // Asegúrate de pasar la función handleCopy correctamente
              const handleClick = item.onClick;

              return (
                <div className="card-options-item" key={itemIndex}>
                  <div
                    className="btn-opt"
                    onClick={() => handleClick?.(rowData)}
                  >
                    {renderFn
                      ? renderFn(rowData)
                      : item.key && rowData[item.key] !== undefined
                      ? String(rowData[item.key])
                      : null}
                  </div>
                  <div className="btn-container">{item.label}</div>
                </div>
              );
            })}
        </div>
      ))}
    </div>
  );
};

export default OptionCard;
