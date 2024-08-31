import React, { useState } from "react";
import PacienteTable from "./pacientes";
import CustomForm from "@/components/formularioData/formularioData";
import "@/components/formularioData/formularioData.css";

interface UserFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const PacienteForm: React.FC = () => {
  const initialValues: UserFormValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const fields = [
    { name: "firstName", label: "First Name", type: "text", className: "flex"},
    { name: "lastName", label: "Last Name", type: "text", className: "flex" },
    { name: "email", label: "Email", type: "email", className: "input-class" },
    { name: "password", label: "Password", type: "password", className: "input-class" },
  ];

  const handleSubmit = (values: UserFormValues) => {
    console.log("Form submitted:", values);
  };

  const [showTable, setShowTable] = useState(false);

  const handleBack = () => {
    setShowTable(true);
  };

  const renderButtons = (values: UserFormValues) => [
    <button type="submit" className="submit" key="submit">Submit</button>,
    
    <button type="button" className="gap-2 bg-light" key="cancel" onClick={handleBack}>Back</button>,
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
            message="Complete los campos a continuación"
            className="form"
            renderButtons={renderButtons}
            useFlex={true}
          />
        </div>
      )}
    </>
  );
};

export default PacienteForm;
