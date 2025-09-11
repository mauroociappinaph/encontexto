import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Noticias } from '../types';
import { fetchNoticias } from '../services/noticiasService';
import DolarRates from './DolarRates';
import NewsCard from './NewsCard';
import Pagination from './Pagination'; // Import the Pagination component

const NoticiasList: React.FC = () => {
  const [noticias, setNoticias] = useState<Noticias[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [noticiasPerPage] = useState<number>(6); // Number of noticias per page

  useEffect(() => {
    const getNoticias = async () => {
      try {
        setIsLoading(true);
        const noticiasData = await fetchNoticias();
        const sortedNoticias = noticiasData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setNoticias(sortedNoticias);
      } catch (err) {
        setError('No se pudieron cargar las noticias.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    getNoticias();
  }, []);

  // Get current noticias
  const indexOfLastNoticias = currentPage * noticiasPerPage;
  const indexOfFirstNoticias = indexOfLastNoticias - noticiasPerPage;
  const currentNoticias = noticias.slice(indexOfFirstNoticias, indexOfLastNoticias);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
        </div>
      );
    }

    if (error) {
      return <p className="text-center text-red-500 py-20">{error}</p>;
    }

    if (noticias.length === 0 && !isLoading) {
        return <p className="text-center text-gray-500 py-20">No se encontraron noticias.</p>;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentNoticias.map((noticia) => (
          <NewsCard key={noticia.id} article={noticia} basePath="/analisis-politico" />
        ))}
      </div>
    );
  };

  return (
    <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <DolarRates />
      <div className="border-b border-gray-200 mb-8 pb-4">

      </div>
      {renderContent()}
      <Pagination
        newsPerPage={noticiasPerPage}
        totalNews={noticias.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </main>
  );
};

export default NoticiasList;