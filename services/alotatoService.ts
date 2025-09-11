import { ThemedArticle } from '../types';
import axios from 'axios';

export const fetchA_lo_TatoArticles = async (): Promise<ThemedArticle[]> => {
  try {
    const response = await axios.get<ThemedArticle[]>('/alotato_articles.json');
    return response.data;
  } catch (error) {
    console.error('Error fetching A lo Tato articles:', error);
    return [];
  }
};
