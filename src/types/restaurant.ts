export interface Restaurant {
  id: string;
  name: string;
}

export interface RestaurantState {
  data: Restaurant | null;
  loading: boolean;
  error: string | null;
} 