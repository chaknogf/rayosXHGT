

const API = "http://192.168.0.44:8000";


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
    console.table(response);
};

export const getPacientesVistas = async (): Promise<VistaPacientes[]> => {
    const response = await fetch(`${API}/pacientes`);
    if (!response.ok) {
        throw new Error("Error al obtener los pacientes");
    }
    return await response.json();
    console.table(response);
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