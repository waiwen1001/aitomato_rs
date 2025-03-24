import { Restaurant } from "./restaurant";

export interface Outlet {
  id: string;
  name: string;
  restaurantId: string;
  restaurant: Restaurant;
}

export interface OutletState {
  data: Outlet | null;
  categories: Category[] | null;
  outletId: string | null;
  loading: boolean;
  error: string | null;
}

export interface MenuImage {
  id: string;
  path: string;
}

export interface Menu {
  id: string;
  name: string;
  description: string;
  price: number;
  images: MenuImage[];
}

export interface Category {
  id: string;
  outletId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  menus: Menu[];
}
