import React, { SVGProps, useState } from "react";
import "./sidebar.css"; // Importa los estilos desde un archivo CSS separado
import { RiRobot2Line } from "@/assets/icons/svg";

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

  const [cerrarMenu, setCerrarMenu] = useState(false);

  const toggleSubMenu = (index: number) => {
    setOpenSubMenuIndex(openSubMenuIndex === index ? null : index);
  };

  const closeSidebar = () => {
    setCerrarMenu(!cerrarMenu);
    subItem.onClick();
  };

  return (
    <aside className="sidebar">
      <div className="rirobot">
        <RiRobot2Line />
      </div>

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
                      onClick={closeSidebar}
                      className={`sub-nav-link ${cerrarMenu} ? "sidebar" : ""}`}
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
