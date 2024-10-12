import React from "react";
import "@/components/header/header"; // Importa los estilos desde un archivo CSS separado

const Header: React.FC = () => {
  return (
    <div className="app-header">
      <div className="loading">
        <svg
          width="auto"
          height="44"
          viewBox="0 0 48 54"
          preserveAspectRatio="xMidYMid meet"
          className="svg-ld"
        >
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
  );
};

export default Header;
