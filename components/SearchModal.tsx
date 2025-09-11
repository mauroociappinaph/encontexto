import React, { useState, useEffect, useMemo } from 'react';
import { NewsArticle, ContentBlock } from '../types';
import NewsCard from './NewsCard';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  news: NewsArticle[];
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, news }) => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300); // 300ms delay

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  const filteredNews = useMemo(() => {
    if (!debouncedQuery.trim()) {
      return [];
    }
    const lowerCaseQuery = debouncedQuery.toLowerCase();
    return news.filter(article => {
      const bodyText = article.cuerpo.map((block: ContentBlock) => block.text).join(' ').toLowerCase();
      return (
        article.titular.toLowerCase().includes(lowerCaseQuery) ||
        article.bajada.toLowerCase().includes(lowerCaseQuery) ||
        article.lead.toLowerCase().includes(lowerCaseQuery) ||
        bodyText.includes(lowerCaseQuery)
      );
    });
  }, [debouncedQuery, news]);

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
        setQuery(''); // Reset query on close
        setDebouncedQuery(''); // Reset debounced query on close
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleClearSearch = () => {
    setQuery('');
    setDebouncedQuery('');
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-start pt-12 sm:pt-20"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white rounded-t-lg z-10">
          <div className="relative">
             <span className="absolute inset-y-0 left-0 flex items-center pl-4" aria-hidden="true">
                <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar noticias por palabra clave..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-800"
              aria-label="Buscar noticias"
              autoFocus
            />
            {query.length > 0 && (
              <button
                onClick={handleClearSearch}
                className="absolute inset-y-0 right-12 flex items-center pr-4 text-gray-400 hover:text-gray-800"
                aria-label="Limpiar búsqueda"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            )}
          </div>
           <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-800 transition-colors p-2"
            aria-label="Cerrar búsqueda"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <div className="overflow-y-auto p-6">
          {debouncedQuery.trim() && filteredNews.length === 0 && (
            <p className="text-center text-gray-500 py-10">No se encontraron resultados para "{debouncedQuery}".</p>
          )}
          {filteredNews.length > 0 && (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredNews.map(article => (
                    <NewsCard key={article.id} article={article} searchTerm={debouncedQuery} />
                ))}
             </div>
          )}
           {!debouncedQuery.trim() && (
            <p className="text-center text-gray-400 py-10">Escribe algo para empezar a buscar.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;