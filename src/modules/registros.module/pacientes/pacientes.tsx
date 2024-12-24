import React, { useEffect, useState } from "react";
import PacienteForm from "@/modules/registros.module/pacientes/formularioPaciente";
import DataCards from "@/components/card/card";
import { FaEdit } from "react-icons/fa";
import { getPacientesVistas } from "@/services/pacientes";
import useCopyToClipboard from "@/utils/copyClick";

interface VistaPacientes {
  paciente_id: number;
  nombre?: string;
  apellido?: string;
  dpi?: string;
  pasaporte?: string;
  sexo?: string;
  nacimiento?: string;
  nacionalidad?: string;
  defuncion?: string;
  estado?: string;
  direccion?: string;
  municipio?: string;
  telefono1?: string;
  telefono2?: string;
  telefono3?: string;
  email?: string;
  expediente_id?: number;
  expediente?: string;
  hoja_emergencia?: string;
  referencia_anterior?: string;
  expediente_madre?: string;
  exp_id?: number;
  historia_clinica?: string;
  fecha_consulta?: string;
  hora?: string;
  fecha_egreso?: string;
  tipo_consulta?: number;
  estatus?: number;
  created_at?: string;
}

const IconReactEdit = () => {
  return <FaEdit style={{ height: "0.83rem", width: "0.83rem" }} />;
};

const PacienteTable: React.FC = () => {
  const [pacientes, setPacientes] = useState<VistaPacientes[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const data = await getPacientesVistas(); // Llama al servicio
        setPacientes(data); // Actualiza el estado
      } catch (error) {
        console.error("Error al obtener los pacientes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPacientes();
  }, []);

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const items = [
    {
      label: "agregar",
      onClick: handleButtonClick,
      section: "option",
      render: () => <IconReactEdit />,
    },
    {
      label: "Id",
      key: "paciente_id",
      section: "header",
      className: "text-90",
    },
    { label: "paciente", key: "nombre", section: "header" },
    { label: "Sexo", key: "sexo", section: "header" },
    { label: "Expediente", key: "expediente", section: "body" },
    { label: "Direccion", key: "direccion", section: "body" },
    { label: "F.Nac edad", key: "nacimiento", section: "body" },
    { label: "defuncion", key: "defuncion", section: "body" },
    { label: "estado", key: "estado", section: "header" },
    {
      label: "DPI",
      key: "dpi",
      section: "body",
    },
    { label: "Historia Clinica", key: "historia_clinica", section: "tabla" },
    { label: "fecha de consulta", key: "fecha_consulta", section: "tabla" },
    { label: "hora", key: "hora", section: "tabla" },
    { label: "tipo de consulta", key: "tipo_consulta", section: "tabla" },
    { label: "Estatus", key: "estatus", section: "tabla" },
  ];

  if (isLoading) {
    return <div>Cargando datos...</div>; // Mostrar un mensaje mientras carga
  }

  return (
    <div>
      {showForm ? (
        <PacienteForm /> // Renderiza el formulario si showForm es true
      ) : (
        <DataCards data={pacientes} items={items} /> // Renderiza los datos obtenidos
      )}
    </div>
  );
};

export default PacienteTable;
