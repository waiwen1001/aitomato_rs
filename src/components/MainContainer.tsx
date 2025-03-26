import { ReactNode } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

interface Props {
  title?: string;
  children?: ReactNode;
  rightButton?: ReactNode;
  hideBack?: boolean;
}

const MainContainer = ({
  title,
  rightButton,
  children,
  hideBack = false,
}: Props) => {
  const navigate = useNavigate();

  return (
    <div className="relative min-w-full min-h-full bg-slate-100">
      {hideBack == false && (
        <header className="fixed top-0 left-0 w-full items-center flex bg-white z-10 border-b border-gray-300 h-16">
          <button
            onClick={() => navigate(-1)}
            className="m-3 p-3 shadow rounded-md border border-gray-300 focus:bg-gray-200 active:bg-gray-200"
          >
            <IoArrowBackOutline />
          </button>
          <h3 className="text-xl font-semibold text-orange-500 text-center flex-1">
            {title}
          </h3>
          {rightButton ? rightButton : <div className="w-[66px]"></div>}
        </header>
      )}

      <div className={`w-full h-full ${hideBack == false && "pt-16"}`}>
        {children}
      </div>
    </div>
  );
};

export default MainContainer;
