import { useNavigate } from "react-router-dom";
import MainContainer from "../components/MainContainer";
import ConfirmationModal from "../components/ConfirmationModal";
import { useEffect, useState, useRef } from "react";
import { format } from "date-fns";
import { useAppSelector } from "../hooks/redux";
import { usePusher } from "../hooks/usePusher";
import pusher from "../services/pusher";
const WaitingQueue = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const timerRef = useRef<HTMLParagraphElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const { queueInfo } = useAppSelector((state) => state.queue);
  const { data: outlet } = useAppSelector((state) => state.outlet);

  useEffect(() => {
    if (!queueInfo || !outlet) {
      navigate("/");
    }
  }, [queueInfo, outlet, navigate]);

  const showMenu = () => {
    navigate("/menu");
  };

  const cancelQueue = () => {
    setIsModalOpen(true);
    console.log("cancel queue");
  };

  const handleConfirm = () => {
    navigate("/");
  };

  const updateTimer = () => {
    const now = new Date();
    if (timerRef.current) {
      timerRef.current.innerText = format(now, "yyyy MMM dd hh:mm a");
    }
  };

  useEffect(() => {
    if (timerRef.current) {
      updateTimer();
    }

    intervalRef.current = setInterval(updateTimer, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  if (!queueInfo || !outlet) {
    return null;
  }

  usePusher({
    channelName: `queue-${queueInfo.queue.id}`,
    eventName: "queue-updated",
    callback: (data) => {
      console.log(data);
    },
  });

  return (
    <MainContainer hideBack={true}>
      <div className="p-3 h-full">
        <div className="text-sm text-right font-mono">
          <p ref={timerRef}></p>
        </div>
        <div className="text-center py-3">
          <h3 className="text-3xl text-orange-500 font-semibold">Ai-Tomato</h3>
          <h3 className="text-xl mt-2">{outlet?.restaurant.name}</h3>
        </div>
        <div className="mt-4 h-full">
          <div className="flex flex-col items-center justify-around border-dashed border-2 bg-sky-100 rounded-xl p-4 h-[40%]">
            <div className="text-sky-800 font-semibold">Queue Number</div>
            <div className="w-[30%] h-[2px] bg-gray-400 my-3"></div>
            <div className="text-[70px] leading-none tracking-wider font-bold text-green-700">
              {queueInfo.queue.queueNumber}
            </div>
            <div className="w-[30%] h-[2px] bg-gray-400 my-3"></div>
            <div className="text-sm">
              <div className="flex items-center gap-2">
                <p className="text-xs">Estimated Wait Time :</p>
                <span className="text-lg font-semibold">15 Minutes</span>
              </div>
              {queueInfo.queue.phoneNumber && (
                <div className="mt-1 flex items-center gap-2">
                  <p className="text-xs">Phone:</p>
                  <span className="text-lg font-semibold">
                    {queueInfo.queue.phoneNumber}
                  </span>
                </div>
              )}
              <div className="mt-1 flex items-center gap-2">
                <p className="text-xs">Pax:</p>
                <span className="text-lg font-semibold">
                  {queueInfo.queue.pax}
                </span>
              </div>
            </div>
          </div>

          <div className="flex mt-6">
            <div className="flex-1 flex flex-col items-center">
              <div className="text-2xl font-semibold">
                {queueInfo.servingQueue}
              </div>
              <div className="text-sm">Now Serving</div>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <div className="text-2xl font-semibold">
                {queueInfo.aheadGroup}
              </div>
              <div className="text-sm">Group Ahead</div>
            </div>
          </div>

          <div className="w-full flex flex-col mt-6">
            <button
              onClick={showMenu}
              className="p-2 rounded-md flex-1 bg-sky-700 text-white font-semibold"
            >
              Browse Menu
            </button>
            <button
              onClick={cancelQueue}
              className="text-sm mt-3 underline text-red-600 font-semibold"
            >
              Cancel Queue
            </button>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        title="Cancel Queue"
        message="Are you sure you want to cancel your queue?"
        confirmText="Yes, Cancel Queue"
        cancelText="No, Go Back"
      />
    </MainContainer>
  );
};

export default WaitingQueue;
