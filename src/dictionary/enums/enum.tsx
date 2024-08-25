
import { crearObtenerEtiqueta} from "@/utils/obtenerEtiqueta"


// Interface 
export interface Nacionalidad {
    value: number;
    label: string;
}

export interface Etnias{
    value: number;
    label: string;
}
  
export interface EstadoCivil{
    value: number;
    label: string;
}
  
export interface Academico{
    value: number;
    label: string;
}
  
export interface Parentesco{
    value: number;
    label: string;
}

export interface Idioma{
   value: number;
   label: string;
}
 
export interface StatusDocumento {
    value: number;
    label: string;
}
  
export interface EstadoSalud {
    value: number;
    label: string;
}

export interface SituacionPaciente {
    value: number;
    label: string;
}

export interface Estadia {
    value: number;
    label: string;
  }
  

// diccionario de datos
 
export const nacionalidad: Nacionalidad[] = [
  
    { value: 1, label: 'Guatemalteca' },
    { value: 2, label: 'Beliceña' },
    { value: 3, label: 'Salvadoreña' },
    { value: 4, label: 'Hondureña' },
    { value: 5, label: 'Nicaragüense' },
    { value: 6, label: 'Costarricense' },
    { value: 7, label: 'Panameña' },
    { value: 8, label: 'Mexicana' },
    { value: 9, label: 'Otro pais' },
    { value: 0, label: 'No indica' },
  
];
  
export const etnias: Etnias[] = [
    { value: 1, label: 'Ladino' },
    { value: 2, label: 'Maya' },
    { value: 3, label: 'Garífuna' },
    { value: 4, label: 'Xinca' },
    { value: 5, label: 'Otros' },
    { value: 6, label: 'No indica' },
];
  
export const estadoCivil: EstadoCivil[] = [
    { value: 1, label: 'Casado' },
    { value: 2, label: 'Unido' },
    { value: 3, label: 'Soltero' },
];
  
export const academico: Academico[] = [
    { value: 1, label: 'No aplica' },
    { value: 2, label: 'Pre Primaria' },
    { value: 3, label: 'Primaria' },
    { value: 4, label: 'Básicos' },
    { value: 5, label: 'Diversificado' },
    { value: 6, label: 'Universidad' },
    { value: 7, label: 'Ninguno' },
    { value: 8, label: 'Otro' },
    { value: 9, label: 'No indica' },
];
    
export const parentesco: Parentesco[] = [
    { value: 1, label: 'Madre/Padre' },
    { value: 2, label: 'Hijo/a' },
    { value: 3, label: 'Hermano/a' },
    { value: 4, label: 'Abuelo/a' },
    { value: 5, label: 'Tío/a' },
    { value: 6, label: 'Primo/a' },
    { value: 7, label: 'Sobrino/a' },
    { value: 8, label: 'Yerno/Nuera' },
    { value: 9, label: 'Esposo/a' },
    { value: 10, label: 'Suegro/a' },
    { value: 11, label: 'Tutor' },
    { value: 12, label: 'Amistad' },
    { value: 13, label: 'Novio/a' },
    { value: 14, label: 'Cuñado/a' },
    { value: 15, label: 'Nieto/a' },
    { value: 16, label: 'Hijastros' },
    { value: 17, label: 'Padrastros' },
    { value: 18, label: 'Otro' },
];
    
export const idioma: Idioma[] = [
    { value: 1, label: 'Achi' },
    { value: 2, label: 'Akateka' },
    { value: 3, label: 'Awakateka' },
    { value: 4, label: 'Chorti' },
    { value: 5, label: 'Chalchiteka' },
    { value: 6, label: 'Chuj' },
    { value: 7, label: 'Itza' },
    { value: 8, label: 'Ixil' },
    { value: 9, label: 'Jakalteka' },
    { value: 10, label: 'Kaqchikel' },
    { value: 11, label: 'Kiche' },
    { value: 12, label: 'Mam' },
    { value: 13, label: 'Mopan' },
    { value: 14, label: 'Poqomam' },
    { value: 15, label: 'Pocomchi' },
    { value: 16, label: 'Qanjobal' },
    { value: 17, label: 'Qeqchi' },
    { value: 18, label: 'Sakapulteka' },
    { value: 19, label: 'Sipakapensa' },
    { value: 20, label: 'Tektiteka' },
    { value: 21, label: 'Tzutujil' },
    { value: 22, label: 'Uspanteka' },
    { value: 23, label: 'No indica' },
    { value: 24, label: 'Español' },
    { value: 25, label: 'Otro' },
];

export const statusDocumento: StatusDocumento[] = [
    { value: 1, label: 'activo' },
    { value: 2, label: 'archivado' },
    { value: 3, label: 'prestado' }
  
];
  
export const estadoSalud: EstadoSalud[] = [
    { value: 1, label: 'Estable' },
    { value: 2, label: 'Delicado' },
    { value: 3, label: 'Fallecido' }
];
  
export const situacionPaciente: SituacionPaciente[] = [
    { value: 1, label: 'Hospitalizado' },
    { value: 2, label: 'Observación' },
    { value: 3, label: 'Recuperado' },
    { value: 4, label: 'Referido' },
    { value: 5, label: 'Trasladado' },
    { value: 6, label: 'Fugado' },
    { value: 7, label: 'Fallecido' },
];
  
export const estadia: Estadia[] = [
    { value: 1, label: 'cama' },
    { value: 2, label: 'camilla' },
    { value: 3, label: 'silla de ruedas' },
    { value: 4, label: 'no aplica' },
    { value: 5, label: 'otro' },
];
  
  
  

// funciones
export const obtenerNacionalidad = crearObtenerEtiqueta(nacionalidad);
export const obtenerEtnia = crearObtenerEtiqueta(etnias);
export const obtenerEstadoCivil = crearObtenerEtiqueta(estadoCivil);
export const obtenerAcademico = crearObtenerEtiqueta(academico);
export const obtenerParentesco = crearObtenerEtiqueta(parentesco);
export const obtenerIdioma = crearObtenerEtiqueta(idioma);
export const obtenerStatusDocumento = crearObtenerEtiqueta(statusDocumento);
export const obtenerEstadoSalud = crearObtenerEtiqueta(estadoSalud);
export const obtenerSituacionPaciente = crearObtenerEtiqueta(situacionPaciente);
export const obtenerEstadia = crearObtenerEtiqueta(estadia);




