import React, { useState } from "react";
import PacienteTable from "./pacientes";
import CustomForm from "@/components/formularioData/CustomForm";
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
    {
      inputName: "estado",
      label: "Estado",
      type: "radio",
      options: [
        { label: "Vivo", value: "v" },
        { label: "Fallecido", value: "m" },
      ],
    },
    {
      inputName: "servicio",
      label: "Servicio",
      type: "select",
      options: [
        { label: "coex", value: 1 },
        { label: "emergencia", value: 2 },
        { label: "hospitalizacion", value: 3 },
      ],
    },
    {
      inputName: "intereses",
      label: "Intereses",
      type: "checkbox",
      options: [
        { label: "Deportes", value: "deportes" },
        { label: "Música", value: "musica" },
        { label: "Viajes", value: "viajes" },
        { label: "Compras", value: "compras" },
      ],
    },
    { inputName: "edad", label: "Edad", type: "number" },
    { inputName: "libras", label: "lb", type: "number", className: "w-input" },
    { inputName: "onzas", label: "oz", type: "number", className: "w-input" },
  ];

  const handleSubmit = (values: UserFormValues) => {
    console.log("Form submitted:", values);
  };

  const [showTable, setShowTable] = useState(false);

  const handleBack = () => {
    setShowTable(true);
  };

  const renderButtons = () => [
    <button type="button" className="btn mt-2" key="submit">
      Submit
    </button>,

    <button
      type="button"
      className="btn mt-2"
      key="cancel"
      onClick={handleBack}
    >
      Back
    </button>,
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
