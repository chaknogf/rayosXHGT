import React from "react";
import DataTable from "@/components/dataTable"; // Asegúrate de que la ruta del import sea correcta

interface Consulta {
  id: number;
  expediente: number;
  nombre: string;
  apellido: string;
  hoja: string;
  fecha_consulta: string;
  hora: string;
  fecha_egreso: string;
  especialidad: number;
  servicio: number;
  tipo_consulta: number;
  status: number;
  sexo?: string;
}

const consulta: Consulta[] = [
  {
    id: 0,
    expediente: 25463,
    nombre: "juanito",
    apellido: "mercadito",
    hoja: "145632",
    fecha_consulta: "2024-03-25",
    hora: "14:52",
    fecha_egreso: "2024-03-26",
    especialidad: 1,
    servicio: 2,
    tipo_consulta: 2,
    status: 2,
    sexo: 'm'
  },
];

const columns = [
  { label: "Expediente", key: "expediente" },
  { label: "Paciente", key: "nombre"},
  { label: "Hoja", key: "hoja" },
  { label: "Fecha de Consulta", key: "fecha_consulta" },
  { label: "Hora", key: "hora" },
  { label: "Fecha de Egreso", key: "fecha_egreso" },
  { label: "Especialidad", key: "especialidad" },
  { label: "Servicio", key: "servicio" },
  { label: "Tipo de Consulta", key: "tipo_consulta" },
  { label: "Estado", key: "status" },
  { label: "sexo", key: "sexo"}
];

const ConsultaTable: React.FC = () => {
  return <DataTable data={consulta} columns={columns} />;
};

export default ConsultaTable;
