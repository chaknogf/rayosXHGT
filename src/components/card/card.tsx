import React, { useState, useEffect } from "react";
import "@/components/card/css/card.css";
import { LoaderHamster as Loader } from "@/components/loader/loader";
import { renderFunctions } from "@/components/card/rendersFunctions";
import CardHeader from "@/components/card/CardHeader";
import OptionsCard from "@/components/card/OptionCard";
import { CloseIcon } from "@/assets/icons/svg";
import DataBody from "@/components/card/DataBody";
import DataConsultas from "./DataConsultas";
import DataConTabla from "./DataConTabla";

// Interfaz para definir las propiedades de cada campo en el card
interface RegistoCard<T> {
  label?: string;
  key?: keyof T;
  render?: (data: T) => React.ReactNode;
  svgIcon?: React.ReactNode;
  customFunction?: (data: T) => React.ReactNode;
  className?: string;
  section?: "header" | "body" | "option" | "tabla";
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
  showBody: boolean;
  onToggleBody: () => void;
  pacienteId: number;
}

interface ObjetX {
  [key: string]: string | number | undefined;
}

const DataCard = <T extends ObjetX>({ data, items }: CardProps<T>) => {
  const [showBody, setShowBody] = useState<boolean>(false); // Estado local para cada tarjeta

  const handleToggleBody = () => {
    setShowBody((prev) => !prev); // Alterna entre expandido y colapsado
  };

  const handleshowBody = () => {
    setShowBody(true);
  };

  const handleCloseBody = () => {
    setShowBody(false);
  };

  return (
    <div className="card-container" tabIndex={0}>
      <div className="card card-card" onClick={handleshowBody}>
        <CardHeader
          data={data[0]}
          items={items}
          renderFunctions={renderFunctions}
          dataId={data[0].paciente_id}
        />

        {showBody && (
          <>
            <button
              className="btn btn-close-body"
              onClick={(e) => {
                e.stopPropagation(); // Evita que el evento cierre accidentalmente la tarjeta
                handleCloseBody(); // Cierra la tarjeta
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
            <OptionsCard
              data={data}
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
}: {
  data: T[];
  items: RegistoCard<T>[];
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
            items={items} // Pasamos las configuraciones
          />
        ))
      )}
    </div>
  );
};

export default DataCards;
