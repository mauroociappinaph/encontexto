import React, { useState, useEffect, useMemo } from 'react';
import CategoryFilter from './CategoryFilter';
import NewsCard from './NewsCard';
import Pagination from './Pagination';
import { fetchNews } from '../services/newsService';
import { NewsArticle } from '../types';
import DolarRates from './DolarRates';

const Home: React.FC = () => {
  const [allNews, setAllNews] = useState<NewsArticle[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsArticle[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Estados para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage] = useState(6); // Número de noticias por página

  useEffect(() => {
    const getNews = async () => {
      try {
        setIsLoading(true);
        const newsData = await fetchNews();
        // Sort newsData by id in descending order to have the latest article first
        const sortedNews = newsData.sort((a, b) => b.id - a.id);
        setAllNews(sortedNews);
        setFilteredNews(sortedNews);
      } catch (err) {
        setError('No se pudieron cargar las noticias.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    getNews();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'Todas') {
      setFilteredNews(allNews);
    } else {
      const news = allNews.filter(article => article.categoria === selectedCategory);
      setFilteredNews(news);
    }
    setCurrentPage(1); // Resetear a la primera página al cambiar de categoría
  }, [selectedCategory, allNews]);

  const categories = useMemo(() => {
    const categorySet = new Set(allNews.map(article => article.categoria));
    return Array.from(categorySet);
  }, [allNews]);

  // Lógica de paginación
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = filteredNews.slice(indexOfFirstNews, indexOfLastNews);

  // Cambiar de página
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
    
    if (currentNews.length === 0 && !isLoading) { // Usar currentNews aquí
        return <p className="text-center text-gray-500 py-20">No se encontraron noticias.</p>;
    }

    return (
      <div>
        {currentNews.length > 0 && (
          <div className="mb-8">
            <NewsCard article={currentNews[0]} isFeatured={true} />
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> {/* Added gap-8 */}
          {currentNews.slice(1).map((article, index) => ( // Slice to render remaining articles
            <div 
              key={article.id} 
              className={`
                p-6 
                ${index % 2 === 0 ? 'md:border-r md:border-gray-200' : ''}
                border-b border-gray-200
              `}
            >
              <NewsCard article={article} />
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <DolarRates />
      <div className="border-b border-primary mb-8 pb-4">
      </div>
      {renderContent()}
      <Pagination
        newsPerPage={newsPerPage}
        totalNews={filteredNews.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </main>
  );
};

export default Home;
