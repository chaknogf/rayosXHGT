import React, { useEffect, useState } from "react";
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
        { label: "Consultas", onClick: handleConsultasClick },
      ],
    },
    {
      label: "Settings",
      subItems: [{ label: "Consultas", onClick: handleConsultasClick }],
    },
  ];

  return (
    <>
      <nav className="div-nav ">
        <header>
          <Header />
        </header>
        <nav className="sidebar">
          <Sidebar items={navItems} />
        </nav>
      </nav>

      {/* Renderizado del contenido actual */}
      <div className="div-content zoomable-content blur">
        {contenidoActual ? (
          contenidoActual
        ) : (
          <p>Selecciona una opción del menú para ver el contenido.</p>
        )}
      </div>
    </>
  );
};

export default HomeComponent;
