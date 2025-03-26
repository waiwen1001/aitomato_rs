import { useEffect } from "react";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-fade-in">
      <div
        className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg ${
          type === "success" ? "bg-green-500" : "bg-red-500"
        } text-white`}
      >
        {type === "success" ? (
          <IoCheckmarkCircle size={20} />
        ) : (
          <IoCloseCircle size={20} />
        )}
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
