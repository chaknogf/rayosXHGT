import React from "react";
import ReusForm from "@/components/reusForm";

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
    { name: "firstName", label: "First Name", type: "text", className: "input-class" },
    { name: "lastName", label: "Last Name", type: "text", className: "input-class" },
    { name: "email", label: "Email", type: "email", className: "input-class" },
    { name: "password", label: "Password", type: "password", className: "input-class" },
  ];

  const handleSubmit = (values: UserFormValues) => {
    console.log("Form submitted:", values);
  };

  return (
    <ReusForm<PacienteFormValues>
      initialValues={initialValues}
      onSubmit={handleSubmit}
      fields={fields}
      className="form-class"
    />
  );
};

export default PacienteForm;
