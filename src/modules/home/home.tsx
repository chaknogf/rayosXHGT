import React, { useState } from "react";
import NavComponent from "@/modules/home/nav";
import PacienteTable from "@/modules/registros.module/pacientes/pacientes";
import ConsultaTable from "@/modules/registros.module/consultas.component/consulta";
import "@/modules/home/home.css";
import "@/style.css";
import AppAcordion from "@/components/acordion/acordion";

const HomeComponent: React.FC = () => {
  const [contenidoActual, setContenidoActual] = useState<JSX.Element | null>(null);

  // Maneja clics para cambiar el contenido
  const handlePacienteClick = () => {
    setContenidoActual(<PacienteTable />);
  };

  const handleConsultasClick = () => {
    setContenidoActual(<ConsultaTable />);
  };

  const handleAcordionClick = () => {
    setContenidoActual(<AppAcordion />);
  };

  // Items para el NavComponent
  const navItems = [
    { 
      label: "Paciente", 
      onClick: handlePacienteClick, // Cambia a la tabla de pacientes
      href: "#" // O puedes omitir esto si no es necesario
    },
    { 
      label: "Consultas", 
      onClick: handleConsultasClick, // Cambia a la tabla de consultas
      href: "#"
    },
   
    {
      label: "Accordion",
      onClick: handleAcordionClick, // Corrige 'onclick' a 'onClick'
      href: "#"
    }
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

export default HomeComponent;
