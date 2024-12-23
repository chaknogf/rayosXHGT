import React from "react";
import "@/components/card/css/header.css";
import "@/components/card/css/card.css";

interface CardHeaderProps<T> {
  data: T;
  items: Array<{
    label?: string;
    key?: keyof T;
    render?: (data: T) => React.ReactNode;
    className?: string;
    section?: "header";
  }>;
  renderFunctions?: Record<string, (data: T) => React.ReactNode>;
}

const CardHeader = <T,>({
  data,
  items,
  renderFunctions = {},
}: CardHeaderProps<T>) => {
  return (
    <div className="card-headers">
      <div className="titulos">
        {items
          .filter((item) => item.section === "header")
          .map((item, index) => {
            const renderFn = item.render || renderFunctions[item.key as string];
            return (
              <div key={index} className={`item-label ${item.className || ""}`}>
                <strong className="labelStrong zero">
                  {item.label}
                  <br />
                </strong>
                {renderFn
                  ? renderFn(data)
                  : item.key && data[item.key] !== undefined
                  ? String(data[item.key])
                  : null}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CardHeader;
