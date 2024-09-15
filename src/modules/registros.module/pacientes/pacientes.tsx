
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
    nombre: "David",
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
  {
    id: 4,
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
    id: 5,
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
    id: 6,
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
  {
    id: 4,
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
    id: 5,
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
    id: 6,
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
  }
];

const PacienteTable: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const items = [
    { label: "agregar", onClick: handleButtonClick, section: 'option', iconReact: "BiSolidMessageSquareEdit" },
    { label: "agregar", onClick: handleButtonClick, section: 'option', iconReact: "BiSolidMessageSquareEdit" },
    { label: "agregar", onClick: handleButtonClick, section: 'option', iconReact: "BiSolidMessageSquareEdit" },
    { label: "Expediente", key: "expediente", section: 'header' },
    { label: "paciente", key: "nombre", section: 'header' },
    { label: "Sexo", key: "sexo", section: "header" },
    { label: "Direccion", key: "direccion", section: "body" },
    { label: "F.Nac edad", key: "nacimiento", section: "body" },
    { label: "estado", key: "estado", section: "header" },
    { label: "id", key: "id" },
    { label: "DPI", key: "dpi", section: "body" },
  ];
  

  return (
    <div>
      {showForm ? (
        <PacienteForm /> // Renderiza el formulario si showForm es true
      ) : (
        <DataCards data={paciente} items={items} /> // Renderiza los datos si showForm es false
      )}
    </div>
  );
};

export default PacienteTable;
