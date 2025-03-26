import { useEffect, useState } from "react";
import MainContainer from "../components/MainContainer";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchTables } from "../store/tableSlice";
import { Table } from "../types/outlet";
import TableLayout from "../components/TableLayout";

const ProcessingQueue = () => {
  const { queueInfo } = useAppSelector((state) => state.queue);
  const dispatch = useAppDispatch();

  const [tables, setTables] = useState<Table[]>([]);

  useEffect(() => {
    if (queueInfo) {
      getTables();
    }
  }, [queueInfo]);

  const getTables = async () => {
    try {
      const tables = await dispatch(
        fetchTables(queueInfo!.queue.outletId)
      ).unwrap();
      setTables(tables);
    } catch (error) {
      console.error("Failed to fetch tables:", error);
    }
  };

  if (!queueInfo) {
    return null;
  }

  return (
    <MainContainer hideBack={true}>
      <TableLayout tables={tables} />
    </MainContainer>
  );
};

export default ProcessingQueue;
