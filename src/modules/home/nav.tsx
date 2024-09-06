import React from "react";
import "@/style.css";
import "@/modules/home/nav.css";

interface NavItem {
  className?: string;
  label: string;
  href?: string;
  customFunction?: () => React.ReactNode;
  onClick?: () => void; // Agregado para manejar clics
  isDropdown?: boolean;
  dropdownItems?: { label: string; href: string }[]; // Items para dropdown
}

interface NavComponentProps<T> {
  items: NavItem[];
  theme: 'dark' | 'light';  // Prop para el tema
}

const NavComponent = <T,>({ items, theme }: NavComponentProps<T>) => {
  return (
    <nav className={`navbar navbar-expand-lg ${theme === 'dark' ? 'navbar-dark bg-primary' : 'navbar-light bg-light'}`}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Navbar</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav me-auto">
            {items.map((item, index) => (
              <li key={index} className={`nav-item ${item.isDropdown ? 'dropdown' : ''} ${item.className || ''}`}>
                {!item.isDropdown ? (
                  <a
                    className={`nav-link ${item.className || ''}`}
                    href={item.href || "#"}
                    onClick={item.onClick} // Manejo de clic
                  >
                    {item.label}
                    {item.customFunction && item.customFunction()}
                  </a>
                ) : (
                  <>
                    <a
                      className="nav-link dropdown-toggle"
                      href={item.href || "#"}
                      id={`dropdown-${index}`}
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {item.label}
                    </a>
                    <div className="dropdown-menu" aria-labelledby={`dropdown-${index}`}>
                      {item.dropdownItems?.map((dropdownItem, idx) => (
                        <a key={idx} className="dropdown-item" href={dropdownItem.href}>
                          {dropdownItem.label}
                        </a>
                      ))}
                      <div className="dropdown-divider"></div>
                      <a className="dropdown-item" href="#">Separated link</a>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
          {/* Formulario de búsqueda */}
          <form className="d-flex">
            <input className="form-control me-sm-2" type="search" placeholder="Search" />
            <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default NavComponent;
