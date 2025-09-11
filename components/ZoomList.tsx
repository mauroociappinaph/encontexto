import React, { useState, useEffect } from 'react';
import { NewsArticle } from '../types';
import NewsCard from './NewsCard';
import { fetchZoomArticles } from '../services/zoomService';
import DolarRates from './DolarRates';

const ZoomList: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getArticles = async () => {
      try {
        setIsLoading(true);
        const data = await fetchZoomArticles();
        setArticles(data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
        console.log("Artículos cargados en ZoomList:", data); // Agregado
      } catch (err) {
        setError('No se pudieron cargar los artículos de Zoom.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    getArticles();
  }, []);

  const renderContent = () => {
    console.log("Estado de renderContent - isLoading:", isLoading, "error:", error, "articles.length:", articles.length); // Agregado
    if (isLoading) {
      return <div className="text-center py-20">Cargando artículos de Zoom...</div>;
    }
    if (error) {
      return <p className="text-center text-red-500 py-20">{error}</p>;
    }
    if (articles.length === 0) {
      return <p className="text-center text-gray-500 py-20">No se encontraron artículos de Zoom.</p>;
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => {
          console.log("Article bajada before NewsCard:", article.bajada);
          console.log("Article imageUrl before NewsCard:", article.imageUrl);
          console.log("Article categoria before NewsCard:", article.categoria);
          console.log("Article ID before NewsCard:", article.id, "Number(article.id):", Number(article.id));

          return (
            <NewsCard
              key={article.id}
              article={{
                id: Number(article.id),
                imageUrl: article.imageUrl || "https://placehold.co/600x400/f0f0f0/333?text=Zoom",
                date: article.date,
                titular: article.titular,
                bajada: article.bajada,
                lead: article.lead,
                cuerpo: article.cuerpo,
                cierre: article.cierre,
                categoria: article.categoria
              }}
              basePath="/zoom"
            />
          );
        })}
      </div>
    );
  };
//Prueba de commit
  return (
    <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <DolarRates />
      <div className="border-b border-gray-200 mb-8 pb-4">

      </div>
      {renderContent()}
    </main>
  );
};

export default ZoomList;
