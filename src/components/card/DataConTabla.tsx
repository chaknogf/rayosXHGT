import React from "react";
import "@/components/card/css/tableVertical.css";

interface TableVerticalProps<T> {
  data: T[];
  items: Array<{
    label?: string;
    key?: keyof T;
    render?: (data: T) => React.ReactNode;
    svgIcon?: React.ReactNode;
    section?: "tabla";
  }>;
  renderFunctions?: Record<string, (data: T) => React.ReactNode>;
}

const DataConTabla = <T,>({
  data,
  items,
  renderFunctions = {},
}: TableVerticalProps<T>) => {
  return (
    <table className="styled-dark-table">
      <thead>
        <tr>
          {items
            .filter((item) => item.section === "tabla")
            .map((item, index) => (
              <th key={index} className="dark-table-header">
                {item.label}
              </th>
            ))}
        </tr>
      </thead>
      <tbody>
        {data.map((rowData, rowIndex) => (
          <tr key={rowIndex} className="dark-table-row">
            {items
              .filter((item) => item.section === "tabla")
              .map((item, itemIndex) => {
                const renderFn =
                  item.render || renderFunctions[item.key as string];
                return (
                  <td key={itemIndex} className="dark-table-cell">
                    {renderFn
                      ? renderFn(rowData)
                      : item.key && rowData[item.key] !== undefined
                      ? String(rowData[item.key])
                      : null}
                  </td>
                );
              })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataConTabla;
