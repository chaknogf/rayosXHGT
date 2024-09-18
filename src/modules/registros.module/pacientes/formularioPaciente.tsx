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
}

const PacienteForm: React.FC = () => {
  const initialValues: UserFormValues = {
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    fecha: new Date(),
  };

  const fields = [
    { input: "nombre", label: "Nombre", type: "text" },
    { input: "apellido", label: "apellido" },
    { input: "mail", label: "mail", type: "email" },
    { password: "password", label: "password", type: "password" },
    { fecha: "fecha", label: "fecha", type: "date"}
    
    
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
