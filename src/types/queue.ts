export interface Queue {
  id: string;
  outletId: string;
  pax: number;
  phoneNumber: string;
  queueNumber: string;
  status: string;
  tableId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface QueueGroup {
  group: string;
  lastQueueNumber: string;
  totalCount: number;
}

export interface QueueState {
  data: Queue[] | null;
  queue: Queue | null;
  loading: boolean;
  error: string | null;
}

export interface QueueRequest {
  outletId: string | null;
  pax: number;
  phoneNumber: string;
}
