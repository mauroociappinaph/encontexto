import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { NewsArticle, ContentBlock } from '../types';
import { fetchNews } from '../services/newsService';

const categoryColors: { [key: string]: string } = {
  'Política': 'text-red-600',
  'Economía Nacional': 'text-green-600',
  'Política Internacional': 'text-blue-600',
  'Legislación y Gobierno': 'text-purple-600',
  'Política y Economía': 'text-yellow-600',
  // Add more categories and colors as needed
};

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getArticle = async () => {
      try {
        setIsLoading(true);
        const newsData = await fetchNews();
        const foundArticle = newsData.find(a => a.id === parseInt(id || ''));
        if (foundArticle) {
          setArticle(foundArticle);
        } else {
          setError('Noticia no encontrada.');
        }
      } catch (err) {
        setError('No se pudo cargar la noticia.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    getArticle();
  }, [id]);

  const renderContentBlock = (block: ContentBlock, index: number) => {
    if (block.type === 'paragraph') {
      return <p key={index} className="mb-4 text-gray-700 leading-relaxed">{block.text}</p>;
    } else if (block.type === 'highlight') {
      return <p key={index} className="mb-4 p-3 bg-gray-100 border-l-4 border-blue-500 text-gray-800 italic">{block.text}</p>;
    }
    return null;
  };

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

  if (!article) {
    return <p className="text-center text-gray-500 py-20">Noticia no encontrada.</p>;
  }

  const categoryColorClass = article ? categoryColors[article.categoria] || 'text-gray-600' : 'text-gray-600';

  return (
    <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <article className="">
        <img 
          src={article.imageUrl} 
          alt={article.titular} 
          className="w-full h-64 object-cover mb-6 rounded-md"
        />
        <div className="text-xs uppercase tracking-wider text-secondary mb-2 font-medium">
          <span className={categoryColorClass}>{article.categoria}</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4">{article.titular}</h1>
        <p className="text-gray-600 text-sm mb-4">{article.date}</p>
        
        <p className="text-xl font-semibold text-gray-800 mb-4">{article.bajada}</p>
        <p className="text-lg text-gray-700 italic mb-6">{article.lead}</p>

        <div className="prose max-w-none">
          {article.cuerpo.map(renderContentBlock)}
        </div>

        <p className="text-base text-gray-700 mt-6">{article.cierre}</p>
        <p className="text-base text-gray-700 mt-6 font-bold text-center italic">
          ¡No te quedes solo con el título, el análisis es lo que te empodera!
        </p>
      </article>
    </main>
  );
};

export default NewsDetail;
