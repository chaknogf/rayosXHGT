import { vecindad, municipio } from "@/models/direccion";

export function obtenerVecindad(municipio: number): string {
    const municipioEncontrado = vecindad.find(v => v.value === municipio);
    return municipioEncontrado ? municipioEncontrado.label : '';
}

export function obtenerMuni(municipio: number): string {
    const municipioEncontrado = municipio.find(m => m.value === municipio);
    return municipioEncontrado ? municipioEncontrado.label : '';
}

