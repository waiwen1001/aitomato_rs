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
  thumbnail: string;
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

export interface LayoutState {
  data: Layout[] | null;
  loading: boolean;
  error: string | null;
}

export interface Layout {
  id: string;
  outletId: string;
  floor: string;
  type: string;
  seq: number;
  pax: number;
  status: string;
  merge: number[];
  x_position: number;
  y_position: number;
  width: number;
  height: number;
  createdAt: Date;
  updatedAt: Date;
}
