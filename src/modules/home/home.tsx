import React, { useState } from "react";
import PacienteTable from "@/modules/registros.module/pacientes/pacientes";
import ConsultaTable from "@/modules/registros.module/consultas.component/consulta";
import "@/modules/home/home.css";
import Sidebar from "@/components/sidebar/sidebar";
import "@/style.css";
import Header from "@/components/header/header";

const HomeComponent: React.FC = () => {
  const [contenidoActual, setContenidoActual] = useState<JSX.Element | null>(
    null
  );

  const handlePacienteClick = () => {
    setContenidoActual(<PacienteTable />);
  };

  const handleConsultasClick = () => {
    setContenidoActual(<ConsultaTable />);
  };

  // Items para el Sidebar
  const navItems = [
    {
      label: "Registros",
      subItems: [
        { label: "Pacientes", onClick: handlePacienteClick },
        { label: "Consultas", onclick: handleConsultasClick },
      ],
    },
    {
      label: "Settings",
      subItems: [{ label: "Consultas", onclick: handleConsultasClick }],
    },
  ];

  return (
    <>
      <nav className="div-nav">
        <header>
          <Header></Header>
        </header>
        <Sidebar items={navItems} />
      </nav>
      <div className="div-content zoomable-content">
        {/* Renderiza el contenido seleccionado */}
        {contenidoActual}
      </div>
    </>
  );
};

export default HomeComponent;
