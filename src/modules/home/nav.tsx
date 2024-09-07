import React, { useState } from "react";
import { FaReact } from "react-icons/fa"; // Icono de hamburguesa
import "@/modules/home/nav.css";
import ThemeToggle from "@/components/toggleSwitch/toggleSwitch";

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
      <div className={`navbar ${theme === 'dark' ? 'bg-primary text-light' : 'bg-light '}`}>
        <FaReact className="hamburger-icon " onClick={toggleMenu} />
        <h3 className="navbar-tabs">Tableta Sheika</h3>
      </div>
      <div className={`side-menu ${isOpen ? "open" : ""}`}>
        <div className="toggleTheme"><ThemeToggle /></div>
        <ul>
          {items.map((item, index) => (
            <li key={index} onClick={() => { item.onClick?.(); toggleMenu(); }}>
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
