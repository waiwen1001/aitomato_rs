import { memo, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoBackspaceOutline } from "react-icons/io5";

interface PhoneInputProps {
  onConfirm: (phone: string) => void;
}

const PhoneInput = ({ onConfirm }: PhoneInputProps) => {
  const [phone, setPhone] = useState("");
  const numpad = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  const handleClick = (value: string) => {
    setPhone((prev) =>
      value === "backspace" ? prev.slice(0, -1) : prev + value
    );
  };

  return (
    <>
      <div className="flex flex-row items-center border border-slate-300 rounded p-3">
        <input
          type="text"
          className="focus:outline-hidden flex-1 text-2xl tracking-wider"
          readOnly
          value={phone}
        />
        {phone && (
          <button onClick={() => setPhone("")} className="ml-2">
            <AiOutlineClose />
          </button>
        )}
      </div>
      <div className="grid grid-cols-3 gap-2 w-full py-2">
        {numpad.map((num) => (
          <button
            key={num}
            onClick={() => handleClick(num)}
            className="p-3 text-xl border border-gray-300 rounded bg-gray-100 shadow-md hover:bg-gray-200 active:bg-gray-200"
          >
            {num}
          </button>
        ))}

        <button
          onClick={() => handleClick("backspace")}
          className="p-3 text-xl border border-gray-300 rounded bg-gray-100 shadow-md hover:bg-red-100 active:bg-red-100 flex justify-center"
        >
          <IoBackspaceOutline size={30} color="red" />
        </button>

        <button
          onClick={() => handleClick("0")}
          className="p-3 text-xl border border-gray-300 rounded bg-gray-100 shadow-md hover:bg-gray-200 active:bg-gray-200 col-span-2"
        >
          0
        </button>

        <button
          disabled={phone.length < 8}
          onClick={() => onConfirm(phone)}
          className="p-2 mt-3 text-xl rounded bg-green-600 text-white shadow-md hover:bg-green-700 active:bg-green-700 col-span-3 disabled:opacity-50"
        >
          Confirm
        </button>
      </div>
    </>
  );
};

export default memo(PhoneInput);
