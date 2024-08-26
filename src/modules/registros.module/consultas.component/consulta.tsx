import React from "react";
import DataTable from "@/components/dataTable/dataTable"; // Asegúrate de que la ruta del import sea correcta

interface Consulta {
  id: number;
  expediente?: number;
  nombre?: string;
  apellido?: string;
  hoja?: string;
  fecha_consulta?: string;
  hora?: string;
  fecha_egreso?: string;
  especialidad?: number;
  servicio?: number;
  tipo_citas?: number;
  status?: number;
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
    tipo_citas: 2,
    status: 2,
    sexo: 'm'
  },
  {
    id: 0,
    expediente: 255873,
    nombre: "Veronica",
    apellido: "Guanta",
    hoja: "1423",
    fecha_consulta: "2024-03-25",
    hora: "14:52",
    fecha_egreso: "2024-03-26",
    especialidad: 4,
    servicio: 3,
    tipo_citas: 4,
    status: 1,
    sexo: 'f'
  },
  {
    id: 0,
    expediente: 255873,
    nombre: "Veronica",
    apellido: "Guanta",
    hoja: "1423",
    fecha_consulta: "2024-03-25",
    hora: "14:52",
    fecha_egreso: "2024-03-26",
    especialidad: 4,
    servicio: 3,
    tipo_citas: 4,
    status: 3,
    sexo: 'f'
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
  { label: "Tipo de Consulta", key: "tipo_citas" },
  { label: "Estatus", key: "status" },
  { label: "sexo", key: "sexo"}
];

const ConsultaTable: React.FC = () => {
  return <DataTable data={consulta} columns={columns} />;
};

export default ConsultaTable;
