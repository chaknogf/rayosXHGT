import React, { useState } from "react";
import "@/components/card/card.css"
// import "@/style.css"
import { calcularEdad } from "@/utils/edad";
import { formatoFecha } from "@/utils/fecha";
import { obtenerVecindad } from "@/dictionary/direcciones/direcciones";
import { obtenerCitas, obtenerEncamamiento, obtenerEspecialidad, obtenerEspecialistas, obtenerServicioProcedimiento, obtenerServicios, obtenerTipoCitas, obtenerTipoConsulta } from "@/dictionary/enums/especialidad";
import { obtenerEstadia, obtenerEstadoSalud, obtenerSituacionPaciente, obtenerStatusDocumento } from "@/dictionary/enums/enum";
import { obtenerReferencia } from "@/dictionary/enums/hospitales";
import { FormartDPI } from "@/utils/formatDPI";

// Interfaz para definir las propiedades de cada campo en el card
interface RegistoCard<T> {
  label?: string; // El nombre de la columna o campo
  key?: keyof T; // La key que mapea a los datos de la fila
  render?: (data: T) => React.ReactNode; // Función de renderización personalizada
  svgIcon?: React.ReactNode; // SVG o icono a mostrar en la celda
  customFunction?: (data: T) => React.ReactNode; // Función adicional personalizada
  className?: string; // Clase CSS opcional para estilizar la celda
  section?: "header" | "body"; // Sección de la celda, puede ser "header" o "body"
}

// Interfaz para el componente CardProps
interface CardProps<T> {
  data: T[]; // Arreglo de datos que se muestran en las celdas
  items: RegistoCard<T>[]; // Arreglo de celdas que indican cómo renderizar cada campo
}

// Interfaz para un objeto con valores de tipo string, number o undefined
interface ObjetX {
  [key: string]: string | number | undefined;
}



const renderSexoIcon = (sexo: string) => {
  const iconZice: number = 30;
  if (sexo === "m") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={iconZice}
        height={iconZice}
        fill="#1bc5e6"
        className="bi bi-person-standing mt-1"
        viewBox="0 0 16 16"
      >
        <path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M6 6.75v8.5a.75.75 0 0 0 1.5 0V10.5a.5.5 0 0 1 1 0v4.75a.75.75 0 0 0 1.5 0v-8.5a.25.25 0 1 1 .5 0v2.5a.75.75 0 0 0 1.5 0V6.5a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v2.75a.75.75 0 0 0 1.5 0v-2.5a.25.25 0 0 1 .5 0" />
      </svg>
    );
  } else if (sexo === "f") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={iconZice}
        height={iconZice}
        fill="#df7ca8"
        className="bi bi-person-standing-dress mt-1"
        viewBox="0 0 16 16"
      >
        <path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m-.5 12.25V12h1v3.25a.75.75 0 0 0 1.5 0V12h1l-1-5v-.215a.285.285 0 0 1 .56-.078l.793 2.777a.711.711 0 1 0 1.364-.405l-1.065-3.461A3 3 0 0 0 8.784 3.5H7.216a3 3 0 0 0-2.868 2.118L3.283 9.079a.711.711 0 1 0 1.365.405l.793-2.777a.285.285 0 0 1 .56.078V7l-1 5h1v3.25a.75.75 0 0 0 1.5 0Z" />
      </svg>
    );
  }
  return "";
};

const renderExpediente = (value: number) => {
  return (
    <p className="text-exp expand-text">{ value}</p>
  )
}

const renderEstado = (estado: string) => {
  
  if (estado === "m") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        width="30"
        height="30"
        fill="white"
        className="mt-1"
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
        className="pulse mt-1"
      >
        <path d="M228.3 469.1L47.6 300.4c-4.2-3.9-8.2-8.1-11.9-12.4h87c22.6 0 43-13.6 51.7-34.5l10.5-25.2 49.3 109.5c3.8 8.5 12.1 14 21.4 14.1s17.8-5 22-13.3L320 253.7l1.7 3.4c9.5 19 28.9 31 50.1 31H476.3c-3.7 4.3-7.7 8.5-11.9 12.4L283.7 469.1c-7.5 7-17.4 10.9-27.7 10.9s-20.2-3.9-27.7-10.9zM503.7 240h-132c-3 0-5.8-1.7-7.2-4.4l-23.2-46.3c-4.1-8.1-12.4-13.3-21.5-13.3s-17.4 5.1-21.5 13.3l-41.4 82.8L205.9 158.2c-3.9-8.7-12.7-14.3-22.2-14.1s-18.1 5.9-21.8 14.8l-31.8 76.3c-1.2 3-4.2 4.9-7.4 4.9H16c-2.6 0-5 .4-7.3 1.1C3 225.2 0 208.2 0 190.9v-5.8c0-69.9 50.5-129.5 119.4-141C165 36.5 211.4 51.4 244 84l12 12 12-12c32.6-32.6 79-47.5 124.6-39.9C461.5 55.6 512 115.2 512 185.1v5.8c0 16.9-2.8 33.5-8.3 49.1z" />
      </svg>
    );
  }
  return null;
}

const renderStatusDocumento = (value: number) => {
  if (value === 1) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48" height="48"
        fill="#dddddb "
        className="mt-1"
        viewBox="0 0 26 26">
        <path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5" fill="purple" />
        <path d="M4.085 1H3.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1h-.585q.084.236.085.5V2a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 2v-.5q.001-.264.085-.5M9.98 5.356 11.372 10h.128a.5.5 0 0 1 0 1H11a.5.5 0 0 1-.479-.356l-.94-3.135-1.092 5.096a.5.5 0 0 1-.968.039L6.383 8.85l-.936 1.873A.5.5 0 0 1 5 11h-.5a.5.5 0 0 1 0-1h.191l1.362-2.724a.5.5 0 0 1 .926.08l.94 3.135 1.092-5.096a.5.5 0 0 1 .968-.039Z" />
        <path d="M9.979 5.356a.5.5 0 0 0-.968.04L7.92 10.49l-.94-3.135a.5.5 0 0 0-.926-.08L4.69 10H4.5a.5.5 0 0 0 0 1H5a.5.5 0 0 0 .447-.276l.936-1.873 1.138 3.793a.5.5 0 0 0 .968-.04L9.58 7.51l.94 3.135A.5.5 0 0 0 11 11h.5a.5.5 0 0 0 0-1h-.128z" fill="#b21025 " />
        <text x="0" y="23" font-size="6">Activo</text>
      </svg>
    );
  } else if (value === 2) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="42"
       
        fill="white"
        className="mt-1"
        viewBox="0 0 22 22">
        <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a2 2 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3m-8.322.12q.322-.119.684-.12h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981z" fill="#e7e5af "/>
        <path d="M15.854 10.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.707 0l-1.5-1.5a.5.5 0 0 1 .707-.708l1.146 1.147 2.646-2.647a.5.5 0 0 1 .708 0" fill="#343314 " />
        <text x="-1" y="20" font-size="5">Archivado</text>
      </svg>
    );
  } else if (value === 3) {
    return (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="40" 
        height="42" 
        fill="currentColor" 
        className="mt-1" 
        viewBox="0 0 22 22"
        >
        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z" fill="#1fda79" />

        <text x="0" y="20" font-size="5">Prestado</text>
      </svg>
    );
  }
  
}

const renderNombreColor = (sexo: string, nombre: string, apellido: string) => {
  const className = sexo === "m" ? "hombre zero" : "mujer zero";
  return (
    <div className="zero">
      <span className="zero expand-text">
        <span className={className} style={{ marginRight: '0.23rem' }}>{nombre}</span>
        <span className="zero">{apellido}</span>
      </span>
    </div>
  );
};



const renderEdadFunction = (nacimiento: string) => {
  return (
    <>
      <p className="zero">{formatoFecha(nacimiento)}</p>
      <p className="zero"> {calcularEdad(nacimiento)}</p>
    </>
    
  )
}

const renderFecha = (value: string) => {
  return (
    <>
      <p className="m-0">{formatoFecha(value)}</p>
      
    </>
    
  )
}

const renderDPI = (value: string) => {
  return (
    <>
      <p className="zero">{FormartDPI(value) }</p>
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

const renderReferencia = (value: number) => {
  const etiqueta: string = obtenerReferencia(value);
  return (
    <>
      <p>{etiqueta}</p>
    </>
  )
}

const renderEstadoSalud = (value: number) => {
  const etiqueta: string = obtenerEstadoSalud(value);
  return (
    <>
      <p>{ etiqueta }</p>
    </>
  )
}

const renderCitas = (value: number) => {
  const etiqueta: string = obtenerCitas(value);
  return (
    <>
      <p>{etiqueta}</p>
    </>
  )
}

const renderTipoCitas = (value: number) => {
  const etiqueta: string = obtenerTipoCitas(value);
  return (
    <>
      <p>{ etiqueta }</p>
    </>
  )
}

const renderEspecialistas = (value: number) => {
  const etiqueta: string = obtenerEspecialistas(value);
  return (
    <>
      <p>{ etiqueta }</p>
    </>
  )
}

const renderEncamamiento = (value: number) => {
  const etiqueta: string = obtenerEncamamiento(value);
  return (
    <>
      <p>{ etiqueta }</p>
    </>
  )
}

const renderEstadia = (value: number) => {
  const etiqueta: string = obtenerEstadia(value);
  return (
    <>
      <p>{ etiqueta }</p>
    </>
  )
}

const renderSituacionPaciente = (value: number) => {
  const etiqueta: string = obtenerSituacionPaciente(value);
  return (
    <>
      <p>{ etiqueta }</p>
    </>
  )
}

const renderServicoProsc = (value: number) => {
  const etiqueta: string = obtenerServicioProcedimiento(value);
  return (
    <>
      <p>{ etiqueta }</p>
    </>
  )
}


const renderFunctions: Record<string, (item: ObjetX) => React.ReactNode> = {
  expediente: item => renderExpediente(item.expediente),
  fecha: item => renderFecha(item.fecha),
  fecha_consulta: item => renderFecha(item.fecha_consulta),
  fecha_egreso: item => renderFecha(item.fecha_egreso),
  fecha_recepcion: item => renderFecha(item.fecha_recepcion),
  servicioProcedimiento: item => renderServicoProsc(item.servicioProcedimiento),
  situacionPaciente: item => renderSituacionPaciente(item.situacionPaciente),
  situacion: item => renderSituacionPaciente(item.situacion),
  estadia: item => renderEstadia(item.estadia),
  sexo: item => renderSexoIcon(item.sexo),
  nombre: item => renderNombreColor(item.sexo, item.nombre, item.apellido),
  nombres: item => renderNombreColor(item.sexo, item.nombre, item.apellido),
  estado: item => renderEstado(item.estado as string),
  nacimiento: item => renderEdadFunction(item.nacimiento as string),
  direccion: item => renderDireccion(item.direccion, item.municipio),
  cita: item => renderCitas(Number(item.cita)),
  citas: item => renderCitas(Number(item.citas)),
  tipoCitas: item => renderTipoCitas(Number(item.tipoCitas)),
  tipo_citas: item => renderTipoCitas(Number(item.tipo_citas)),
  especialidad: item => renderEspecialidad(Number(item.especialidad)),
  servicio: item => renderServicio(Number(item.servicio)),
  tipoConsulta: item => renderTipoConsulta(Number(item.tipoConsulta)),
  tipo_consulta: item => renderTipoConsulta(Number(item.tipo_consulta)),
  status: item => renderStatusDocumento(Number(item.status)),
  statusDocumento: item => renderStatusDocumento(Number(item.statusDocumento)),
  referencias: item => renderReferencia(Number(item.referencias)),
  estadoSalud: item => renderEstadoSalud(Number(item.estadoSalud)),
  estado_salud: item => renderEstadoSalud(Number(item.estado_salud)),
  especialistas: item => renderEspecialistas(Number(item.especialistas)),
  dpi: item => renderDPI(String(item.dpi))
  // Asegúrate de cerrar la lista de claves correctamente
};



const DataCard = <T extends ObjetX>({ data, items }: CardProps<T>) => {
  const [showBody, setShowBody] = useState(false);

  return (
    <>
      <div className="card">
        {/* Header */}
        <div className="">
          <div className="titulos">
            {items
              .filter((item) => item.section === "header") // Filtrar celdas para el encabezado
              .map((item, itemIndex) => {
                const renderFnHeader = item.render || renderFunctions[item.key as string]; // Usar función personalizada o renderFunction
                return (
                  <div key={itemIndex} className={`item-label ${item.className || ""}`}>
                    <strong className="labelStrong zero">
                      {item.label}
                      <br />
                    </strong> {/* Mostrar la etiqueta en el encabezado */}
                    {renderFnHeader
                      ? renderFnHeader(data[0]) // Usar renderFnHeader para mostrar el valor del primer elemento
                      : item.key && data.length > 0 && data[0][item.key] !== undefined
                      ? String(data[0][item.key]) // Mostrar el valor si renderFnHeader no está definido
                      : null}
                  </div>
                );
              })}
          </div>
        </div>

        {/* Body */}
        {showBody && ( // Solo mostrar el cuerpo si showBody es true
          <div className="card-body" onBlur={() => setShowBody(false)} onFocus={() => setShowBody(true)}>
            {data.map((rowData, index) => (
              <div key={index} className="card-content">
                {items
                  .filter((item) => item.section === "body") // Filtrar celdas para el cuerpo
                  .map((item, itemIndex) => {
                    const renderFn = item.render || renderFunctions[item.key as string]; // Usar función personalizada o renderFunction
                    return (
                      <div key={itemIndex} className={`card-body-item ${item.className || ""}`}>
                        {renderFn
                          ? renderFn(rowData) // Usar renderFn para mostrar el valor en el cuerpo
                          : item.svgIcon // Mostrar SVG si existe
                          ? item.svgIcon
                          : item.key && rowData[item.key] !== undefined // Mostrar el valor si no se pasa renderFn
                          ? String(rowData[item.key])
                          : null}
                      </div>
                    );
                  })}
              </div>
            ))}
          </div>
        )}

        <button className="btn" onClick={() => setShowBody((prev) => !prev)}>
          {showBody ? "Ocultar" : "Mostrar"} Detalles
        </button>
      </div>
    </>
  );
};



// Componente DataCards que recibe un arreglo de datos y las configuraciones de las celdas
const DataCards = <T extends ObjetX>({ data, items }: { data: T[]; items: RegistoCard<T>[] }) => {
  return (
    <div className="registro-card-container">
      {data.map((item, index) => (
        <DataCard key={index} data={[item]} items={items} />
      ))}
    </div>
  );
};

export default DataCards;