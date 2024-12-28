import React, { useState, useEffect } from "react";
import "@/components/card/css/card.css";
import { LoaderHamster as Loader } from "@/components/loader/loader";
import { renderFunctions } from "@/components/card/rendersFunctions";
import CardHeader from "@/components/card/CardHeader";
import CardOptions from "@/components/card/CardOptions";
import { CloseIcon } from "@/assets/icons/svg";
import DataBody from "@/components/card/DataBody";
import DataConsultas from "./DataConsultas";
import DataConTabla from "./DataConTabla";
import { consultarapida } from "@/services/pacientes";

// Interfaz para definir las propiedades de cada campo en el card
interface RegistoCard<T> {
  label?: string;
  key?: keyof T;
  render?: (data: T) => React.ReactNode;
  svgIcon?: React.ReactNode;
  customFunction?: (data: T) => React.ReactNode;
  className?: string;
  section?: "header" | "body" | "option";
  buttons?: Button[];
  iconReact?: string;
}

interface Button {
  label: string;
  onClick: () => void;
}

interface CardProps<T> {
  data: T[];
  items: RegistoCard<T>[];
  renderFunctions?: Record<string, (data: T) => React.ReactNode>;
}

interface ObjetX {
  [key: string]: string | number | undefined;
}

const DataCard = <T extends ObjetX>({
  data,
  items,
  onDataUpdate,
}: CardProps<T> & { onDataUpdate: (data: any) => void }) => {
  const [showBody, setShowBody] = useState<boolean>(false);

  // Manejo del toggle para mostrar el cuerpo de la tarjeta
  const handleToggleBody = () => {
    setShowBody(true);
  };

  const handleCloseBody = () => {
    setShowBody(false);
  };

  // Función para manejar consultas (o cualquier dato específico)
  const handleConsultas = async (paciente_id: number) => {
    try {
      console.log(`Consultando datos para el paciente con ID: ${paciente_id}`);
      const data = await consultarapida(paciente_id);
      onDataUpdate(data); // Pasamos los datos al padre
      console.table(data);
    } catch (error) {
      console.error("Error al buscar datos del paciente:", error);
    }
  };

  return (
    <div className="card-container" tabIndex={0}>
      <div className="card" onClick={handleToggleBody}>
        <CardHeader
          data={data[0]}
          items={items}
          renderFunctions={renderFunctions}
          dataId={data[0].paciente_id}
          onClick={() => handleConsultas(data[0].paciente_id)}
        />

        {showBody && (
          <>
            <button
              className="btn btn-close-body"
              onClick={(e) => {
                e.stopPropagation();
                handleCloseBody();
              }}
            >
              <CloseIcon />
            </button>

            {/* Contenido expandido */}
            <div className="card-expanded-content">
              <div className="columna1">
                <DataBody
                  data={data}
                  items={items}
                  renderFunctions={renderFunctions}
                />
              </div>
              <div className="columna2">
                <DataConTabla
                  data={data}
                  items={items}
                  renderFunctions={renderFunctions}
                />
                <DataConsultas
                  data={data}
                  items={items}
                  renderFunctions={renderFunctions}
                />
              </div>
            </div>
            <CardOptions
              data={data[0]}
              items={items}
              renderFunctions={renderFunctions}
            />
          </>
        )}
      </div>
    </div>
  );
};
const DataCards = <T extends ObjetX>({
  data,
  items,
  onDataUpdate,
}: {
  data: T[];
  items: RegistoCard<T>[];
  onDataUpdate: (data: any) => void; // Función dinámica para manejar los datos
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="registro-card-container">
      {loading ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : (
        data.map((item, index) => (
          <DataCard
            key={index}
            data={[item]}
            items={items}
            onDataUpdate={onDataUpdate} // Pasamos la función
          />
        ))
      )}
    </div>
  );
};
export default DataCards;
