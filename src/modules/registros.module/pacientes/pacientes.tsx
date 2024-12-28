import React, { useEffect, useState, useRef } from "react";
import PacienteForm from "@/modules/registros.module/pacientes/formularioPaciente";
import DataCards from "@/components/card/card";
import { FaEdit } from "react-icons/fa";
import {
  getPacientesVistas,
  getPacientes_id,
  consultarapida,
} from "@/services/pacientes";
import "./search.css";
import DataConTabla from "@/components/card/DataConTabla";
import { renderFunctions } from "@/components/card/rendersFunctions";

// Interfaces
interface VistaPacientes {
  paciente_id: number;
  nombre?: string;
  apellido?: string;
  dpi?: string;
  sexo?: string;
  nacimiento?: string;
  direccion?: string;
  expediente?: string;
  estado?: string;
}

interface ConsultaRapida {
  paciente_id: number;
  expediente?: string;
  historia_clinica?: string;
  fecha_consulta?: string;
  hora?: string;
  tipo_consulta?: number;
  estatus?: number;
}

// Icono Editar
const IconReactEdit: React.FC = () => (
  <FaEdit style={{ height: "0.83rem", width: "0.83rem" }} />
);

const PacienteTable: React.FC = () => {
  // Estados
  const [pacientes, setPacientes] = useState<VistaPacientes[]>([]);
  // const [consultas, setConsultas] = useState<ConsultaRapida[]>([]);
  const [consultas, setConsultas] = useState<Record<number, ConsultaRapida[]>>(
    {}
  );
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    id: "",
    expediente: "",
    nombre: "",
    apellido: "",
    dpi: "",
    nacimiento: "",
    madre: "",
  });

  // Referencia para el modal
  const modalRef = useRef<HTMLDialogElement | null>(null);

  // Función para obtener pacientes
  const fetchPacientes = async () => {
    setIsLoading(true);
    try {
      const pacientesData = await getPacientesVistas();
      setPacientes(pacientesData);

      // Recuperar consultas para todos los pacientes
      const allConsultas = await Promise.all(
        pacientesData.map((paciente) => consultarapida(paciente.paciente_id))
      );

      // Agrupar las consultas por paciente_id
      const consultasGrouped = pacientesData.reduce((acc, paciente, index) => {
        acc[paciente.paciente_id] = allConsultas[index];
        return acc;
      }, {} as Record<number, ConsultaRapida[]>);

      setConsultas(consultasGrouped); // Guarda las consultas agrupadas
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    } finally {
      setIsLoading(false);
    }
  };
  // Función para buscar pacientes con filtros
  const searchPacientes = async () => {
    try {
      const data = await getPacientes_id(filters);

      if (!Array.isArray(data) || data.length === 0) {
        alert("No se encontraron pacientes con los criterios de búsqueda.");
        setPacientes([]);
        setConsultas([]); // Limpiar las consultas
        return;
      }

      setPacientes(data);

      // Obtener las consultas para el primer paciente (como en el código original)
      const consultaRapida = await consultarapida(data[0].paciente_id);

      // Ajustar el estado de consultas para todos los pacientes
      // Modificar el setConsultas para que almacene las consultas correspondientes a todos los pacientes
      const consultasPorPaciente = await Promise.all(
        data.map(async (paciente) => {
          const consultas = await consultarapida(paciente.paciente_id);
          return { paciente_id: paciente.paciente_id, consultas };
        })
      );

      // Crear un objeto de consultas agrupadas por paciente_id
      const consultasMapeadas = consultasPorPaciente.reduce(
        (acc, { paciente_id, consultas }) => {
          acc[paciente_id] = consultas;
          return acc;
        },
        {} as Record<number, ConsultaRapida[]>
      );

      // Establecer el estado de las consultas con el objeto de consultas agrupadas
      setConsultas(consultasMapeadas);
    } catch (error) {
      console.error("Error al buscar pacientes:", error);
      alert("Ocurrió un error al buscar pacientes.");
    }
  };

  // Efecto para cargar pacientes al inicio
  useEffect(() => {
    fetchPacientes();
  }, []);

  // Manejo de cambios en filtros
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  // Enviar búsqueda
  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await searchPacientes();
  };

  // Limpiar filtros
  const handleClearFilters = () => {
    setFilters({
      id: "",
      expediente: "",
      nombre: "",
      apellido: "",
      dpi: "",
      nacimiento: "",
      madre: "",
    });
    fetchPacientes();
  };

  // Control del modal
  const handleOpenModal = () => {
    modalRef.current?.showModal();
  };

  const handleCloseModal = () => {
    modalRef.current?.close();
  };
  // Función para actualizar el estado de consultas

  // Configuración de columnas e ítems
  const items = [
    {
      label: "Agregar",
      onClick: handleOpenModal,
      section: "option",
      render: () => <IconReactEdit />,
    },
    {
      label: "Id",
      key: "paciente_id",
      section: "header",
      className: "text-90",
    },
    { label: "Paciente", key: "nombre", section: "header" },
    { label: "Sexo", key: "sexo", section: "header" },
    { label: "Expediente", key: "expediente", section: "body" },
    { label: "Dirección", key: "direccion", section: "body" },
    { label: "F.Nac Edad", key: "nacimiento", section: "body" },
    { label: "Estado", key: "estado", section: "header" },
    { label: "DPI", key: "dpi", section: "body" },
    {
      label: "Consultas",
      render: (item: VistaPacientes) => {
        // Obtener las consultas del paciente actual
        const consultasFiltradas = consultas[item.paciente_id] || [];

        return (
          <DataConTabla
            data={consultasFiltradas}
            items={titems}
            renderFunctions={renderFunctions}
          />
        );
      },
      section: "tabla",
    },
  ];

  // Datos secundarios
  const titems = [
    { label: "Historia Clínica", key: "historia_clinica", section: "tabla" },
    { label: "Fecha Consulta", key: "fecha_consulta", section: "tabla" },
    { label: "Hora", key: "hora", section: "tabla" },
    { label: "Tipo Consulta", key: "tipo_consulta", section: "tabla" },
    { label: "Estatus", key: "estatus", section: "tabla" },
  ];

  if (isLoading) {
    return <div className="cargando">Cargando datos...</div>;
  }

  return (
    <div>
      {/* Modal */}
      <dialog ref={modalRef} className="modal_dialog">
        <PacienteForm />
        <button onClick={handleCloseModal}>Cerrar</button>
      </dialog>

      {/* Tarjetas */}
      <DataCards
        data={pacientes}
        items={items}
        secondaryItems={titems}
        secondaryData={consultas}
      />

      {/* Barra de búsqueda */}
      <form className="search-bar" onSubmit={handleSearchSubmit}>
        <input
          type="number"
          name="id"
          value={filters.id}
          onChange={handleFilterChange}
          placeholder="ID"
        />
        <input
          type="text"
          name="expediente"
          value={filters.expediente}
          onChange={handleFilterChange}
          placeholder="Expediente"
        />
        <input
          type="text"
          name="nombre"
          value={filters.nombre}
          onChange={handleFilterChange}
          placeholder="Nombre"
        />
        <input
          type="text"
          name="apellido"
          value={filters.apellido}
          onChange={handleFilterChange}
          placeholder="Apellido"
        />
        <input
          type="text"
          name="dpi"
          value={filters.dpi}
          onChange={handleFilterChange}
          placeholder="DPI"
        />
        <input
          type="date"
          name="nacimiento"
          value={filters.nacimiento}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="madre"
          value={filters.madre}
          onChange={handleFilterChange}
          placeholder="Expediente Madre"
        />
        <button type="submit" className="btn">
          Buscar
        </button>
        <button type="button" onClick={handleClearFilters} className="btn">
          Limpiar
        </button>
      </form>
    </div>
  );
};

export default PacienteTable;
