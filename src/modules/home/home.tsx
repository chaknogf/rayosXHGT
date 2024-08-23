import React, { useState } from "react";
import NavComponent from "./nav";
import PacienteTable from "../registros.module/pacientes/pacientes";
import ConsultaTable from "../../modules/registros.module/consultas.component/consulta";

const Home: React.FC = () => {
  const [contenidoActual, setContenidoActual] = useState<JSX.Element | null>(
    null
  );

  const handlePacienteClick = () => {
    setContenidoActual(<PacienteTable />);
  };

  const handleConsultasClick = () => {
    setContenidoActual(<ConsultaTable />);
  };

  const navItems = [
    { label: "Paciente", onClick: handlePacienteClick },
    { label: "Consultas", onClick: handleConsultasClick },
  ];

  return (
    <div>
      <NavComponent items={navItems} />
      <div style={{ marginLeft: "220px", padding: "20px" }}>
        {contenidoActual || <h1>Contenido principal</h1>}
      </div>
    </div>
  );
};

export default Home;
