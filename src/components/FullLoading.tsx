import { AiOutlineLoading3Quarters } from "react-icons/ai";

const FullLoading = () => {
  return (
    <div className="fixed left-0 top-0 bg-slate-100 flex items-center justify-center w-full h-full opacity-75 z-99">
      <div className="animate-spin">
        <AiOutlineLoading3Quarters size={60} />
      </div>
    </div>
  )
}

export default FullLoading;