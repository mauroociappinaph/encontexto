import { NewsArticle, ZoomArticle } from '../types'; // Importar NewsArticle
import axios from 'axios';

export const fetchZoomArticles = async (): Promise<NewsArticle[]> => { // Cambiar tipo de retorno
  try {
    const response = await axios.get<any[]>('/zoom_articles.json'); // Usar any[] para la respuesta inicial
    // Mapear los datos a NewsArticle
    const newsArticles: NewsArticle[] = response.data.map((article: NewsArticle) => ({
      id: article.id,
      imageUrl: article.imageUrl,
      date: article.date,
      titular: article.titular,
      bajada: article.bajada,
      lead: article.lead,
      cuerpo: article.cuerpo,
      cierre: article.cierre,
      categoria: article.categoria
    }));
    console.log("Datos mapeados en zoomService:", newsArticles); // Agregado
    return newsArticles;
  } catch (error) {
    console.error('Error fetching Zoom articles:', error);
    return [];
  }
};

export const fetchZoomArticleById = async (id: string): Promise<NewsArticle | null> => {
  try {
    const articles = await fetchZoomArticles();
    const numericId = parseInt(id, 10); // Convertir el id a número
    const article = articles.find(art => art.id === numericId); // Comparar con el id numérico
    return article || null;
  } catch (error) {
    console.error(`Error fetching Zoom article with id ${id}:`, error);
    return null;
  }
};
