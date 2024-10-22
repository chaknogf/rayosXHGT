import React, { SVGProps, useState } from "react";
import "./sidebar.css"; // Importa los estilos desde un archivo CSS separado

interface NavItem {
  icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  label: string;
  href?: string;
  onClick?: () => void;
  subItems?: NavItem[];
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
    <aside className="sidebar">
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
              {item.icon?.({})}
              <span className="label">{item.label}</span>
            </a>

            {item.subItems && openSubMenuIndex === index && (
              <ul className="sub-menu">
                {item.subItems.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    <a
                      href={subItem.href}
                      onClick={subItem.onClick}
                      className="sub-nav-link"
                    >
                      {subItem.icon?.({})}
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