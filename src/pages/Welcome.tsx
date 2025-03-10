import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";

const Welcome = () => {
  const { data: outlet } = useAppSelector((state) => state.outlet);

  if (!outlet) {
    return null;
  }

  return (
    <Link to="/take-queue">
      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-around items-center bg-slate-100">
        <div className="text-center">
          <h1 className="mb-1 text-orange-500 font-semibold">Welcome</h1>
          <h1 className="mb-1 text-orange-500 font-semibold">To</h1>
          <h1 className="text-orange-500 font-semibold">
            {outlet.restaurant.name || "AI-Tomato"}
          </h1>
        </div>
        <p className="mt-5 text-sky-600">[ Click Here To Get Queue ]</p>
      </div>
    </Link>
  );
};

export default Welcome;
