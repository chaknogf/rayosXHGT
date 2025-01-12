import React, { useEffect, useState, useRef } from "react";
// import PacienteForm from "@/modules/registros.module/pacientes/formularioPaciente";
import DataCards from "@/components/card/card";
import { FaEdit } from "react-icons/fa";
import {
  getPacientesVistas,
  getPacientes_id,
  consultarapida,
  getPacienteData,
} from "@/services/pacientes";
import { CloseIcon, InfoIcon } from "@/assets/icons/svg";
import DataConTabla from "@/components/card/DataConTabla";
import { renderFunctions } from "@/components/card/rendersFunctions";
//import DataConsultas from "@/components/card/DataConsultas";

// Interfaces

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
  telefono1?: string;
  telefono2?: string;
  telefono3?: string;
  email?: string;
  created_at?: string;
  updated_at?: string;
  lugar_nacimiento?: string;
  nacionalidad?: string;
  estado_civil?: number;
  educacion?: number;
  pueblo?: number;
  idioma?: number;
  ocupacion?: string;
  padre?: string;
  madre?: string;
  conyugue?: string;
  defuncion?: string;
  tiempo_defuncion?: string;
  nacionalidad_iso?: string;
}
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
  <FaEdit style={{ height: "0.93rem", width: "0.93rem" }} />
);

const IconReactInfo: React.FC = () => (
  <InfoIcon style={{ height: "0.93rem", width: "0.93rem" }} />
);

const PacienteTable: React.FC = () => {
  // Estados
  const [pacientes, setPacientes] = useState<VistaPacientes[]>([]);
  const [consultas, setConsultas] = useState<Record<number, ConsultaRapida[]>>(
    {}
  );

  const [dataPaciente, setDataPaciente] = useState<
    Paciente | Paciente[] | undefined
  >(undefined);

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
  const [showDataCard, setShowDataCard] = useState(false);

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

  const allDataPaciente = async (id: number) => {
    try {
      const dataP = await getPacienteData(id);
      setDataPaciente(dataP);
    } catch (error) {
      console.error("Error al obtener los datos del paciente:", error);
      alert("404: Datos del paciente no encontrados");
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

  const handleVerData = () => {
    setShowDataCard(true);
  };

  const handleCerrarData = () => {
    setShowDataCard(false);
  };

  // Configuración de columnas e ítems
  const items = [
    {
      label: "Agregar",
      section: "option",
      render: () => <IconReactEdit />,
    },
    {
      label: "Info",
      key: "paciente_id",
      onClick: (item: VistaPacientes) => allDataPaciente(item.paciente_id),
      section: "option",
      render: () => <IconReactInfo />,
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

  const dataItem = [
    { label: "Nombre", key: "nombre", section: "consulta" },
    { label: "Apellido", key: "apellido", section: "consulta" },
    { label: "DPI", key: "dpi", section: "consulta" },
    { label: "Sexo", key: "sexo", section: "consulta" },
    { label: "Nacimiento", key: "nacimiento", section: "consulta" },
    { label: "Madre", key: "madre", section: "consulta" },
    { label: "Padre", key: "padre", section: "consulta" },
    { label: "Domicilio", key: "direccion", section: "consulta" },
    { label: "Teléfono", key: "telefono1", section: "consulta" },
    { label: "Email", key: "email", section: "consulta" },
    { label: "Ocupación", key: "ocupacion", section: "consulta" },
    { label: "Profesión", key: "educacion", section: "consulta" },
    { label: "Nacionalidad", key: "nacionalidad", section: "consulta" },
    { label: "Estado Civil", key: "estado_civil", section: "consulta" },
    {
      label: "Lugar de Nacimiento",
      key: "lugar_nacimiento",
      section: "consulta",
    },
  ];

  if (isLoading) {
    return <div className="cargando">Cargando datos...</div>;
  }

  return (
    <>
      {/* Tarjetas */}
      <>
        <div className="container">
          <div>
            <button onClick={handleVerData} className="btn-open">
              Abrir Data Card
            </button>
            <div
              className={`card-body-data ${
                showDataCard ? "visible" : "collapsed"
              }`}
            >
              <button onMouseEnter={handleCerrarData} className="btn">
                <CloseIcon />
              </button>
              <p>Contenido aquí...</p>
            </div>
          </div>
        </div>

        <DataCards
          data={pacientes}
          items={items}
          secondaryData={consultas}
          pData={dataPaciente}
        />

        <form className="search-bar" onSubmit={handleSearchSubmit}>
          {/* Campos de filtro */}
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
          {/* Otros campos */}
          <button type="submit" className="btn">
            Buscar
          </button>
          <button type="button" onClick={handleClearFilters} className="btn">
            Limpiar
          </button>
        </form>
      </>
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
    </>
  );
};

export default PacienteTable;
