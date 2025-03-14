import { useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import MainContainer from "../components/MainContainer";
import CurrentQueue from "../components/CurrentQueue";
import FullLoading from "../components/FullLoading";
import PaxInput from "../components/PaxInput";
import { createQueue } from "../store/queueSlice";
import { useAppSelector } from "../hooks/redux";
import { QueueStatus } from "../types/queue";

const TakeQueuePeople = () => {
  const maxPax = 6;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const phone = location.state?.phone || "";

  // Get outletId from Redux store
  const { outletId } = useAppSelector((state) => state.outlet);

  const handlePaxConfirm = useCallback(
    async (pax: number) => {
      if (pax < 1 || pax > maxPax) {
        return;
      }

      if (!outletId) {
        console.error("No outlet selected");
        return;
      }

      setLoading(true);
      try {
        const response = await dispatch(
          createQueue({
            outletId,
            pax,
            phoneNumber: phone,
          })
        ).unwrap();

        setLoading(false);
        if (response.data.queue.status === QueueStatus.PROCESSING) {
          navigate("/processing");
          return;
        }

        navigate("/waiting");
      } catch (error) {
        console.error("Failed to create queue:", error);
        setLoading(false);
      }
    },
    [maxPax, navigate, phone, outletId, dispatch]
  );

  return (
    <MainContainer>
      <div className="flex flex-col w-full h-full p-3">
        <h3 className="text-2xl mt-3 text-center">No of Pax</h3>
        <PaxInput maxPax={maxPax} onPaxConfirm={handlePaxConfirm} />
        <div className="mt-6">
          <CurrentQueue />
        </div>
      </div>
      {loading && <FullLoading />}
    </MainContainer>
  );
};

export default TakeQueuePeople;
