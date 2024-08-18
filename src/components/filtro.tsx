import React, { useState } from 'react';
import '../style.css';

const FiltroPaciente = ({ pacientesData, setFiltroResultados }) => {
    const [filtroNombre, setFiltroNombre] = useState('');
    const [filtroApellido, setFiltroApellido] = useState('');
    const [filtroExpediente, setFiltroExpediente] = useState('');

    const handleFiltroNombre = (e) => {
        setFiltroNombre(e.target.value);
    };

    const handleFiltroApellido = (e) => {
        setFiltroApellido(e.target.value);
    };

    const handleFiltroExpediente = (e) => {
        setFiltroExpediente(e.target.value);
    };

    const filtrarDatos = () => {
        const resultadosFiltrados = pacientesData.filter((paciente) => {
            const nombreCoincide = paciente.nombre.toLowerCase().includes(filtroNombre.toLowerCase());
            const apellidoCoincide = paciente.apellido.toLowerCase().includes(filtroApellido.toLowerCase());
            const expedienteCoincide = paciente.expediente.toString().includes(filtroExpediente);
            return nombreCoincide && apellidoCoincide && expedienteCoincide;
        });
        setFiltroResultados(resultadosFiltrados);
    };

    return (
        <div className="filtro-container">
            <input type="text" placeholder="Nombre" value={filtroNombre} onChange={handleFiltroNombre} />
            <input type="text" placeholder="Apellido" value={filtroApellido} onChange={handleFiltroApellido} />
            <input type="text" placeholder="Expediente" value={filtroExpediente} onChange={handleFiltroExpediente} />
            <button onClick={filtrarDatos}>Filtrar</button>
        </div>
    );
};

export default FiltroPaciente;
