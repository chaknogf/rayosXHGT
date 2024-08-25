import React from "react";
import "@/components/dataTable/dataTable.css"
import "@/style.css"
import { calcularEdad } from "@/utils/edad";
import { formatoFecha } from "@/utils/fecha";
import { obtenerVecindad } from "@/dictionary/direcciones/direcciones";
import { obtenerEspecialidad, obtenerServicios, obtenerTipoConsulta } from "@/dictionary/enums/especialidad";
import { obtenerStatusDocumento } from "@/dictionary/enums/enum";

interface TableColumn<T> {
  label: string;
  key?: keyof T; // Hacer que key sea opcional si usas render
  render?: (data: T) => React.ReactNode;
  svgIcon?: React.ReactNode; // SVG opcional para la columna
  customFunction?: (data: T) => React.ReactNode; // Función personalizada opcional
  className?: string;
}

interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
}

interface Person {
  sexo: string;
  nombre: string;
  apellido: string;
  direccion: string;
  municipio: number;
  departamento: number;
}

const renderSexoIcon = (sexo: string) => {
  if (sexo === "m") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        fill="#1bc5e6"
        className="bi bi-person-standing"
        viewBox="0 0 16 16"
      >
        <path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M6 6.75v8.5a.75.75 0 0 0 1.5 0V10.5a.5.5 0 0 1 1 0v4.75a.75.75 0 0 0 1.5 0v-8.5a.25.25 0 1 1 .5 0v2.5a.75.75 0 0 0 1.5 0V6.5a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v2.75a.75.75 0 0 0 1.5 0v-2.5a.25.25 0 0 1 .5 0" />
      </svg>
    );
  } else if (sexo === "f") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        fill="#df7ca8"
        className="bi bi-person-standing-dress"
        viewBox="0 0 16 16"
      >
        <path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m-.5 12.25V12h1v3.25a.75.75 0 0 0 1.5 0V12h1l-1-5v-.215a.285.285 0 0 1 .56-.078l.793 2.777a.711.711 0 1 0 1.364-.405l-1.065-3.461A3 3 0 0 0 8.784 3.5H7.216a3 3 0 0 0-2.868 2.118L3.283 9.079a.711.711 0 1 0 1.365.405l.793-2.777a.285.285 0 0 1 .56.078V7l-1 5h1v3.25a.75.75 0 0 0 1.5 0Z" />
      </svg>
    );
  }
  return null;
};

const renderEstado = (estado: string) => {
  
  if (estado === "m") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        width="30"
        height="30"
        fill="white"
      >
        <path d="M256 0C114.6 0 0 100.3 0 224c0 70.1 36.9 132.6 94.5 173.7 9.6 6.9 15.2 18.1 13.5 29.9l-9.4 66.2c-1.4 9.6 6 18.2 15.7 18.2H192v-56c0-4.4 3.6-8 8-8h16c4.4 0 8 3.6 8 8v56h64v-56c0-4.4 3.6-8 8-8h16c4.4 0 8 3.6 8 8v56h77.7c9.7 0 17.1-8.6 15.7-18.2l-9.4-66.2c-1.7-11.7 3.8-23 13.5-29.9C475.1 356.6 512 294.1 512 224 512 100.3 397.4 0 256 0zm-96 320c-35.3 0-64-28.7-64-64s28.7-64 64-64 64 28.7 64 64-28.7 64-64 64zm192 0c-35.3 0-64-28.7-64-64s28.7-64 64-64 64 28.7 64 64-28.7 64-64 64z" />
      </svg>

    );
  } else if (estado === "v") { 

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        height="30"
        fill="red"
        className="pulse"
      >
        <path d="M228.3 469.1L47.6 300.4c-4.2-3.9-8.2-8.1-11.9-12.4h87c22.6 0 43-13.6 51.7-34.5l10.5-25.2 49.3 109.5c3.8 8.5 12.1 14 21.4 14.1s17.8-5 22-13.3L320 253.7l1.7 3.4c9.5 19 28.9 31 50.1 31H476.3c-3.7 4.3-7.7 8.5-11.9 12.4L283.7 469.1c-7.5 7-17.4 10.9-27.7 10.9s-20.2-3.9-27.7-10.9zM503.7 240h-132c-3 0-5.8-1.7-7.2-4.4l-23.2-46.3c-4.1-8.1-12.4-13.3-21.5-13.3s-17.4 5.1-21.5 13.3l-41.4 82.8L205.9 158.2c-3.9-8.7-12.7-14.3-22.2-14.1s-18.1 5.9-21.8 14.8l-31.8 76.3c-1.2 3-4.2 4.9-7.4 4.9H16c-2.6 0-5 .4-7.3 1.1C3 225.2 0 208.2 0 190.9v-5.8c0-69.9 50.5-129.5 119.4-141C165 36.5 211.4 51.4 244 84l12 12 12-12c32.6-32.6 79-47.5 124.6-39.9C461.5 55.6 512 115.2 512 185.1v5.8c0 16.9-2.8 33.5-8.3 49.1z" />
      </svg>
    );
  }
  return null;
}

const renderNombreColor = (sexo: string, nombre: string, apellido: string) => {
  
  const className = sexo === "m" ? "hombre m-0" : "mujer m-0";
  
  return (
    <div>
      <p className={className}>{nombre}</p>
      <p>{apellido}</p>
    </div>
  );
};

const renderEdadFunction = (nacimiento: string) => {
  return (
    <>
      <p className="m-0">{formatoFecha(nacimiento)}</p>
      {calcularEdad(nacimiento)}
    </>
    
  )
}

const renderDireccion = (direccion: string, municipio: number) => {
  const etiqueta: string = obtenerVecindad(municipio); 
  
  return (
    <>
      <p>{direccion}, <br />{etiqueta}</p>
    </>
  );
};

const renderEspecialidad = (value: number) => {
  const etiqueta: string = obtenerEspecialidad(value);
  return (
    <>
      <p>{ etiqueta }</p>
    </>
  )
}

const renderServicio = (value: number) => {
  const etiqueta: string = obtenerServicios(value);
  return (
    <>
      <p>{ etiqueta }</p>
    </>
  )
}

const renderTipoConsulta = (value: number) => {
  const etiqueta: string = obtenerTipoConsulta(value);
  return (
    <>
      <p>{ etiqueta }</p>
    </>
  )
}

const renderStatusDocumento = (value: number) => {
  const etiqueta: string = obtenerStatusDocumento(value);
  return (
    <>
      <p>{ etiqueta }</p>
    </>
  )
}


const DataTable = <T extends Person>({ data, columns }: TableProps<T>) => {
  return (
    <div className="table-radius zoomable-content">
      <table className="table table-hover table-black ">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {columns.map((column, colIndex) => (
                <td key={colIndex} className={column.className}>
                  {column.key === "sexo"
                    ? renderSexoIcon(item[column.key] as string)
                    : column.key === "nombre" || column.key === "nombres"
                    ? renderNombreColor(item.sexo, item.nombre, item.apellido)
                    : column.key === "estado"
                    ? renderEstado(item[column.key] as string)
                    : column.key === "nacimiento"
                    ? renderEdadFunction(item[column.key] as string)
                    : column.key === "direccion"
                    ? renderDireccion(item.direccion, item.municipio)
                    : column.key === "especialidad"
                    ? renderEspecialidad(item[column.key] as string)
                    : column.key === "servicio"
                    ? renderServicio(item[column.key] as string )
                    : column.key === "tipoConsulta" || column.key === "tipo_consulta"
                    ? renderTipoConsulta (item[column.key] as string)
                    : column.key === "status" || column.key === "statusDocumento"
                    ? renderStatusDocumento(item[column.key] as string)
                    : column.customFunction
                    ? column.customFunction(item)
                    : column.svgIcon
                    ? column.svgIcon
                    : column.render
                    ? column.render(item)
                    : column.key
                    ? String(item[column.key])
                    : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
