import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchPendingQueue } from "../store/queueSlice";
import { useNavigate } from "react-router-dom";
import { QueueInfo } from "../types/queue";

const CurrentQueue = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data: queues, loading, error } = useAppSelector((state) => state.queue);
  const [currentQueue, setCurrentQueue] = useState<QueueInfo[]>([
    { group: "1 - 2 pax", queue: "", ahead: 0 },
    { group: "3 - 4 pax", queue: "", ahead: 0 },
    { group: ">= 5 pax", queue: "", ahead: 0 },
  ]);

  useEffect(() => {
    dispatch(fetchPendingQueue()).unwrap().catch(() => {
      navigate("/not-found");
    });
  }, [dispatch]);

  useEffect(() => {
    if (queues && queues.length > 0) {
      queues.map((q) => {
        // if(q.pax <= 1 && q.pax >= 2) {
        //   setCurrentQueue((prev) => [...prev, { group: "1 - 2 pax", queue: q.id, ahead: +q.ahead }]);
        // } else if(q.pax <= 3 && q.pax >= 4) {
        //   setCurrentQueue((prev) => [...prev, { group: "3 - 4 pax", queue: q.id, ahead: 0 }]);
        // } else if(q.pax >= 5) {
        //   setCurrentQueue((prev) => [...prev, { group: ">= 5 pax", queue: q.id, ahead: 0 }]);
        // }
      });
    }
  }, [queues])

  return (
    <div className="w-full">
      <table className="w-full text-center border">
        <thead>
          <tr>
            <td className="p-2 bg-gray-100 font-semibold border">Pax</td>
            <td className="p-2 bg-gray-100 font-semibold border">Current Queue</td>
            <td className="p-2 bg-gray-100 font-semibold border">Group Ahead</td>
          </tr>
        </thead>
        <tbody>
        {currentQueue && currentQueue.map((q, index) => (
          <tr key={`queue_${index}`}>
            <td className="p-2 border">{ q.group }</td>
            <td className="p-2 border">{ q.queue }</td>
            <td className="p-2 border">{ q.ahead }</td>
          </tr>
        ))}
        </tbody>
      </table>
      
    </div>
  )
}

export default CurrentQueue