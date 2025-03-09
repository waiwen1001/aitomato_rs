import { ReactNode } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

interface Props {
  children?: ReactNode,
  hideBack?: boolean,
}

const MainContainer = ({ children, hideBack = false }: Props) => {
  const navigate = useNavigate();

  console.log(hideBack);

  return (
    <div className="relative w-full h-full bg-slate-100">
      {hideBack == false && (
        <header className="fixed top-0 left-0">
          <button onClick={() => navigate(-1)} className="m-3 p-3 shadow rounded-md border border-gray-300 focus:bg-gray-200 active:bg-gray-200">
            <IoArrowBackOutline />
          </button>
          
        </header>
      )}
      
      <div className={`w-full h-full ${hideBack == false && "pt-15"}`}>{ children }</div>
    </div>
  )
}

export default MainContainer