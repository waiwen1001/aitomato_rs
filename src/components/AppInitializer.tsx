import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchOutlet } from "../store/outletSlice";
import { AppDispatch } from "../store/store";
import { fetchQueue } from "../store/queueSlice";
import FullLoading from "./FullLoading";
import socketService from "../services/socketService";
import { QueueStatus } from "../types/queue";
import { useNavigate } from "react-router-dom";

const AppInitializer = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isInitialized, setIsInitialized] = useState(false);

  const initializeApp = async () => {
    try {
      const uuid = import.meta.env.VITE_API_OUTLET_UUID;
      dispatch(fetchOutlet(uuid));

      // Initialize Socket.IO
      socketService.initialize();
      setIsInitialized(true);

      // Check and fetch current queue
      const queueId = localStorage.getItem("queueId");
      if (queueId) {
        const response = await dispatch(fetchQueue(queueId)).unwrap();
        if (response.data.queue.status === QueueStatus.PROCESSING) {
          navigate("/processing");
          return;
        } else if (response.data.queue.status === QueueStatus.PENDING) {
          navigate("/waiting");
          return;
        }

        localStorage.setItem("queueId", ""); // if queue status is not pending or processing, remove queueId from localStorage
      }
    } catch (error) {
      console.error("Initialization failed:", error);
      setIsInitialized(true);
    }
  };

  useEffect(() => {
    initializeApp();

    // Cleanup function to disconnect socket when component unmounts
    return () => {
      socketService.disconnect();
    };
  }, []);

  if (!isInitialized) {
    return <FullLoading />;
  }

  return <>{children}</>;
};

export default AppInitializer;
