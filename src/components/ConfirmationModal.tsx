import { GoInfo } from "react-icons/go";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText,
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-99">
      <div className="fixed inset-0 w-full h-full bg-gray-700 opacity-75"></div>
      <div className="flex flex-col items-center bg-white rounded-lg p-6 shadow-lg w-96 z-1 m-3">
        <div className="flex justify-center">
          <GoInfo size={60} color="#777" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mt-3">{title}</h2>
        <p className="text-gray-600 mt-2 text-center">{message}</p>
        <div className="flex justify-end mt-4 space-x-3">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            {confirmText}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
