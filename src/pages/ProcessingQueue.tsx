import { useEffect, useState } from "react";
import MainContainer from "../components/MainContainer";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchLayouts } from "../store/layoutSlice";
import { Layout } from "../types/outlet";
import LayoutLandscape from "../components/LayoutLandscape";

const ProcessingQueue = () => {
  const { queueInfo } = useAppSelector((state) => state.queue);
  const dispatch = useAppDispatch();

  const [layouts, setLayouts] = useState<Layout[]>([]);

  useEffect(() => {
    if (queueInfo) {
      getLayouts();
    }
  }, [queueInfo]);

  const getLayouts = async () => {
    try {
      const layouts = await dispatch(
        fetchLayouts(queueInfo!.queue.outletId)
      ).unwrap();
      setLayouts(layouts);
    } catch (error) {
      console.error("Failed to fetch layouts:", error);
    }
  };

  if (!queueInfo) {
    return null;
  }

  return (
    <MainContainer hideBack={true}>
      <LayoutLandscape layouts={layouts} />
    </MainContainer>
  );
};

export default ProcessingQueue;
