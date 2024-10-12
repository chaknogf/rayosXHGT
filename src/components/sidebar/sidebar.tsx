import "@/components/sidebar/sidebar.css";
import { useState, useRef } from "react";
import ThemeToggle from "@/components/toggleSwitch/toggleSwitch";

interface NavItem {
  label: string;
  href?: string;
  onClick?: () => void;
  subItems?: NavItem[]; // Nueva propiedad para submenús
}

interface NavComponentProps {
  items: NavItem[];
  onClick?: () => void;
}

const Sidebar = ({ items }: NavComponentProps) => {
  const [showBody, setShowBody] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openSubMenuIndex, setOpenSubMenuIndex] = useState<number | null>(null); // Estado para submenús
  const enterTimeout = useRef<NodeJS.Timeout | null>(null);
  const leaveTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (leaveTimeout.current) clearTimeout(leaveTimeout.current);
    enterTimeout.current = setTimeout(() => {
      setShowBody(true);
    }, 80);
  };

  const handleMouseLeave = () => {
    if (enterTimeout.current) clearTimeout(enterTimeout.current);
    leaveTimeout.current = setTimeout(() => {
      setShowBody(false);
    }, 200);
  };

  const handleSubMenuToggle = (index: number) => {
    setOpenSubMenuIndex(openSubMenuIndex === index ? null : index);
  };

  return (
    <>
      <aside
        className={`sidebar ${showBody ? "expanded" : "collapsed"}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={`side-menu ${isOpen ? "open" : ""}`}>
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                <input type="radio" id={item.label} name="sidebar" />
                <label
                  htmlFor={item.label}
                  onClick={() => handleSubMenuToggle(index)}
                >
                  <i className="ai-icon"></i>
                  {showBody && <p>{item.label}</p>}
                  {item.subItems && (
                    <i
                      className={`ai-chevron ${
                        openSubMenuIndex === index ? "down" : "right"
                      }`}
                    ></i> // Icono para desplegar submenús
                  )}
                </label>

                {item.subItems && openSubMenuIndex === index && (
                  <ul className="sub-menu">
                    {item.subItems.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <button onClick={subItem.onClick}>
                          {subItem.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <div className="toggleTheme">
            <ThemeToggle />
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
