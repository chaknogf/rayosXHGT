import React from "react";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, children, className }) => {
  if (!show) return null;

  return (
    <div className={`modal-overlay ${className}`}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
