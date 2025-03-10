import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchOutlet } from "../store/outletSlice";
import { AppDispatch } from "../store/store";
import { fetchQueue } from "../store/queueSlice";
import FullLoading from "./FullLoading";

const AppInitializer = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isInitialized, setIsInitialized] = useState(false);

  const initializeApp = async () => {
    try {
      const uuid = import.meta.env.VITE_API_OUTLET_UUID;
      dispatch(fetchOutlet(uuid));

      // check current queue
      const queueId = localStorage.getItem("queueId");
      if (queueId) {
        dispatch(fetchQueue(queueId));
      }
      setIsInitialized(true);
    } catch (error) {
      console.error("Initialization failed:", error);
      setIsInitialized(true);
    }
  };

  useEffect(() => {
    initializeApp();
  }, []);

  if (!isInitialized) {
    return <FullLoading />;
  }

  return <>{children}</>;
};

export default AppInitializer;
