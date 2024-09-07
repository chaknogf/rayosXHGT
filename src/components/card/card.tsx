import React from "react";
import "@/components/card/card.css"
import "@/style.css";

interface Registro {
  id: number;
  nombre: string;
  fecha: string;
  detalle: string;
}

interface RegistroCardProps {
  data: Registro[];
}

const RegistroCard: React.FC<RegistroCardProps> = ({ data }) => {
  return (
    <div className="registro-card-container">
      
      {data.map((registro) => (
        <div className="card" key={registro.id}>
          <div className="titulos">
            <div className="item-label"> <label>Nombre: </label>  {registro.nombre}</div>
            <div className="item-label"><label>Fecha: </label> {registro.fecha}</div>
            <div className="item-label"> <label>Nombre: </label>  {registro.nombre}</div>
            <div className="item-label"><label>Fecha: </label> {registro.fecha}</div>
          </div>
          <div className="card-body">
           
            <p className="card-text">Fecha: {registro.fecha}</p>
            <p className="card-text">Detalle: {registro.detalle}</p>
          </div>
        </div>
      ))}
    </div>
  );
};


const registros = [
    { id: 1, nombre: "Juan Pérez", fecha: "2024-09-06", detalle: "Consulta general" },
    { id: 2, nombre: "Ana García", fecha: "2024-09-05", detalle: "Revisión dental" },
    { id: 3, nombre: "Carlos Rodríguez", fecha: "2024-09-04", detalle: "Examen de laboratorio" },
  ];
  

const Appcard: React.FC = () => {
    return (
      <div>
        <h1>Registros</h1>
        <RegistroCard data={registros} />
      </div>
    );
  };
  
  export default Appcard;