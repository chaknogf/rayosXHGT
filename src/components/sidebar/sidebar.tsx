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
  const [activeLink, setActiveLink] = useState<string | null>(null);

  const toggleSubMenu = (index: number) => {
    setOpenSubMenuIndex(openSubMenuIndex === index ? null : index);
  };

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  return (
    <aside className="sidebar">
      <div className="rirobot">
        <RiRobot2Line />
      </div>

      <ul className="ul-side">
        {items.map((item, index) => (
          <li key={index}>
            <a
              href={item.href}
              onClick={(e) => {
                if (item.subItems) {
                  e.preventDefault();
                  toggleSubMenu(index);
                } else {
                  handleLinkClick(item.href || "");
                }
                item.onClick?.();
              }}
              className={`nav-link-s ${activeLink === item.href ? "active" : ""}`}
            >
              <div className="icon-item-s">{item.icon && item.icon({})}</div>
              <span className="label-item-s">{item.label}</span>
            </a>

            {item.subItems && openSubMenuIndex === index && (
              <ul className="sub-menu">
                {item.subItems.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    <a
                      href={subItem.href}
                      onClick={(e) => {
                        handleLinkClick(subItem.href || "");
                        subItem.onClick?.();
                      }}
                      className={`sub-nav-link ${
                        activeLink === subItem.href ? "active" : ""
                      }`}
                    >
                      <div className="icon-subitem-s">
                        {subItem.icon && subItem.icon({})}
                      </div>
                      <p className="label-subitem-s">{subItem.label}</p>
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
