import "@/components/sidebar/sidebar.css";
import { useState, useRef } from "react";

const Sidebar = () => {
  const [showBody, setShowBody] = useState<boolean>(false);
  const enterTimeout = useRef<NodeJS.Timeout | null>(null); // Mantiene referencia de los timeouts
  const leaveTimeout = useRef<NodeJS.Timeout | null>(null);

  // Función para manejar cuando el mouse entra en el sidebar
  const handleMouseEnter = () => {
    if (leaveTimeout.current) clearTimeout(leaveTimeout.current); // Limpiar timeout de salida si existe
    enterTimeout.current = setTimeout(() => {
      setShowBody(true); // Mostrar el contenido del sidebar
    }, 80); // Tiempo de retraso antes de mostrar el contenido
  };

  // Función para manejar cuando el mouse sale del sidebar
  const handleMouseLeave = () => {
    if (enterTimeout.current) clearTimeout(enterTimeout.current); // Limpiar timeout de entrada si existe
    leaveTimeout.current = setTimeout(() => {
      setShowBody(false); // Ocultar el contenido del sidebar
    }, 200); // Tiempo de retraso antes de ocultar el contenido
  };
 
  return (
    <>
      <div className="app-header">
        <div className="loading">
          <svg
            width="auto"
            height="42"
            viewBox="0 0 72 64"
            preserveAspectRatio="xMidYMid meet"
          >
            <polyline
              points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
              id="back"
            ></polyline>
            <polyline
              points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
              id="front"
            ></polyline>
            <polyline
              points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
              id="back"
            ></polyline>
            <polyline
              points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
              id="front"
            ></polyline>
          </svg>
          <h3 className="navbar-tabs">Sys HospTecpan</h3>
        </div>
      </div>

      <aside
        className={`sidebar ${showBody ? "expanded" : "collapsed"}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <ul>
          <li>
            <input type="radio" id="dashboard" name="sidebar" />
            <label htmlFor="dashboard">
              <i className="ai-dashboard"></i>
              {showBody && <p>Dashboard</p>}{" "}
              {/* Mostrar texto solo si showBody es true */}
            </label>
          </li>
          <li>
            <input type="radio" id="settings" name="sidebar" />
            <label htmlFor="settings">
              <i className="ai-gear"></i>
              {showBody && <p>Settings</p>}
              {showBody && <i className="ai-chevron-down-small"></i>}
            </label>
            {showBody && (
              <div className="sub-menu">
                <ul>
                  <li>
                    <button type="button">Display</button>
                  </li>
                </ul>
              </div>
            )}
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
