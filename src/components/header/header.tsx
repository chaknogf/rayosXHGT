import React, { useState } from "react";
import "@/components/header/header.css"; // Importa los estilos desde un archivo CSS separado
import { HugeiconsMenuSquare } from "@/assets/icons/svg";
import Sidebar from "@/components/sidebar/sidebar"; // Asegúrate de que el componente Sidebar esté importado correctamente

const Header: React.FC = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  // Función para alternar la visibilidad del Sidebar
  const toggleMobileSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="app-header">
      <button className="hamburger" onClick={toggleMobileSidebar}>
        <HugeiconsMenuSquare />
        Menu
      </button>
      {/* Renderiza el Sidebar solo si isSidebarVisible es true */}
      {isSidebarVisible && <Sidebar items={[]} />}
    </div>
  );
};

export default Header;
