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
import { FaRibbon } from "react-icons/fa";
import { PiHeartbeatFill } from "react-icons/pi";
import { FaUserDoctor } from "react-icons/fa6";
import { GiMedicalDrip } from "react-icons/gi";
import { FcExport, FcOpenedFolder } from "react-icons/fc";

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
      <FaRibbon style={{height: "1.5rem", width: "1.5rem"}} />


    );
  } else if (estado === "v") { 

    return (
      <PiHeartbeatFill className="pulse" style={{height: "1.5rem", width: "1.5rem", color: "red"}} />
    );
  }
  return null;
}

const renderStatusDocumento = (value: number) => {
  if (value === 1) {
    return (
      <>
         <FaUserDoctor style={{height: "1.5rem", width: "1.5rem"}} />
         <GiMedicalDrip  style={{height: "1.8rem", width: "1.8rem"}}/>
      </>
     
    );
  } else if (value === 2) {
    return (
      <FcOpenedFolder style={{height: "1.8rem", width: "1.8rem"}}/>
    );
  } else if (value === 3) {
    return (
      <FcExport style={{height: "1.8rem", width: "1.8rem"}}/>
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
      <p style={{padding: 0, marginLeft: 0}}>{formatoFecha(nacimiento)}</p>
      <p style={{padding: 0, marginRight: '0.12rem'}}> {calcularEdad(nacimiento)}</p>
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
      {direccion}, {etiqueta}
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
                      <>
                        
                        <div key={itemIndex} className={`card-body-item ${item.className || ""}`}>
                        <label className="label-item-body">{item.label}:</label>
                          {renderFn
                          ? renderFn(rowData) // Usar renderFn para mostrar el valor en el cuerpo
                          : item.svgIcon // Mostrar SVG si existe
                          ? item.svgIcon
                          : item.key && rowData[item.key] !== undefined // Mostrar el valor si no se pasa renderFn
                          ? String(rowData[item.key])
                          : null}
                      </div>
                      </>
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