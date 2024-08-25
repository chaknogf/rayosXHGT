import React from "react";
import "@/modules/home/nav.css";

interface NavComponentProps {
  items: { label: string; onClick: () => void }[];
}

const NavComponent: React.FC<NavComponentProps> = ({ items }) => {
  return (
    <div className="navbar-container nav">
      <nav className="navbar-vertical">
        {items.map((item, index) => (
          <button key={index} className="navbar-btn" onClick={item.onClick}>
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default NavComponent;
