import React from "react";
import "@/modules/home/nav.css";

interface NavComponentProps<T> {
  items: { 
    label: string; 
    onClick?: () => void;
    customFunction?: () => React.ReactNode; 
  }[];
}

const NavComponent = <T,>({ items }: NavComponentProps<T>) => {
  return (
    <div className="navbar-container nav">
      <nav className="navbar-vertical">
        {items.map((item, index) => (
          <button
            key={index}
            className="navbar-btn"
            onClick={item.onClick}
          >
            {item.label}
            {item.customFunction && item.customFunction()}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default NavComponent;
