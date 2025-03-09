export interface Queue {
  id: string;
  name: string;
  pax: number;
  phoneNumber: string;
  status: string;
}

export interface QueueInfo {
  group: string;
  queue: string;
  ahead: number;
}

export interface QueueState {
  data: Queue[] | null;
  loading: boolean;
  error: string | null;
} 