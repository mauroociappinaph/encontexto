
import { NewsArticle } from '../types';
import axios from 'axios';

const mockNews: NewsArticle[] = [];

export const fetchNews = async (): Promise<NewsArticle[]> => {
  try {
    const response = await axios.get<NewsArticle[]>('/all_news.json');
    return response.data;
  } catch (error) {
    console.error('Error fetching news:', error);
    return []; // Return empty array on error
  }
};