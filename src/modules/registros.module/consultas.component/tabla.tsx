import React from 'react';

interface Consulta {
    id: number;
    expediente: number;
    nombres: string;
    apellidos: string;
    hoja: string;
    fecha_consulta: string;
    hora: string;
    fecha_egreso: string;
    especialidad: number;
    servicio: number;
    tipo_consulta: number;
    status: number;
    sexo?: string; // Opcional, según tu código
}

const consulta: Consulta[] = [
    { 
        id: 0, 
        expediente: 25463, 
        nombres: 'juanito', 
        apellidos: 'mercadito', 
        hoja: '145632', 
        fecha_consulta: '2024-03-25', 
        hora: '14:52', 
        fecha_egreso: '2024-03-26', 
        especialidad: 1, 
        servicio: 2, 
        tipo_consulta: 2, 
        status: 2  
    }
];

const Consultas: React.FC = () => {
    return (
        <section>
            <div className="table mt-1">
                <table className="table table-hover table-black font-monospace">
                    <thead>
                        <tr>
                            <th className="text-center">Opciones</th>
                            <th className="text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="16" height="16">
                                    <path d="M10.25 2a8.25 8.25 0 0 1 6.34 13.53l5.69 5.69a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215l-5.69-5.69A8.25 8.25 0 1 1 10.25 2ZM3.5 10.25a6.75 6.75 0 1 0 13.5 0 6.75 6.75 0 0 0-13.5 0Z"></path>
                                </svg>ID
                            </th>
                            <th className="text-center bg-aqua">Historia Clinica</th>
                            <th className="text-center">Paciente</th>
                            <th className="text-center">Fecha de Registros</th>
                            <th className="text-center">Servicio</th>
                            <th className="text-center">Tipo</th>
                            <th className="text-center">Status</th>
                        </tr>
                    </thead>

                    <tbody className="justify-content-center opacity-90">
                        {consulta.map((item) => (
                            <tr key={item.id}>
                                <td className="text-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#39cbfb" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                                    </svg>
                                </td>
                                <td className="text-center font-weight-bold text-warning k h5">{item.id}</td>
                                <td className="text-center bg-aqua font-ubuntu">
                                    <span className="me-1 font-title1">Expediente: </span>{item.expediente}<br />
                                    <span className="me-1 font-title1">Hoja Emergencia: </span>{item.hoja}
                                </td>
                                <td className="text-center">
                                    <span className={`mujer: ${item.sexo === 'F'}, hombre: ${item.sexo !== 'F'}`}>{item.nombres}</span><br />{item.apellidos}
                                </td>
                                <td className="text-center">
                                    <span className="me-1 font-title1">Ingreso: </span>{item.fecha_consulta}<br />
                                    <span className="me-1 font-title1">Hora Ingreso: </span>{item.hora}<br />
                                    <span className="me-1 font-title1">Egreso: </span>{item.fecha_egreso}<br />
                                    {item.tipo_consulta === 2 && (
                                        <p><span className="me-1 font-title">Estancia: </span>{item.fecha_consulta}</p>
                                    )}
                                </td>
                                <td className="text-center">
                                    <span className="font-title1">{item.especialidad}: </span><br />{item.servicio}
                                </td>
                                <td className="text-center">{item.tipo_consulta}</td>
                                <td className="text-center">{item.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default Consultas;
