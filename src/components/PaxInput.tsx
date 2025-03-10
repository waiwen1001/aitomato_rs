import { memo, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface PaxInputContainerProps {
  maxPax: number;
  onPaxConfirm: (pax: number) => void;
}

const PaxInputContainer = ({
  maxPax,
  onPaxConfirm,
}: PaxInputContainerProps) => {
  const [pax, setPax] = useState(1);

  const increasePax = () => {
    if (pax < maxPax) {
      setPax(pax + 1);
    }
  };

  const decreasePax = () => {
    if (pax > 1) {
      setPax(pax - 1);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex mt-3 items-center">
        <div className="flex-1 flex justify-center">
          <button
            onClick={decreasePax}
            disabled={pax === 1}
            className={`p-2 rounded-xl border text-white font-bold border-red-800 bg-red-700 focus:bg-red-800 active:bg-red-800 ${
              pax === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <AiOutlineMinus color="white" size={30} />
          </button>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="text-2xl">{pax}</div>
        </div>
        <div className="flex-1 flex justify-center">
          <button
            onClick={increasePax}
            disabled={pax === maxPax}
            className={`p-2 rounded-xl border text-white font-bold border-green-800 bg-green-700 focus:bg-green-800 active:bg-green-800 ${
              pax === maxPax ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <AiOutlinePlus color="white" size={30} />
          </button>
        </div>
      </div>
      <div className="w-full flex mt-6">
        <button
          onClick={() => onPaxConfirm(pax)}
          className="flex-1 bg-green-600 text-white rounded-md p-2 font-semibold shadow-md hover:bg-green-700 active:bg-green-700"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default memo(PaxInputContainer);
