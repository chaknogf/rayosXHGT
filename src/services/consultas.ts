import { UrlApi } from "./api";

const API = UrlApi;


interface Consultas {
    id: number;
    exp_id?: number;
    paciente_id: number;
    historia_clinica?: string;
    fecha_consulta?: string;
    hora?: string;
    fecha_recepcion?: string;
    fecha_egreso?: string;
    tipo_consulta?: number;
    tipo_lesion?: number;
    estancia?: number;
    especialidad?: number;
    servicio?: number;
    fallecido?: string;
    referido?: string;
    contraindicado?: string;
    diagnostico?: string;
    folios?: number;
    medico?: number;
    nota?: string;
    estatus?: number;
    lactancia?: string;
    prenatal?: number;
    create_user?: string;
    update_user?: string;
    created_at?: string;
    updated_at?: string;
    grupo_edad?: number;

}

interface ConsultaRapida {
    id: number;
    exp_id?: number;
    paciente_id: number;
    historia_clinica?: string;
    fecha_consulta?: string;
    hora?: string;
    fecha_egreso?: string;
    tipo_consulta?: number;
    estatus?: number;
    created_at?: string;


}



// Servicio de ejemplo: api/pacientes.ts
export const getConsultas = async (): Promise<Consultas[]> => {
    const response = await fetch(`${API}/consultasALL`);
    if (!response.ok) {
        throw new Error("Error al obtener los pacientes");
    }
    return await response.json();
    console.table(response);
};

export const getConsultasId = async (id: number): Promise<Consultas[]> => {
    try {
        const response = await fetch(`${API}/consultasID?id=${id}`);

        if (!response.ok) {
            throw new Error("Error al obtener las consultas");
        }

        const data = await response.json(); // Parsear la respuesta JSON
        console.table(data); // Depuración: Mostrar la data en formato tabla en la consola

        return data; // Devolver los datos
    } catch (error) {
        console.error("Hubo un problema al obtener las consultas:", error);
        throw error; // Lanza el error para que pueda ser manejado externamente
    }
};

export const getConsultasPaciente = async (paciente_id: number): Promise<ConsultaRapida[]> => {
    try {
        const response = await fetch(`${API}/consultarapida?id=${paciente_id}`);

        if (!response.ok) {
            throw new Error("Error al obtener las consultas");
        }

        const data = await response.json(); // Parsear la respuesta JSON
        console.table(data); // Depuración: Mostrar la data en formato tabla en la consola

        return data; // Devolver los datos
    } catch (error) {
        console.error("Hubo un problema al obtener las consultas:", error);
        throw error; // Lanza el error para que pueda ser manejado externamente
    }
};

// export async function getPacienteById(id: number) {
//     return (`${API}/paciente_id/?${id}`);
// }

// export async function crearPaciente(data: Partial<Paciente>): Promise<Paciente> {
//     return fetchData<Paciente>("/pacientes", {
//         method: "POST",
//         body: JSON.stringify(data),
//     });
// }

// export async function actualizarPaciente(
//     id: number,
//     data: Partial<Paciente>
// ): Promise<Paciente> {
//     return fetchData<Paciente>(`/pacientes/${id}`, {
//         method: "PUT",
//         body: JSON.stringify(data),
//     });
// }

// export async function eliminarPaciente(id: number): Promise<void> {
//     return fetchData<void>(`/pacientes/${id}`, {
//         method: "DELETE",
//     });
// }