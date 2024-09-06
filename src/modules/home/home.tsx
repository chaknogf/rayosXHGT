import React, { useState } from "react";
import NavComponent from "@/modules/home/nav";
import PacienteTable from "@/modules/registros.module/pacientes/pacientes";
import ConsultaTable from "@/modules/registros.module/consultas.component/consulta";
import "@/modules/home/home.css";

const HomeComponent: React.FC = () => {
  const [contenidoActual, setContenidoActual] = useState<JSX.Element | null>(null);

  const handleHomeClick = () => {
    setContenidoActual(<div>Home</div>);
  };

  const handlePacientesClick = () => {
    setContenidoActual(<PacienteTable />);
  };

  const handleSearchClick = () => {
    setContenidoActual(<div>Search Content</div>);
  };

  const handleNotificationClick = () => {
    setContenidoActual(<div>Notifications</div>);
  };

  const handleConsultasClick = () => {
    setContenidoActual(<ConsultaTable />);
  };

  const navItems = [
    { label: "Home", onClick: handleHomeClick },
    { label: "Pacientes", onClick: handlePacientesClick },
    { label: "Search", onClick: handleSearchClick },
    { label: "Notifications", onClick: handleNotificationClick },
    { label: "Messages", onClick: handleConsultasClick },
  ];

  return (
    <>
      <div className="div-nav">
        {/* Barra de navegación tipo hamburguesa */}
        <NavComponent items={navItems} theme={"dark"} />
      </div>
      <div className="div-content">
        {/* Renderiza el contenido dinámico */}
        {contenidoActual}
      </div>
    </>
  );
};

export default HomeComponent;
