import React from "react";

interface DataConsultasProps {
  data: any; // Datos del paciente
  items: { label: string; key: string; section: string }[]; // Lista de campos
  onClose: () => void; // Función para cerrar el modal
}

const DataConsultas: React.FC<DataConsultasProps> = ({
  data,
  items,
  onClose,
}) => {
  return (
    <div>
      <h3>Información del Paciente</h3>
      <table>
        <thead>
          <tr>
            <th>Campo</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.key}>
              <td>{item.label}</td>
              <td>{data[item.key] || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};

export default DataConsultas;
