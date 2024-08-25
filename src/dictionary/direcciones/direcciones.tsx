import { crearObtenerEtiqueta } from "../../utils/obtenerEtiqueta";
import { vecindad } from "@/dictionary/direcciones/vecindad";
import { municipio } from "@/dictionary/direcciones/municipios";
import { departamentos } from "@/dictionary/direcciones/departamentos"
import { comunidad } from "@/dictionary/direcciones/comunidadChimaltenango";



export const obtenerVecindad = crearObtenerEtiqueta(vecindad);
export const obtenerMuni = crearObtenerEtiqueta(municipio);
export const obtenerDepartamento = crearObtenerEtiqueta(departamentos);


export function listarComunidades(muni: number): string[] {
    const comunidadEncontrada = comunidad.find(data => data.value === muni);
    return comunidadEncontrada ? comunidadEncontrada.label : [];
  }