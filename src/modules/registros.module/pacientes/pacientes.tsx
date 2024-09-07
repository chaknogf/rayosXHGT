
import DataTable from "@/components/dataTable/dataTable";
import React, { useState } from "react";
import PacienteForm from "@/modules/registros.module/pacientes/formularioPaciente";
import DataCards from "@/components/dataTable/dataTable";
// import "@/customstyles.css"


interface Paciente {
  id: number;
  nombre?: string;
  apellido?: string;
  nacimiento?: string;
  expediente: number;
  estado?: string;
  sexo?: string;
  direccion?: string;
  municipio?: number;
  departamento?: number;
}

const paciente: Paciente[] = [
  {
    id: 1,
    nombre: "Juan",
    apellido: "Pérez",
    nacimiento: "1986-08-12",
    expediente: 23555,
    estado: "v",
    sexo: "m",
    direccion: "aldea buena vistas",
    municipio: 401,
    departamento: 4
  },
  {
    id: 2,
    nombre: "María",
    apellido: "González",
    nacimiento: "1982-01-23",
    expediente: 24490,
    estado: "m",
    sexo: "f",
  },
  {
    id: 3,
    nombre: "Carlos",
    apellido: "López",
    nacimiento: "1999-02-17",
    expediente: 1245,
    estado: "v",
    sexo: "m",
  },
];

const PacienteTable: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const items = [
    
    {
      label: "agregar",
      customFunction: () => (
        <button className="btn p-1 m-0 btn-q" onClick={handleButtonClick}>
         form
        </button>
      )
    },
    { label: "Expediente", key: "expediente", section: 'header' },
    {label: "paciente", key: "nombre", section: 'header'},
    { label: "Sexo", key: "sexo", section:"header" },
    { label: "direccion", key: "direccion", section: "body"},
    { label: "edad", key: "nacimiento"},
    { label: "estado", key: "estado" },
    { label: "id", key: "id"},
  ];

  return (
    <div>
      {showForm ? (
        <PacienteForm />
      ) : (
        <DataCards data={paciente} items={items} />
      )}
    </div>
  );
};

export default PacienteTable;
