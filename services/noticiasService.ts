import { Noticias } from '../types';
import axios from 'axios';

export const fetchNoticias = async (): Promise<Noticias[]> => {
  try {
    const response = await axios.get<Noticias[]>('/all_noticias.json');
    return response.data;
  } catch (error) {
    console.error('Error fetching noticias:', error);
    return []; // Return empty array on error
  }
};