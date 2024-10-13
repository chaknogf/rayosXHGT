import React, { useState } from "react";
import "@/components/sidebar/sidebar.css";

interface NavItem {
  label: string;
  href?: string;
  onClick?: () => void;
  subItems?: NavItem[]; // Añadido para los submenús
}

interface NavComponentProps {
  items: NavItem[];
}

const Sidebar: React.FC<NavComponentProps> = ({ items }) => {
  const [openSubMenuIndex, setOpenSubMenuIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false); // Estado para el toggle del sidebar

  const toggleSubMenu = (index: number) => {
    setOpenSubMenuIndex(openSubMenuIndex === index ? null : index);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="toggle-button" onClick={toggleSidebar}>
        ☰ {/* Icono de hamburguesa */}
      </button>
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <a
                href={item.href}
                onClick={(e) => {
                  if (item.subItems) {
                    e.preventDefault(); // Previene la navegación si hay submenús
                    toggleSubMenu(index);
                  }
                  item.onClick?.();
                }}
              >
                {item.label}
              </a>
              {item.subItems && openSubMenuIndex === index && (
                <ul className="sub-menu">
                  {item.subItems.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <a href={subItem.href} onClick={subItem.onClick}>
                        {subItem.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
