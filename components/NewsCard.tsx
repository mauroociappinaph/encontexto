
import React from 'react';
import { NewsArticle } from '../types';
import Highlight from './Highlight';
import { Link } from 'react-router-dom';

interface NewsCardProps {
  article: NewsArticle;
  searchTerm?: string;
  isFeatured?: boolean; // Add isFeatured prop
}

const categoryColors: { [key: string]: string } = {
  'Política': 'text-red-600',
  'Economía Nacional': 'text-green-600',
  'Política Internacional': 'text-blue-600',
  'Legislación y Gobierno': 'text-purple-600',
  'Política y Economía': 'text-yellow-600',
  // Add more categories and colors as needed
};

const NewsCard: React.FC<NewsCardProps> = ({ article, searchTerm, isFeatured }) => {
  const categoryColorClass = categoryColors[article.categoria] || 'text-gray-600';

  return (
    <article className={`group relative pb-6 ${isFeatured ? 'md:col-span-2' : ''}`}> {/* Added conditional class */}
      <div className="w-full mb-4 overflow-hidden">
        <img 
          src={article.imageUrl} 
          alt={article.titular} 
          className={`w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out ${isFeatured ? 'md:h-96' : ''}`} 
        />
      </div>
      <div className="px-1">
        <div className="text-xs uppercase tracking-wider text-secondary mb-2 font-medium">
          <span className={categoryColorClass}>{article.categoria}</span>
        </div>
        <h2 className={`font-serif font-bold text-black leading-tight mb-3 group-hover:text-gray-700 transition-colors ${isFeatured ? 'text-4xl lg:text-5xl' : 'text-2xl lg:text-3xl'}`}>
          <Link to={`/noticias/${article.id}`}>
            <Highlight text={article.titular} highlight={searchTerm || ''} />
          </Link>
        </h2>
        <p className="text-gray-800 text-base leading-relaxed">
          <Highlight text={article.bajada} highlight={searchTerm || ''} />
        </p>
      </div>
      <div className="absolute bottom-0 right-1 text-xs text-gray-500">
        {article.date}
      </div>
    </article>
  );
};

export default NewsCard;