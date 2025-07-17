export interface Queue {
  id: string;
  outletId: string;
  layoutId: string | null;
  pax: number;
  phoneNumber: string;
  queueNumber: string;
  status: string;
  tableId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface QueueInfo {
  queue: Queue;
  waitTime: number;
  servingQueue: string;
  aheadGroup: number;
}

export interface QueueGroup {
  group: string;
  lastQueueNumber: string;
  totalCount: number;
}

export interface QueueState {
  data: Queue[] | null;
  queueInfo: QueueInfo | null;
  loading: boolean;
  error: string | null;
}

export interface QueueRequest {
  outletId: string | null;
  pax: number;
  phoneNumber: string;
}

export interface QueueResponse {
  data: QueueInfo;
  message: string;
  success: boolean;
}

export enum QueueStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
  TIMEOUT = "TIMEOUT",
}
