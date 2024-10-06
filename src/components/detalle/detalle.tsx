import "@/components/detalle/detalle.css";

interface Button {
  label: string;
  onClick: () => void;
}

interface RegistroDetalle<T> {
  label?: string;
  key?: keyof T;
  render?: (data: T) => React.ReactNode;
  className?: string;
  iconReact?: string;
  buttons?: Button[];
}

const DetalleCard = () => {
  return (
    <>
      <div className="container">
        <div data-text="Expediente:" className="glass"></div>
      </div>
    </>
  );
};

export default DetalleCard;
