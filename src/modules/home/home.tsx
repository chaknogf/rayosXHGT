import React, { useState } from 'react';
import NavComponent from './nav'
import TablaPacientes from '../../components/tablaPacientes';

const Home: React.FC = () => {
    const [contenidoActual, setContenidoActual] = useState<JSX.Element | null>(null);

    const handlePacienteClick = () => {
        setContenidoActual(<TablaPacientes />);
    };
    const handleConsultasClick = () => {
        console.log("Consultas clicked");
    };

    const navItems = [
        { label: 'Paciente', onClick: handlePacienteClick },
        { label: 'Consultas', onClick: handleConsultasClick },
    ];

    return (
        <div>
            <NavComponent items={navItems} />
            {/* Aquí va el resto del contenido de tu página */}
            <div style={{ marginLeft: '220px', padding: '20px' }}>
                <h1>Contenido principal</h1>
            </div>
        </div>
    );
};

export default Home;
