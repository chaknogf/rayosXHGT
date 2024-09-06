import React, { useState } from "react";
import NavComponent from "@/modules/home/nav";
import PacienteTable from "@/modules/registros.module/pacientes/pacientes";
import ConsultaTable from "@/modules/registros.module/consultas.component/consulta";
import ThemeToggle from "@/components/toggleSwitch/toggleSwitch";
import "@/modules/home/home.css";

const Home: React.FC = () => {
  const [contenidoActual, setContenidoActual] = useState<JSX.Element | null>(null);

  // Maneja clics para cambiar el contenido
  const handlePacienteClick = () => {
    setContenidoActual(<PacienteTable />);
  };

  const handleConsultasClick = () => {
    setContenidoActual(<ConsultaTable />);
  };

  // Items para el NavComponent
  const navItems = [
    { 
      customFunction: () => <ThemeToggle /> // Cambia de tema
    },
    { 
      label: "Paciente", 
      onClick: handlePacienteClick // Cambia a la tabla de pacientes
    },
    { 
      label: "Consultas", 
      onClick: handleConsultasClick // Cambia a la tabla de consultas
    },
  ];

  return (
    <>
      <div className="div-nav">
        {/* Barra de navegación con el toggle de tema */}
        <NavComponent items={navItems} theme={"dark"} />
      </div>
      <div className="div-content zoomable-content">
        {/* Renderiza el contenido actual */}
        {contenidoActual}
      </div>
    </>
  );
};

export default Home;
