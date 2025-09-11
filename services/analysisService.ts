import { Analysis } from '../types';
import axios from 'axios';

export const fetchAnalyses = async (): Promise<Analysis[]> => {
  try {
    const response = await axios.get<Analysis[]>('/all_analysis.json');
    return response.data;
  } catch (error) {
    console.error('Error fetching analyses:', error);
    return []; // Return empty array on error
  }
};
