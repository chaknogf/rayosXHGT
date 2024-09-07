import React, { useState } from "react";
import "@/components/card/card.css"
import "@/style.css";

interface Registro {
    id: number;
    nombre: string;
    fecha: string;
    detalle: string;
  }
  
  interface RegistroDisplayProps {
    data: Registro[];
    view: "card" | "accordion"; // Propiedad para elegir la vista
  }
  
  const RegistroDisplay: React.FC<RegistroDisplayProps> = ({ data, view }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
  
    const toggleAccordion = (index: number) => {
      setOpenIndex(openIndex === index ? null : index);
    };
  
    return (
      <div className={`registro-display-container ${view}`}>
        {view === "card" ? (
          <div className="registro-card-container">
            {data.map((registro) => (
              <div className="card" key={registro.id}>
                <div className="card-body">
                  <h5 className="card-title">{registro.nombre}</h5>
                  <p className="card-text">Fecha: {registro.fecha}</p>
                  <p className="card-text">Detalle: {registro.detalle}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="registro-accordion-container">
            {data.map((registro, index) => (
              <div key={registro.id} className="accordion-item">
                <h2 onClick={() => toggleAccordion(index)}>
                  {registro.nombre} - {registro.fecha}
                </h2>
                {openIndex === index && <p>{registro.detalle}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  
const registros = [
    { id: 1, nombre: "Juan Pérez", fecha: "2024-09-06", detalle: "Consulta general" },
    { id: 2, nombre: "Ana García", fecha: "2024-09-05", detalle: "Revisión dental" },
    { id: 3, nombre: "Carlos Rodríguez", fecha: "2024-09-04", detalle: "Examen de laboratorio" },
  ];

  
  const AppAcordion: React.FC = () => {
    return (
      <div>
         <h1>Registros</h1>
         <RegistroDisplay data={registros} view="accordion" /> {/* Pasa la propiedad view */}
      </div>
    );
  };
  
  export default AppAcordion;