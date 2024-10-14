import React, { SVGProps, useState } from "react";
import "./sidebar.css"; // Asegúrate de tener tu archivo CSS
import Header from "../header/header";

interface NavItem {
  icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element;
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

  const toggleSubMenu = (index: number) => {
    setOpenSubMenuIndex(openSubMenuIndex === index ? null : index);
  };

  return (
    <aside className="sidebar " >
      <h3 className="brand-logo"><Header /></h3>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <a
              href={item.href}
              onClick={(e) => {
                if (item.subItems) {
                  e.preventDefault();
                  toggleSubMenu(index);
                }
                item.onClick?.();
              }}
              className="nav-link"
            >
              {item.icon && item.icon({})}
              {item.label}
            </a>

            {/* Submenu */}
            {item.subItems && openSubMenuIndex === index && (
              <ul className="sub-menu">
                {item.subItems.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    <a
                      href={subItem.href}
                      onClick={subItem.onClick}
                      className="sub-nav-link"
                    >
                      {subItem.icon && subItem.icon({})}
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
  );
};

export default Sidebar;
