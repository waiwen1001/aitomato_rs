import { useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainContainer from "../components/MainContainer";
import CurrentQueue from "../components/CurrentQueue";
import FullLoading from "../components/FullLoading";
import PaxInput from "../components/PaxInput";

const TakeQueuePeople = () => {
  const maxPax = 6;
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const phone = location.state?.phone;

  const handlePaxConfirm = useCallback((pax: number) => {
    if(pax < 1 || pax > maxPax) {
      return;
    }

    setLoading(true);
    // send API
    navigate("/waiting", {state: { phone, pax }});
  }, [maxPax, navigate, phone]);

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