import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "@/modules/home/home"; // Importa tus componentes
import PacienteForm from '@/modules/registros.module/pacientes/formularioPaciente';
import PacienteTable from "@/modules/registros.module/pacientes/pacientes";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/formularioPaciente" element={<PacienteForm />} />
        <Route path="/pacientes" element={<PacienteTable />} />
        {/* Agrega más rutas según sea necesario */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
