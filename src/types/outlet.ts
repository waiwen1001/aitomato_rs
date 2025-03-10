import { Restaurant } from "./restaurant";

export interface Outlet {
  id: string;
  name: string;
  restaurantId: string;
  restaurant: Restaurant;
}

export interface OutletState {
  data: Outlet | null;
  outletId: string | null;
  loading: boolean;
  error: string | null;
}
