import React, { useState } from "react";
import PacienteTable from "./pacientes";
import CustomForm from "@/components/formularioData/formularioData";
import "@/components/formularioData/formularioData.css";

interface UserFormValues {
  nombre?: string;
  apellido?: string;
  email: string;
  password: string;
  fecha: Date;
  estado: string;
}

const PacienteForm: React.FC = () => {
  const initialValues: UserFormValues = {
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    fecha: new Date(),
    estado: "v",
  };

  const fields = [
    { inputName: "nombre", label: "Nombre", type: "text" },
    { inputName: "apellido", label: "apellido" },
    { inputName: "mail", label: "mail", type: "email" },
    { inputName: "password", label: "password", type: "password" },
    { inputName: "fecha", label: "fecha", type: "date" },
    { inputName: "estado", label: "Estado", type: "radio", options: [{ label: "Activo", value: 1 }, { label: "Inactivo", value: 0 }] },    
    
  ];

  const handleSubmit = (values: UserFormValues) => {
    console.log("Form submitted:", values);
  };

  const [showTable, setShowTable] = useState(false);

  const handleBack = () => {
    setShowTable(true);
  };

  const renderButtons = () => [
    <button type="button" className="btn mt-2" key="submit">Submit</button>,
    
    <button type="button" className="btn mt-2" key="cancel" onClick={handleBack}>Back</button>,
  ];

  

  return (
    <>
      {showTable ? (
        <PacienteTable />
      ) : (
        <div>
          <CustomForm<UserFormValues>
            initialValues={initialValues}
            
            funcButton={handleSubmit}
            fields={fields}
            title="Registro de Pacientes"
            className=""
            renderButtons={renderButtons}
            useFlex={false}
          />
        </div>
      )}
    </>
  );
};

export default PacienteForm;
