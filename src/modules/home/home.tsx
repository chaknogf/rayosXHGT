//home.tsx
import React, { useState } from "react";
import PacienteTable from "@/modules/registros.module/pacientes/pacientes";
import ConsultaTable from "@/modules/registros.module/consultas.component/consulta";
import "@/modules/home/home.css";
import Sidebar from "@/components/sidebar/sidebar";
import "@/style.css";
import {
  DuoIconsDashboard,
  RiRobot2Line,
  StreamlineOnlineMedicalServiceMonitor,
} from "@/assets/icons/svg";
import Dashboard from "@/components/dashboard/dashboard";

const HomeComponent: React.FC = () => {
  const [contenidoActual, setContenidoActual] = useState<JSX.Element | null>(
    null
  );

  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const dashboardClick = () => {
    setContenidoActual(<Dashboard />);
  };

  const handlePacienteClick = () => {
    setContenidoActual(<PacienteTable />);
  };

  const handleConsultasClick = () => {
    setContenidoActual(<ConsultaTable />);
  };

  // Items para el Sidebar
  const navItems = [
    {
      label: "Dashboard",
      icon: DuoIconsDashboard,
      subItems: [{ label: "Dash", onclick: dashboardClick }],
    },
    {
      label: "Registros",
      icon: StreamlineOnlineMedicalServiceMonitor,
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
      <div className="btn-menu-div">
        <button className="btn-menu" onClick={toggleMenu}>
          <RiRobot2Line />
          Menu
        </button>
      </div>
      <div className="home">
        <section
          className={`sidebar-div ${menuVisible ? "sidebar-div-visible" : ""}`}
        >
          <Sidebar items={navItems} />
        </section>

        <section className="contenido">{contenidoActual}</section>
      </div>
    </>
  );
};

export default HomeComponent;
