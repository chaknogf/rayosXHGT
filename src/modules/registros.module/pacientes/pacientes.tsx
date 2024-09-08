
import "@/components/card/card.css";
import React, { useState } from "react";
import PacienteForm from "@/modules/registros.module/pacientes/formularioPaciente";
import DataCards from "@/components/card/card";
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
  dpi?: string;
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
    departamento: 4,
    dpi: "1344678900101"
  },
  {
    id: 2,
    nombre: "María",
    apellido: "González",
    nacimiento: "1982-01-23",
    expediente: 24490,
    estado: "m",
    sexo: "f",
    dpi: "6789013450406"
  },
  {
    id: 3,
    nombre: "Carlos Gudiel",
    apellido: "López Aragon",
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
    { label: "edad", key: "nacimiento", section: "body"},
    { label: "estado", key: "estado", section: "header" },
    { label: "id", key: "id" },
    { label: "dpi", key: "dpi", section: "body"}
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
