import React, { useState } from "react";
import PacienteTable from "./pacientes";
import CustomForm from "@/components/formularioData/formularioData";
import "@/components/formularioData/formularioData.css";

interface UserFormValues {
  firstName?: string;
  lastName?: string;
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
    
   
    { name: "email", label: "Email", type: "", className: "input-class" },
    { name: "password", label: "Password", type: "password", className: "input-class" },
  ];

  const handleSubmit = (values: UserFormValues) => {
    console.log("Form submitted:", values);
  };

  const [showTable, setShowTable] = useState(false);

  const handleBack = () => {
    setShowTable(true);
  };

  const renderButtons = () => [
    <button type="submit" className="submit" key="submit">Submit</button>,
    
    <button type="button" className="gap-2 bg-info" key="cancel" onClick={handleBack}>Back</button>,
  ];

  const renderNombres = () => (
    <div className="flex-div">
      <label>
        <input className="input" type="text" placeholder="" required />
        <span>Firstname</span>
      </label>
      <label>
        <input className="input" type="text" placeholder="" required />
        <span className="label">Lastname</span>
      </label>
    </div>
  );


  return (
    <>
      {showTable ? (
        <PacienteTable />
      ) : (
        <div>
          <CustomForm<UserFormValues>
            initialValues={initialValues}
            renderInput={renderNombres}
            funcButton={handleSubmit}
            fields={fields}
            title="Registro de Pacientes"
            message="Complete los campos a continuación"
            
            renderButtons={renderButtons}
            useFlex={true}
          />
        </div>
      )}
    </>
  );
};

export default PacienteForm;
