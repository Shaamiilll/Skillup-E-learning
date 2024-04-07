import { useState } from "react";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function Modal({ isVisible, onClose, children }: ModalProps) {
  if (!isVisible) return null;

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-[600px] flex flex-col bg-white p-4 rounded-lg">
        <button className="text-white text-xl place-self-end" onClick={handleClose}>
          X
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
