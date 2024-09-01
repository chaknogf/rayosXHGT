
import DataTable from "@/components/dataTable/dataTable";
import React, { useState } from "react";
import PacienteForm from "@/modules/registros.module/pacientes/formularioPaciente";
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

  const columns = [
    {
      label: "ver",
      customFunction: () => (
        <button className="btn p-1 m-0 btn-dark-blue">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="#ffff"
            className="bi bi-person-vcard"
            viewBox="0 0 16 16"
          >
            <path d="M5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4m4-2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5M9 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 9 8m1 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5" />
            <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.96q.04-.245.04-.5C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 1 1 12z" />
          </svg>
        </button>
      ),
    },
    {
      label: "agregar",
      customFunction: () => (
        <button className="btn p-1 m-0 btn-q" onClick={handleButtonClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="ffff"
            className="bi bi-database-add"
            viewBox="0 0 16 16"
          >
            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0" />
            <path d="M12.096 6.223A5 5 0 0 0 13 5.698V7c0 .289-.213.654-.753 1.007a4.5 4.5 0 0 1 1.753.25V4c0-1.007-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1s-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4v9c0 1.007.875 1.755 1.904 2.223C4.978 15.71 6.427 16 8 16c.536 0 1.058-.034 1.555-.097a4.5 4.5 0 0 1-.813-.927Q8.378 15 8 15c-1.464 0-2.766-.27-3.682-.687C3.356 13.875 3 13.373 3 13v-1.302c.271.202.58.378.904.525C4.978 12.71 6.427 13 8 13h.027a4.6 4.6 0 0 1 0-1H8c-1.464 0-2.766-.27-3.682-.687C3.356 10.875 3 10.373 3 10V8.698c.271.202.58.378.904.525C4.978 9.71 6.427 10 8 10q.393 0 .774-.024a4.5 4.5 0 0 1 1.102-1.132C9.298 8.944 8.666 9 8 9c-1.464 0-2.766-.27-3.682-.687C3.356 7.875 3 7.373 3 7V5.698c.271.202.58.378.904.525C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777M3 4c0-.374.356-.875 1.318-1.313C5.234 2.271 6.536 2 8 2s2.766.27 3.682.687C12.644 3.125 13 3.627 13 4c0 .374-.356.875-1.318 1.313C10.766 5.729 9.464 6 8 6s-2.766-.27-3.682-.687C3.356 4.875 3 4.373 3 4" />
          </svg>
        </button>
      ),
    },
    { label: "Expediente", key: "expediente", className: "text-exp" },
    {label: "paciente", key: "nombre"},
    { label: "Sexo", key: "sexo" },
    { label: "direccion", key: "direccion"},
    { label: "edad", key: "nacimiento"},
    { label: "estado", key: "estado" },
    { label: "id", key: "id" },
  ];

  return (
    <div>
      {showForm ? (
        <PacienteForm />
      ) : (
        <DataTable data={paciente} cells={columns} />
      )}
    </div>
  );
};

export default PacienteTable;
