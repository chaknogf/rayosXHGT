import React, { useEffect, useState } from "react";
import PacienteForm from "@/modules/registros.module/pacientes/formularioPaciente";
import DataCards from "@/components/card/card";
import { FaEdit } from "react-icons/fa";
import { getPacientes } from "@/services/pacientes"; // Importar el servicio

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

const IconReactEdit = () => {
  return <FaEdit style={{ height: "0.83rem", width: "0.83rem" }} />;
};

const PacienteTable: React.FC = () => {
  const [pacientes, setPacientes] = useState<Paciente[]>([]); // Estado para los pacientes
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Para manejar la carga

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const data = await getPacientes(); // Llama al servicio
        setPacientes(data); // Actualiza el estado
      } catch (error) {
        console.error("Error al obtener los pacientes:", error);
      } finally {
        setIsLoading(false); // Finaliza la carga
      }
    };

    fetchPacientes(); // Ejecuta la función al montar el componente
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
      label: "agregar",
      onClick: handleButtonClick,
      section: "option",
      render: () => <IconReactEdit />,
    },
    { label: "Id", key: "id", section: "header", className: "text-90" },
    { label: "paciente", key: "nombre", section: "header" },
    { label: "Sexo", key: "sexo", section: "header" },
    { label: "Direccion", key: "direccion", section: "body" },
    { label: "F.Nac edad", key: "nacimiento", section: "body" },
    { label: "estado", key: "estado", section: "header" },
    { label: "id", key: "id" },
    { label: "DPI", key: "dpi", section: "body" },
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
