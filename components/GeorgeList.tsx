import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ThemedArticle } from '../types';
import { fetchGeorgeArticles } from '../services/georgeService';
import DolarRates from './DolarRates';




const GeorgeList: React.FC = () => {
  const [articles, setArticles] = useState<ThemedArticle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getArticles = async () => {
      try {
        setIsLoading(true);
        const data = await fetchGeorgeArticles();
        setArticles(data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      } catch (err) {
        setError('No se pudieron cargar los artículos de George.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    getArticles();
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return <div className="text-center py-20">Cargando artículos de George...</div>;
    }
    if (error) {
      return <p className="text-center text-red-500 py-20">{error}</p>;
    }
    if (articles.length === 0) {
      return <p className="text-center text-gray-500 py-20">No se encontraron artículos de George.</p>;
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <Link to={`/george/${article.id}`} key={article.id} className="block bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="p-6">
              <p className="text-sm text-gray-500 mb-2">{article.date}</p>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{article.title}</h3>
              <p className="text-blue-600 hover:text-blue-800 font-semibold">Leer más &rarr;</p>
            </div>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <DolarRates />
      <div className="border-b border-gray-200 mb-8 pb-4">
      </div>
     <h4 className="font-serif font-light text-2xl text-gray-900 mb-4 flex items-center justify-center font-handwriting">
  La verdad, aunque duela, cada lunes.
</h4>
      {renderContent()}
    </main>
  );
};

export default GeorgeList;
