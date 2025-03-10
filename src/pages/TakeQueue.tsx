import { useNavigate, Link } from "react-router-dom";
import MainContainer from "../components/MainContainer";
import PhoneInput from "../components/PhoneInput";

const TakeQueue = () => {
  const navigate = useNavigate();

  const handleConfirm = (phone: string) => {
    navigate("/take-queue-people", { state: { phone } });
  };

  return (
    <MainContainer>
      <div className="flex flex-col justify-center p-5">
        <h3 className="mb-3">Enter Your Phone Number</h3>
        <PhoneInput onConfirm={handleConfirm} />
        <Link to="/take-queue-people" className="text-sm text-center mt-3">
          [ Continue Without Phone Number ]
        </Link>
      </div>
    </MainContainer>
  );
};

export default TakeQueue;
