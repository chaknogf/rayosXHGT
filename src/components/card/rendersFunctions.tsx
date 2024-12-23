// renderFunctions.tsx

import React from "react";
import { FaRibbon } from "react-icons/fa";
import { PiHeartbeatFill } from "react-icons/pi";
import { FcExport, FcOpenedFolder } from "react-icons/fc";
import { calcularEdad } from "@/utils/edad";
import { formatoFecha } from "@/utils/fecha";
import { obtenerVecindad } from "@/dictionary/direcciones/direcciones";
import { FormartDPI } from "@/utils/formatDPI";
import {
  obtenerCitas,
  obtenerEncamamiento,
  obtenerEspecialidad,
  obtenerEspecialistas,
  obtenerServicioProcedimiento,
  obtenerServicios,
  obtenerTipoCitas,
  obtenerTipoConsulta,
} from "@/dictionary/enums/especialidad";
import {
  obtenerEstadia,
  obtenerEstadoSalud,
  obtenerSituacionPaciente,
  // obtenerStatusDocumento,
} from "@/dictionary/enums/enum";
import { obtenerReferencia } from "@/dictionary/enums/hospitales";
import { HealthiconsHospitalized } from "@/assets/icons/svg";
import "@/components/card/css/render.css";
// Aquí comienzan los renderizadores

function formatAgeText(text: string, cls: string): React.ReactNode {
  const formattedText = text.replace(
    /\b(años|meses|días)\b/g,
    (match) => `<span class="${cls}">${match}</span>`
  );
  return <span dangerouslySetInnerHTML={{ __html: formattedText }} />;
}

const renderSexoIcon = (sexo: string) => {
  const iconZice: string = "1.6rem";
  if (sexo === "M") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={iconZice}
        height={iconZice}
        fill="#1bc5e6"
        className="bi bi-person-standing zero"
        viewBox="0 0 16 16"
      >
        <path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M6 6.75v8.5a.75.75 0 0 0 1.5 0V10.5a.5.5 0 0 1 1 0v4.75a.75.75 0 0 0 1.5 0v-8.5a.25.25 0 1 1 .5 0v2.5a.75.75 0 0 0 1.5 0V6.5a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v2.75a.75.75 0 0 0 1.5 0v-2.5a.25.25 0 0 1 .5 0" />
      </svg>
    );
  } else if (sexo === "F") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={iconZice}
        height={iconZice}
        fill="#df7ca8"
        className="bi bi-person-standing-dress zero"
        viewBox="0 0 16 16"
      >
        <path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m-.5 12.25V12h1v3.25a.75.75 0 0 0 1.5 0V12h1l-1-5v-.215a.285.285 0 0 1 .56-.078l.793 2.777a.711.711 0 1 0 1.364-.405l-1.065-3.461A3 3 0 0 0 8.784 3.5H7.216a3 3 0 0 0-2.868 2.118L3.283 9.079a.711.711 0 1 0 1.365.405l.793-2.777a.285.285 0 0 1 .56.078V7l-1 5h1v3.25a.75.75 0 0 0 1.5 0Z" />
      </svg>
    );
  }
  return "";
};

const renderExpediente = (value: string) => {
  return <p className="text-exp expand-text">{value}</p>;
};

const renderEstado = (estado: string) => {
  if (estado === "M") {
    return <FaRibbon style={{ height: "1.6rem", width: "1.6rem" }} />;
  } else if (estado === "V") {
    return (
      <PiHeartbeatFill
        className="pulse zero"
        style={{ height: "1.6rem", width: "1.6rem", color: "red" }}
      />
    );
  }
  return null;
};

const renderStatusDocumento = (value: number) => {
  if (value === 1) {
    return (
      <>
        <HealthiconsHospitalized
          style={{ height: "1.8rem", width: "1.8rem" }}
        />
      </>
    );
  } else if (value === 2) {
    return <FcOpenedFolder style={{ height: "1.8rem", width: "1.8rem" }} />;
  } else if (value === 3) {
    return <FcExport style={{ height: "1.8rem", width: "1.8rem" }} />;
  }
};

const renderNombreColor = (sexo: string, nombre: string, apellido: string) => {
  // Clase condicional basada en el sexo (sin toLowerCase)
  const className = sexo === "M" ? "hombre zero" : "mujer zero";

  // Función para convertir a formato título (Primera letra en mayúscula)
  const toTitleCase = (value: string) => {
    const exceptions = ["de", "del", "la", "y", "el", "en", "con"];
    return value
      .toLowerCase()
      .split(" ")
      .map(
        (word) =>
          exceptions.includes(word)
            ? word // Si la palabra está en excepciones, no la cambia
            : word.charAt(0).toUpperCase() + word.slice(1) // Si no está, la convierte en formato título
      )
      .join(" ");
  };

  return (
    <div className="zero">
      <span className="zero expand-text">
        <span className={className} style={{ marginRight: "0.23rem" }}>
          {toTitleCase(nombre)}
        </span>
        <span>{toTitleCase(apellido)}</span>
      </span>
    </div>
  );
};

const renderEdadFunction = (nacimiento: string, defuncion?: string) => {
  const ageText = formatoFecha(nacimiento); // Se llama directamente a la función para obtener el texto
  const cls = "edad"; // Clase CSS para resaltar palabras específicas

  return (
    <div className="renE zero">
      <p className="renEdad zero edad">{formatAgeText(ageText, cls)}</p>
      <p className="renEdad_ zero">{calcularEdad(nacimiento)}</p>
      {defuncion && (
        <p className="renDefuncion zero">
          Defunción: {formatoFecha(defuncion)}
        </p>
      )}
    </div>
  );
};
const renderFecha = (value: string) => {
  return (
    <>
      <p className="m-0">{formatoFecha(value)}</p>
    </>
  );
};

const renderDPI = (value: string) => {
  return (
    <>
      <p className="dpi">{FormartDPI(value)}</p>
    </>
  );
};

const renderTextOracion = (value: string) => {
  return <p className="nombre-propio">{value}</p>;
};

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
      <p>{etiqueta}</p>
    </>
  );
};

const renderServicio = (value: number) => {
  const etiqueta: string = obtenerServicios(value);
  return (
    <>
      <p>{etiqueta}</p>
    </>
  );
};

const renderTipoConsulta = (value: number) => {
  const etiqueta: string = obtenerTipoConsulta(value);
  return (
    <>
      <p className="m-0">{etiqueta}</p>
    </>
  );
};

const renderReferencia = (value: number) => {
  const etiqueta: string = obtenerReferencia(value);
  return (
    <>
      <p>{etiqueta}</p>
    </>
  );
};

const renderEstadoSalud = (value: number) => {
  const etiqueta: string = obtenerEstadoSalud(value);
  return (
    <>
      <p>{etiqueta}</p>
    </>
  );
};

const renderCitas = (value: number) => {
  const etiqueta: string = obtenerCitas(value);
  return (
    <>
      <p>{etiqueta}</p>
    </>
  );
};

const renderTipoCitas = (value: number) => {
  const etiqueta: string = obtenerTipoCitas(value);
  return (
    <>
      <p>{etiqueta}</p>
    </>
  );
};

const renderEspecialistas = (value: number) => {
  const etiqueta: string = obtenerEspecialistas(value);
  return (
    <>
      <p>{etiqueta}</p>
    </>
  );
};

const renderEncamamiento = (value: number) => {
  const etiqueta: string = obtenerEncamamiento(value);
  return (
    <>
      <p>{etiqueta}</p>
    </>
  );
};

const renderEstadia = (value: number) => {
  const etiqueta: string = obtenerEstadia(value);
  return (
    <>
      <p>{etiqueta}</p>
    </>
  );
};

const renderSituacionPaciente = (value: number) => {
  const etiqueta: string = obtenerSituacionPaciente(value);
  return (
    <>
      <p>{etiqueta}</p>
    </>
  );
};

const renderServicoProsc = (value: number) => {
  const etiqueta: string = obtenerServicioProcedimiento(value);
  return (
    <>
      <p>{etiqueta}</p>
    </>
  );
};

interface ObjetX {
  [key: string]: any;
}

export const renderFunctions: Record<
  string,
  (item: ObjetX) => React.ReactNode
> = {
  expediente: (item) => renderExpediente(item.expediente),
  fecha: (item) => renderFecha(item.fecha),
  fecha_consulta: (item) => renderFecha(item.fecha_consulta),
  fecha_egreso: (item) => renderFecha(item.fecha_egreso),
  fecha_recepcion: (item) => renderFecha(item.fecha_recepcion),
  servicioProcedimiento: (item) =>
    renderServicoProsc(item.servicioProcedimiento),
  situacionPaciente: (item) => renderSituacionPaciente(item.situacionPaciente),
  situacion: (item) => renderSituacionPaciente(item.situacion),
  estadia: (item) => renderEstadia(item.estadia),
  sexo: (item) => renderSexoIcon(item.sexo),
  nombre: (item) => renderNombreColor(item.sexo, item.nombre, item.apellido),
  textoNombre: (item) => renderTextOracion(item.nombre),
  textoApellido: (item) => renderTextOracion(item.apellido),
  estado: (item) => renderEstado(item.estado as string),
  nacimiento: (item) => renderEdadFunction(item.nacimiento as string),
  direccion: (item) => renderDireccion(item.direccion, item.municipio),
  cita: (item) => renderCitas(Number(item.cita)),
  citas: (item) => renderCitas(Number(item.citas)),
  tipoCitas: (item) => renderTipoCitas(Number(item.tipoCitas)),
  tipo_citas: (item) => renderTipoCitas(Number(item.tipo_citas)),
  especialidad: (item) => renderEspecialidad(Number(item.especialidad)),
  servicio: (item) => renderServicio(Number(item.servicio)),
  tipoConsulta: (item) => renderTipoConsulta(Number(item.tipoConsulta)),
  tipo_consulta: (item) => renderTipoConsulta(Number(item.tipo_consulta)),
  estatus: (item) => renderStatusDocumento(Number(item.estatus)),
  statusDocumento: (item) =>
    renderStatusDocumento(Number(item.statusDocumento)),
  referencias: (item) => renderReferencia(Number(item.referencias)),
  estadoSalud: (item) => renderEstadoSalud(Number(item.estadoSalud)),
  estado_salud: (item) => renderEstadoSalud(Number(item.estado_salud)),
  especialistas: (item) => renderEspecialistas(Number(item.especialistas)),
  dpi: (item) => renderDPI(String(item.dpi)),

  // Asegúrate de cerrar la lista de claves correctamente
};
