import React from "react";

// Extiende la interfaz para permitir un SVG o una función personalizada
interface TableColumn<T> {
  label: string;
  key: keyof T;
  render?: (data: T) => React.ReactNode;
  svgIcon?: React.ReactNode; // SVG opcional para la columna
  customFunction?: (data: T) => void; // Función personalizada opcional
}

interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
}

const DataTable = <T,>({ data, columns }: TableProps<T>) => {
  return (
    <div className="table-radius zoomable-content">
      <table className="table table-hover table-black">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>
                {column.svgIcon && <span>{column.svgIcon}</span>}
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {columns.map((column, colIndex) => (
                <td key={colIndex}>
                  {column.customFunction
                    ? column.customFunction(item)
                    : column.render
                    ? column.render(item)
                    : item[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
