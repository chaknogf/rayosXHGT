
import { UrlApi } from "./api";
const API = UrlApi;


interface Paciente {
    id: number;
    nombre?: string;
    apellido?: string;
    nacimiento?: string;
    expediente: number;
    estado?: string;
    sexo?: string;
    direccion?: string;
    municipio?: number;
    departamento?: number;
    dpi?: string;
    telefono1?: string;
    telefono2?: string;
    telefono3?: string;
    email?: string;
    created_at?: string;
    updated_at?: string;
    lugar_nacimiento?: string;
    nacionalidad?: string;
    estado_civil?: number;
    educacion?: number;
    pueblo?: number;
    idioma?: number;
    ocupacion?: string;
    padre?: string;
    madre?: string;
    conyugue?: string;
    defuncion?: string;
    tiempo_defuncion?: string;
    nacionalidad_iso?: string;

}

interface VistaPacientes {
    paciente_id: number;
    nombre?: string;
    apellido?: string;
    dpi?: string;
    pasaporte?: string;
    sexo?: string;
    nacimiento?: string;
    nacionalidad?: string;
    defuncion?: string;
    estado?: string;
    direccion?: string;
    municipio?: string;
    telefono1?: string;
    telefono2?: string;
    telefono3?: string;
    email?: string;
    expediente_id?: number;
    expediente?: string;
    hoja_emergencia?: string;
    referencia_anterior?: string;
    expediente_madre?: string;
    consulta_id?: number;
    exp_id?: number;
    historia_clinica?: string;
    fecha_consulta?: string;
    hora?: string;
    fecha_recepcion?: string;
    fecha_egreso?: string;
    tipo_consulta?: number;
    estatus?: number;
    created_at?: string;

}



// Servicio de ejemplo: api/pacientes.ts
export const getPacientes = async (): Promise<Paciente[]> => {
    const response = await fetch(`${API}/pacientes`);
    if (!response.ok) {
        throw new Error("Error al obtener los pacientes");
    }
    return await response.json();
    // console.table(response);
};

export const getPacientesVistas = async (): Promise<VistaPacientes[]> => {
    const response = await fetch(`${API}/pacientes`);
    if (!response.ok) {
        throw new Error("Error al obtener los pacientes");
    }
    return await response.json();
    // console.table(response);
};

export const consultarapida = async (paciente: number): Promise<VistaPacientes[]> => {
    try {
        const response = await fetch(`${API}/consultarapida/?paciente_id=${paciente}`);

        if (!response.ok) {
            throw new Error(`Error al obtener los pacientes: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        // console.table(data); 
        return data;
    } catch (error) {
        console.error("Error en consultarapida:", error);
        throw error; // Rethrow para que sea manejado por la función que lo llama
    }
};

export const getPacientes_id = async (filter: Record<string, any>): Promise<VistaPacientes[]> => {
    // Construir la URL base
    let url = `${API}/paciente_id`;  // Asumimos que el endpoint correcto es '/paciente_id'
    // Verificar y agregar parámetros dinámicos según los filtros
    const params = new URLSearchParams();
    if (filter.id) {  // Corregir el nombre del filtro a 'id'
        params.append("id", filter.id); // El primer parámetro no debe tener el signo de interrogación
    }
    if (filter.expediente) {
        params.append("expediente", filter.expediente);
    }
    if (filter.nombre) {
        params.append("nombre", filter.nombre);
    }
    if (filter.apellido) {
        params.append("apellido", filter.apellido);
    }
    if (filter.dpi) {
        params.append("dpi", filter.dpi);
    }
    if (filter.nacimiento) {
        params.append("nacimiento", filter.nacimiento);
    }
    if (filter.madre) {
        params.append("madre", filter.madre);
    }
    // Construir la URL final con los parámetros
    if (params.toString()) {
        url += `?${params.toString()}`;
    }
    // Realizar la petición
    const response = await fetch(url);
    // Manejar errores de la respuesta
    if (!response.ok) {
        throw new Error("Error al obtener los pacientes");
    }

    // Retornar los datos en formato JSON
    const data = await response.json();



    // Verificar si la respuesta es un arreglo
    if (Array.isArray(data)) {
        return data;
    } else {
        console.error("La respuesta no es un arreglo:", data);
        return []; // En caso de que no sea un arreglo, retornamos un arreglo vacío
    }
};

export const getPacienteData = async (id: number): Promise<Paciente | Paciente[]> => {
    const response = await fetch(`${API}/datapaciente/${id}`);

    if (!response.ok) {
        throw new Error("Error al obtener el paciente");
    }

    return await response.json();
};