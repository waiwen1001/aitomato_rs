export interface OrderState {
  data: OrderResponse | null;
  loading: boolean;
  error: string | null;
}

export interface AddToCartRequest {
  outletId: string;
  queueId: string;
  menuId: string;
  quantity: number;
  remark: string;
}

export interface OrderResponse {
  id: string;
  outletId: string;
  queueId: string;
  tableId: string;
  subtotal: number;
  tax: number;
  gst: number;
  total: number;
  status: string;
  orderItems: OrderItem[];
}

export interface OrderItem {
  id: string;
  menuId: string;
  price: number;
  quantity: number;
  menuName: string;
  menuDescription: string;
  remark: string;
  thumbnailUrl: string;
}
