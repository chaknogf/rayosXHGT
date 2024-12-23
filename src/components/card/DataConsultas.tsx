import React from "react";
import "@/components/card/css/tableVertical.css";
interface TableVerticalProps<T> {
  data: T[];
  items: Array<{
    label?: string;
    key?: keyof T;
    render?: (data: T) => React.ReactNode;
    svgIcon?: React.ReactNode;
    section?: "consultas";
  }>;
  renderFunctions?: Record<string, (data: T) => React.ReactNode>;
}

const DataConsultas = <T,>({
  data,
  items,
  renderFunctions = {},
}: TableVerticalProps<T>) => {
  return (
    <div className="table-vertical">
      {data.map((rowData, index) => (
        <div key={index} className="table-row_">
          {items
            .filter((item) => item.section === "consultas")
            .map((item, itemIndex) => {
              const renderFn =
                item.render || renderFunctions[item.key as string];
              return (
                <div className="table-item" key={itemIndex}>
                  <div className="table-header">{item.label}:</div>
                  <div className="table-body">
                    {renderFn
                      ? renderFn(rowData)
                      : item.svgIcon
                      ? item.svgIcon
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

export default DataConsultas;
