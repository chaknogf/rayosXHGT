import React, { useState } from "react";
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
      <div className={`app-header ${theme === 'dark' ? 'bg-dark text-light' : 'bg-light '}`}>
        {/* <FaReact className="hamburger-icon " onClick={toggleMenu} /> */}
        <div className="icon-ld" onClick={toggleMenu} >
          <div className="loading">
            <svg width="auto" height="42" viewBox="0 0 72 64" preserveAspectRatio="xMidYMid meet">
              <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="back"></polyline>
              <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="front"></polyline>
              <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="back"></polyline>
              <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="front"></polyline>
              
            </svg>
          </div>
          <h3 className="navbar-tabs">Sys HospTecpan</h3>
      </div>
      
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
