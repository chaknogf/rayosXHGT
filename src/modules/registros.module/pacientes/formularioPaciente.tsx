import React, { useState } from "react";
import ReusForm from "@/components/reusForm";
import PacienteTable from "./pacientes";


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
    { name: "firstName", label: "First Name", type: "text", className: "bg-primary bg-opacity-75 text-uppercase m-0" },
    { name: "lastName", label: "Last Name", type: "text", className: "input-class" },
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

  return (
    <>
      {showTable ? (
        <PacienteTable />
      ) : (
        <div>
          <ReusForm<UserFormValues>
            initialValues={initialValues}
            onSubmit={handleSubmit}
            fields={fields}
            className="form-class"
          />
          <button onClick={handleBack}>Regresar</button>
        </div>
      )}
    </>
  );
};

export default PacienteForm;
