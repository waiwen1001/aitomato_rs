import axios from 'axios';
import { Restaurant } from '../types/restaurant';
import { Queue } from '../types/queue';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost';
const API_PORT = import.meta.env.VITE_API_PORT || '3000';
const API_BASE_URL = `${API_URL}:${API_PORT}/api`;

export const restaurantApi = {
  getRestaurant: async (id: string): Promise<Restaurant> => {
    const response = await axios.get<Restaurant>(`${API_BASE_URL}/restaurants/${id}`);
    return response.data;
  }
}; 

export const queueApi = {
  getPendingQueue: async (): Promise<Queue[]> => {
    const response = await axios.get<Queue[]>(`${API_BASE_URL}/queues/pending`);
    return response.data;
  }
}; 