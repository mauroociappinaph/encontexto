import { ZoomArticle } from '../types';
import axios from 'axios';

export const fetchZoomArticles = async (): Promise<ZoomArticle[]> => {
  try {
    const response = await axios.get<ZoomArticle[]>('/zoom_articles.json');
    return response.data;
  } catch (error) {
    console.error('Error fetching Zoom articles:', error);
    return [];
  }
};
