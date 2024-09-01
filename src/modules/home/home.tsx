import React, { useState } from "react";
import NavComponent from "@/modules/home/nav";
import PacienteTable from "@/modules/registros.module/pacientes/pacientes";
import ConsultaTable from "@/modules/registros.module/consultas.component/consulta";
import ThemeToggle from "@/components/toggleSwitch/toggleSwitch";


const Home: React.FC = () => {
  const [contenidoActual, setContenidoActual] = useState<JSX.Element | null>(null);

  const handlePacienteClick = () => {
    setContenidoActual(<PacienteTable />);
  };

  const handleConsultasClick = () => {
    setContenidoActual(<ConsultaTable />);
  };

  const navItems = [
    { 
       
      customFunction: () => <ThemeToggle /> 
    },
    { 
      label: "Paciente", 
      onClick: handlePacienteClick 
    },
    { 
      label: "Consultas", 
      onClick: handleConsultasClick 
    },
  ];

  return (
    <div>
      <NavComponent items={navItems} />
      {contenidoActual}
    </div>
  );
};

export default Home;
