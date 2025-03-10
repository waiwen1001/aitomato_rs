import axios from "axios";
import { Outlet } from "../types/outlet";
import { Queue, QueueRequest } from "../types/queue";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost";
const API_PORT = import.meta.env.VITE_API_PORT || "3000";
const API_BASE_URL = `${API_URL}:${API_PORT}/api`;

export const outletApi = {
  getOutlet: async (id: string): Promise<Outlet> => {
    const response = await axios.get<Outlet>(`${API_BASE_URL}/outlets/${id}`);
    return response.data;
  },
};

export const queueApi = {
  getPendingQueue: async (): Promise<Queue[]> => {
    const response = await axios.get<Queue[]>(`${API_BASE_URL}/queues/pending`);
    return response.data;
  },
  createQueue: async ({
    outletId,
    pax,
    phoneNumber,
  }: QueueRequest): Promise<Queue> => {
    const response = await axios.post<Queue>(`${API_BASE_URL}/queues`, {
      outletId,
      pax,
      phoneNumber,
    });
    return response.data;
  },
  getQueue: async (queueId: string): Promise<Queue> => {
    const response = await axios.get<Queue>(
      `${API_BASE_URL}/queues/pending/${queueId}`
    );
    return response.data;
  },
};
