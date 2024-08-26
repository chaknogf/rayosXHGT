import { crearObtenerEtiqueta } from "@/utils/obtenerEtiqueta";

// interface
export interface Especialidad {
    value: number;
    label: string;
}
  
export interface Citas {
  value: number;
  label: string;
}

export interface Tipo_citas {
  value: number;
  label: string;
}

export interface Especialistas {
  value: number;
  label: string;
}

export interface TiposConsulta {
  value: number;
  label: string;
}

export interface Servicios {
  value: number;
  label: string;
}

export interface Encamamiento {
  value: number;
  label: string;
}

export interface ServicioProcedimiento {
  value: number;
  label: string;
}


  
// directorios 
export const especialidad: Especialidad[] = [
  { value: 1, label: 'Medicina Interna' },
  { value: 2, label: 'Pediatria' },
  { value: 3, label: 'Ginecologia y Obstetricia' },
  { value: 4, label: 'Cirugia' },
  { value: 5, label: 'Traumatologia' },
  { value: 6, label: 'Psicologia' },
  { value: 7, label: 'Nutrición' },
 
];
  
export const citas: Citas[] = [
  { value: 1, label: 'Medicina Interna' },
  { value: 2, label: 'Pediatria' },
  { value: 3, label: 'Ginecologia' },
  { value: 4, label: 'Cirugia' },
  { value: 5, label: 'Traumatologia' },
  { value: 6, label: 'Psicologia' },
  { value: 7, label: 'Nutrición' },
  { value: 8, label: 'Obstetricia' },
  { value: 9, label: 'especial medicina' },
  { value: 10, label: 'Ultrasonido' },
  { value: 11, label: 'Endoscopia' },
  { value: 12, label: 'Laboratorio' }
  
];

export const tipoCitas: Tipo_citas[] = [
  { value: 1, label: 'Consulta' },
  { value: 2, label: 'Ingreso - Operatorio' },
  { value: 3, label: 'USG Obstetrico' },
  { value: 4, label: 'USG Pelvico' },
  { value: 5, label: 'Colposcopia' },
  { value: 9, label: 'Especial' },
  { value: 10, label: 'Laboratorio' }
];
  
export const especialistas: Especialistas[] = [
  { value: 1, label: 'Médico Internista' },
  { value: 2, label: 'Médico Pediatria' },
  { value: 3, label: 'Médico Ginecólogo' },
  { value: 4, label: 'Médico Cirujano' },
  { value: 5, label: 'Médico Traumatologo' },
  { value: 6, label: 'Psicologo' },
  { value: 7, label: 'Nutricionista' },
  { value: 8, label: 'Médico General' },
  
  
];
   
export const tipoConsulta: TiposConsulta[] = [
  { value: 1, label: 'Coex' },
  { value: 2, label: 'Hosp' },
  { value: 3, label: 'Emergencia' },
  
  
];
 
export const servicios: Servicios[] = [
  
  { value: 0, label: 'Emergencia' },
  { value: 1, label: 'SOP' },
  { value: 2, label: 'Maternidad' },
  { value: 3, label: 'Ginecologia' },
  { value: 4, label: 'Cirugia' },
  { value: 5, label: 'Cirugia pedia' },
  { value: 6, label: 'Trauma' },
  { value: 7, label: 'Trauma pedia' },
  { value: 8, label: 'CRN' },
  { value: 9, label: 'Pediatria' },
  { value: 10, label: 'Alojamiento RN' },
  { value: 11, label: 'Neonatos' },
  { value: 12, label: 'Medicina hombres' },
  { value: 13, label: 'Medicina mujeres' },
  { value: 14, label: 'vsvs' },
  { value: 15, label: 'Covid' },
  { value: 16, label: 'labor & parto' },
  { value: 17, label: 'area roja emergencia' },
  { value: 18, label: 'Medicina' },
  { value: 19, label: 'UCIN' },
  { value: 20, label: 'COEX' },
  
];
  
export const encamamiento: Encamamiento[] = [
  
  { value: 2, label: 'Maternidad' },
  { value: 3, label: 'Ginecologia' },
  { value: 4, label: 'Cirugia' },
  { value: 5, label: 'Cirugia pedia' },
  { value: 6, label: 'Trauma' },
  { value: 7, label: 'Trauma pedia' },
  { value: 8, label: 'CRN' },
  { value: 9, label: 'Pediatria' },
  { value: 10, label: 'Alojamiento RN' },
  { value: 11, label: 'Neonatos' },
  // { value: 15, label: 'Covid' },
  { value: 18, label: 'Medicina' },
  { value: 19, label: 'UCIN' },
  

];
  
export const servicioProcedimiento: ServicioProcedimiento[] = [
  { value: 1, label: 'COEX' },
  { value: 2, label: 'Encamamiento' },
  { value: 3, label: 'Emergencia' },
  { value: 4, label: 'SOP emergencia' },
  { value: 5, label: 'SOP electiva' },
  { value: 6, label: 'Maternidad' },
];


// funciones

export const obtenerEspecialidad = crearObtenerEtiqueta(especialidad);
export const obtenerCitas = crearObtenerEtiqueta(citas);
export const obtenerTipoCitas = crearObtenerEtiqueta(tipoCitas)
export const obtenerEspecialistas = crearObtenerEtiqueta(especialistas);
export const obtenerTipoConsulta = crearObtenerEtiqueta(tipoConsulta);
export const obtenerServicios = crearObtenerEtiqueta(servicios);
export const obtenerEncamamiento= crearObtenerEtiqueta(encamamiento);
export const obtenerServicioProcedimiento = crearObtenerEtiqueta(servicioProcedimiento);







