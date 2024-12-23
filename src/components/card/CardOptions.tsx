import React from "react";
import "@/components/card/css/option.css";

interface CardOptionsProps<T> {
  data: T;
  items: Array<{
    label?: string;
    key?: keyof T;
    render?: (data: T) => React.ReactNode;
    onClick?: () => void;
    section?: "option";
  }>;
  renderFunctions?: Record<string, (data: T) => React.ReactNode>;
}

const CardOptions = <T,>({
  data,
  items,
  renderFunctions = {},
}: CardOptionsProps<T>) => {
  return (
    <div className="card-options zero">
      {items
        .filter((item) => item.section === "option")
        .map((item, itemIndex) => {
          const renderFn = item.render || renderFunctions[item.key as string];
          return (
            <div key={itemIndex} className="card-options-item">
              <div className="btn-container">
                <button className="btn btn-opt" onClick={item.onClick}>
                  {renderFn
                    ? renderFn(data)
                    : item.key && data[item.key] !== undefined
                    ? String(data[item.key])
                    : null}
                </button>
                <p className="label-btn">{item.label}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default CardOptions;
