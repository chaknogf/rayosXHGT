import React from "react";
import DataCards from "@/components/card/card";
import { CloseIcon } from "@/assets/icons/svg";

interface GenericCardsProps<T> {
  data: T[]; // Lista de datos principales
  items: {
    label: string;
    key: keyof T;
    render?: (item: T) => React.ReactNode;
  }[]; // Configuración de columnas o elementos
  showDetailCard: boolean; // Estado para mostrar/ocultar detalles
  onOpenDetail: () => void; // Acción al abrir la tarjeta de detalles
  onCloseDetail: () => void; // Acción al cerrar la tarjeta de detalles
}

const GenericCards = <T,>({
  data,
  items,
  showDetailCard,
  onOpenDetail,
  onCloseDetail,
}: GenericCardsProps<T>) => {
  return (
    <div className="container">
      {/* Botón para abrir detalles */}
      <div>
        {/* Detalles */}
        <div
          className={`card-body-data ${
            showDetailCard ? "visible" : "collapsed"
          }`}
        >
          <button onMouseEnter={onCloseDetail} className="btn">
            <CloseIcon />
          </button>
          <p>Contenido aquí...</p>
        </div>
      </div>

      {/* Tarjetas con datos */}
      <div className="data-cards">
        {data.map((item, index) => (
          <div key={index} className="data-card">
            {items.map(({ label, key, render }) => (
              <div key={String(key)} className="data-card-item">
                <strong>{label}:</strong>
                {render ? render(item) : item[key]}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenericCards;
