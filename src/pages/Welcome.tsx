import { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import FullLoading from "../components/FullLoading";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchRestaurant } from "../store/restaurantSlice";

const Welcome = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data: restaurant, loading, error } = useAppSelector((state) => state.restaurant);

  useEffect(() => {
    if (id) {
      console.log(id)
      dispatch(fetchRestaurant(id)).unwrap().catch(() => {
        navigate("/not-found");
      });
    }
  }, [id, dispatch, navigate]);

  useEffect(() => {
    if (error) {
      navigate("/not-found");
    }
  }, [error, navigate]);

  if (loading) {
    return <FullLoading />;
  }

  if (!restaurant) {
    return null;
  }

  return (
    <Link to="/take-queue" state={{ restaurantId: id }}>
      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-around items-center bg-slate-100">
        <div className="text-center">
          <h1 className="mb-1 text-orange-500 font-semibold">Welcome</h1>
          <h1 className="mb-1 text-orange-500 font-semibold">To</h1>
          <h1 className="text-orange-500 font-semibold">{restaurant.name || "AI-Tomato"}</h1>
        </div>
        <p className="mt-5 text-sky-600">[ Click Here To Get Queue ]</p>
      </div>
    </Link>
  );
};

export default Welcome;