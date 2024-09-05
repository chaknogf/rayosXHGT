import React from "react";
import "@/modules/home/nav.css";

interface NavComponentProps<T> {
  items: { 
    clasName?: string;
    label?: string; 
    onClick?: () => void;
    customFunction?: () => React.ReactNode; 
  }[];
  theme: 'dark' | 'light';  // Nuevo prop para tema
}

const NavComponent = <T,>({ items, theme }: NavComponentProps<T>) => {
  return (
    <div className={`navbar-container ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
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
