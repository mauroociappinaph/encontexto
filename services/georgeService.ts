import { ThemedArticle } from '../types';
import axios from 'axios';

export const fetchGeorgeArticles = async (): Promise<ThemedArticle[]> => {
  try {
    const response = await axios.get<ThemedArticle[]>('/george_articles.json');
    return response.data;
  } catch (error) {
    console.error('Error fetching George articles:', error);
    return [];
  }
};
