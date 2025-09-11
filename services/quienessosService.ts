import { QuienEsQuienProfile } from '../types';
import axios from 'axios';

export const fetchQuienEsQuienProfiles = async (): Promise<QuienEsQuienProfile[]> => {
  try {
    const response = await axios.get<QuienEsQuienProfile[]>('/quienessos_articles.json');
    return response.data;
  } catch (error) {
    console.error('Error fetching ¿Quién es Quién? profiles:', error);
    return [];
  }
};
