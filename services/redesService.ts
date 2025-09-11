import { RedesData } from '../types';
import axios from 'axios';

export const fetchRedesData = async (): Promise<RedesData[]> => {
  try {
    const response = await axios.get<RedesData[]>('/redes_data.json');
    return response.data;
  } catch (error) {
    console.error('Error fetching Redes data:', error);
    return [];
  }
};
