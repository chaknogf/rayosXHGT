import React from "react";

interface TableColumn<T> {
  label: string;
  key?: keyof T; // Hacer que key sea opcional si usas render
  render?: (data: T) => React.ReactNode;
  svgIcon?: React.ReactNode; // SVG opcional para la columna
  customFunction?: (data: T) => React.ReactNode; // Función personalizada opcional
  className?: string;
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
              <th key={index}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
             <tr key={index}>
             {columns.map((column, colIndex) => (
               <td key={colIndex} className={column.className}>
                 {column.customFunction
                   ? column.customFunction(item)
                   : column.svgIcon
                   ? column.svgIcon
                   : column.render
                   ? column.render(item)
                   : column.key
                   ? String(item[column.key]) // Conversión a string para evitar el error
                   : null}
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
