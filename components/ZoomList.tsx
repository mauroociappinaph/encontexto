import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ZoomArticle } from '../types';
import { fetchZoomArticles } from '../services/zoomService';

const ZoomList: React.FC = () => {
  const [articles, setArticles] = useState<ZoomArticle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getArticles = async () => {
      try {
        setIsLoading(true);
        const data = await fetchZoomArticles();
        setArticles(data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
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
        {articles.map((article) => (
          <Link to={`/zoom/${article.id}`} key={article.id} className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="p-6">
              <p className="text-sm text-gray-500 mb-2">{article.date}</p>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{article.title}</h3>
              <p className="text-base font-semibold text-indigo-600 mb-2">Modo: {article.mode}</p>
              <p className="text-blue-600 hover:text-blue-800 font-semibold">Leer más &rarr;</p>
            </div>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="border-b border-gray-200 mb-8 pb-4">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Zoom</h2>
      </div>
      {renderContent()}
    </main>
  );
};

export default ZoomList;
