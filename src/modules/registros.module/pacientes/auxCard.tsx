import React, { useState } from "react";
import { NewPersonIcon } from "@/assets/icons/svg";
import PacienteForm from "./formularioPaciente";

const IconPaciente: React.FC = () => (
  <NewPersonIcon style={{ height: "1.2rem", width: "1.2rem" }} />
);

const AuxCard = () => {
  const [formNew, setFormNew] = useState(false);

  const handNewData = () => {
    setFormNew((prev) => !prev);
  };

  return (
    <div className="card-body-data">
      <div className="card-hea">
        <h2 className="card-title">Pacientes</h2>
        {/* <button className="close-btn-data">
          <CloseIcon />
        </button> */}

        <div className="bar-btns">
          <button onClick={handNewData} className="new-btn-data">
            <span className="span-btn">Nuevo</span>
            <IconPaciente />
          </button>
        </div>
      </div>
      <div className="card-body">
        {formNew && (
          <div className="form-paciente-view">
            <PacienteForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default AuxCard;
