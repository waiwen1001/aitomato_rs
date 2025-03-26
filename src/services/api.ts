import axios from "axios";
import { Category, Outlet, Table } from "../types/outlet";
import { Queue, QueueRequest, QueueResponse } from "../types/queue";
import { AddToCartRequest, OrderResponse } from "../types/order";

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
  }: QueueRequest): Promise<QueueResponse> => {
    const response = await axios.post<QueueResponse>(`${API_BASE_URL}/queues`, {
      outletId,
      pax,
      phoneNumber,
    });
    return response.data;
  },
  getQueue: async (queueId: string): Promise<QueueResponse> => {
    const response = await axios.get<QueueResponse>(
      `${API_BASE_URL}/queues/pending/${queueId}`
    );
    return response.data;
  },
};

export const menuApi = {
  getMenu: async (outletId: string): Promise<Category[]> => {
    const response = await axios.get<Category[]>(
      `${API_BASE_URL}/outlets/${outletId}/menus`
    );
    return response.data;
  },
};

export const addToCartApi = {
  addToCart: async ({
    outletId,
    queueId,
    menuId,
    quantity,
    remark,
  }: AddToCartRequest): Promise<OrderResponse> => {
    const response = await axios.post<OrderResponse>(`${API_BASE_URL}/orders`, {
      outletId,
      queueId,
      menuId,
      quantity,
      remark,
    });
    return response.data;
  },
};

export const orderApi = {
  fetchOrder: async (queueId: string): Promise<OrderResponse> => {
    const response = await axios.get<OrderResponse>(
      `${API_BASE_URL}/orders/${queueId}`
    );
    return response.data;
  },
};

export const tableApi = {
  getTables: async (outletId: string): Promise<Table[]> => {
    const response = await axios.get<Table[]>(
      `${API_BASE_URL}/tables/${outletId}`
    );
    return response.data;
  },
};
