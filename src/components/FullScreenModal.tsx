import { IoClose } from "react-icons/io5";
import { useEffect } from "react";

const FullScreenModal = ({
  isOpen,
  onClose,
  title,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex left-0 top-0 w-full h-full bg-slate-100">
      <div className="w-full max-w-md h-full flex flex-col">
        <header className="fixed top-0 left-0 w-full items-center flex bg-white z-10 border-b border-gray-300">
          <button
            onClick={onClose}
            className="m-3 p-3 shadow rounded-md border border-gray-300 focus:bg-gray-200 active:bg-gray-200"
          >
            <IoClose />
          </button>
          <h3 className="text-xl font-semibold text-orange-500 text-center flex-1 mr-[66px]">
            {title}
          </h3>
        </header>
        <div className="flex-1 overflow-y-auto pt-16">{children}</div>
      </div>
    </div>
  );
};

export default FullScreenModal;
