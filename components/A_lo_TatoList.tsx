import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AlotatoArticle } from '../types';
import { fetchA_lo_TatoArticles } from '../services/alotatoService';
import NewsCard from './NewsCard';
import DolarRates from './DolarRates';
import Pagination from './Pagination'; // Import the Pagination component

const A_lo_TatoList: React.FC = () => {
  const [articles, setArticles] = useState<AlotatoArticle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [articlesPerPage] = useState<number>(6); // Number of articles per page

  useEffect(() => {
    const getArticles = async () => {
      try {
        setIsLoading(true);
        const data = await fetchA_lo_TatoArticles();
        setArticles(data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      } catch (err) {
        setError('No se pudieron cargar los artículos de A lo Tato.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    getArticles();
  }, []);

  // Get current articles
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const renderContent = () => {
    if (isLoading) {
      return <div className="text-center py-20">Cargando artículos de A lo Tato...</div>;
    }
    if (error) {
      return <p className="text-center text-red-500 py-20">{error}</p>;
    }
    if (articles.length === 0) {
      return <p className="text-center text-gray-500 py-20">No se encontraron artículos de A lo Tato.</p>;
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentArticles.map((article) => (
          <NewsCard key={article.id} article={article} basePath="/alotato" />
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
        Señoras y señores, todos los jueves de la semana, la realidad supera la ficción... y la supera con creces.
      </h4>
      {renderContent()}
      <Pagination
        newsPerPage={articlesPerPage}
        totalNews={articles.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </main>
  );
};

export default A_lo_TatoList;
