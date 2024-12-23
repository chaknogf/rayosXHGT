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
              return (
                <div className="data-item" key={itemIndex}>
                  <div className="data-header">{item.label}:</div>
                  <div className="table-body_">
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

export default DataBody;
