import React, { useState } from "react";
import { FaBars } from "react-icons/fa"; // Icono de hamburguesa
import "@/modules/home/nav.css";

interface NavItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface NavComponentProps {
  items: NavItem[];
  theme: 'dark' | 'light';
}

const NavComponent: React.FC<NavComponentProps> = ({ items, theme }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="hamburger-menu">
      <div className={`navbar ${theme === 'dark' ? 'navbar-dark bg-primary' : 'navbar-light bg-light'}`}>
        <FaBars className="hamburger-icon" onClick={toggleMenu} />
        <h1 className="navbar-brand">My App</h1>
      </div>
      <div className={`side-menu ${isOpen ? "open" : ""}`}>
        <ul>
          {items.map((item, index) => (
            <li key={index} onClick={item.onClick}>
              <a href={item.href || "#"}>{item.label}</a>
            </li>
          ))}
        </ul>
      </div>
      {isOpen && <div className="overlay" onClick={toggleMenu}></div>} {/* Cierra el menú al hacer clic fuera */}
    </div>
  );
};

export default NavComponent;
