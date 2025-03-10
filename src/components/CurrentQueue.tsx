import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchPendingQueue } from "../store/queueSlice";
import { useNavigate } from "react-router-dom";
import ComponentLoading from "./ComponentLoading";
import { QueueGroup } from "../types/queue";

const CurrentQueue = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    data: queues,
    loading,
    error,
  } = useAppSelector((state) => state.queue);
  const [queueGroups, setQueueGroups] = useState<QueueGroup[]>([
    { group: "1 - 2 pax", lastQueueNumber: "-", totalCount: 0 },
    { group: "3 - 4 pax", lastQueueNumber: "-", totalCount: 0 },
    { group: ">= 5 pax", lastQueueNumber: "-", totalCount: 0 },
  ]);

  useEffect(() => {
    dispatch(fetchPendingQueue())
      .unwrap()
      .catch(() => {
        navigate("/not-found");
      });
  }, [dispatch, navigate]);

  useEffect(() => {
    if (queues && queues.length > 0) {
      // Group queues by pax size
      const smallGroup = queues.filter((q) => q.pax <= 2);
      const mediumGroup = queues.filter((q) => q.pax >= 3 && q.pax <= 4);
      const largeGroup = queues.filter((q) => q.pax >= 5);

      // Create updated queue groups
      const updatedGroups: QueueGroup[] = [
        {
          group: "1 - 2 pax",
          lastQueueNumber:
            smallGroup.length > 0
              ? smallGroup[smallGroup.length - 1].queueNumber
              : "-",
          totalCount: smallGroup.length,
        },
        {
          group: "3 - 4 pax",
          lastQueueNumber:
            mediumGroup.length > 0
              ? mediumGroup[mediumGroup.length - 1].queueNumber
              : "-",
          totalCount: mediumGroup.length,
        },
        {
          group: ">= 5 pax",
          lastQueueNumber:
            largeGroup.length > 0
              ? largeGroup[largeGroup.length - 1].queueNumber
              : "-",
          totalCount: largeGroup.length,
        },
      ];

      setQueueGroups(updatedGroups);
    }
  }, [queues]);

  return (
    <div className="w-full">
      {loading ? (
        <ComponentLoading />
      ) : (
        <table className="w-full text-center border">
          <thead>
            <tr>
              <td className="p-2 bg-gray-100 font-semibold border">Pax</td>
              <td className="p-2 bg-gray-100 font-semibold border">
                Last Queue Number
              </td>
              <td className="p-2 bg-gray-100 font-semibold border">
                Total Count
              </td>
            </tr>
          </thead>
          <tbody>
            {queueGroups.map((group, index) => (
              <tr key={`queue_group_${index}`}>
                <td className="p-2 border">{group.group}</td>
                <td className="p-2 border">{group.lastQueueNumber}</td>
                <td className="p-2 border">{group.totalCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CurrentQueue;
