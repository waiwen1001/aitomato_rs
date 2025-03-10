import { AiOutlineLoading3Quarters } from "react-icons/ai";

const ComponentLoading = () => {
  return (
    <div className="flex items-center justify-center h-full my-2">
      <div className="animate-spin">
        <AiOutlineLoading3Quarters size={40} />
      </div>
    </div>
  );
};

export default ComponentLoading;
