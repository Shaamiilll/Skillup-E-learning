
interface ModalProps {
  isVisible: boolean;
  onClose: () => void; // onClose function type
}

function Modal({ isVisible, onClose }: ModalProps) {
  if (!isVisible) return null;

  const handleClose = () => {
    onClose(); // Call onClose function when the close button is clicked
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-[600px] flex flex-col">
        <button className="text-white text-xl place-self-end" onClick={handleClose}>
          x
        </button>
        <div className="bg-white p-2 rounded-lg">Modal</div>
      </div>
    </div>
  );
}

export default Modal;
