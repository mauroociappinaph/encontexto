import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ThemedArticle } from '../types';
import { fetchA_lo_TatoArticles } from '../services/alotatoService';

const A_lo_TatoDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<ThemedArticle | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getArticle = async () => {
      try {
        setIsLoading(true);
        const data = await fetchA_lo_TatoArticles();
        const foundArticle = data.find(a => a.id === id);
        if (foundArticle) {
          setArticle(foundArticle);
        } else {
          setError('Artículo no encontrado.');
        }
      } catch (err) {
        setError('No se pudo cargar el artículo.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    getArticle();
  }, [id]);

  const renderBody = (body: string) => {
    return body.split('\n').map((paragraph, index) => {
      if (paragraph.trim() === '') return <br key={index} />;
      const parts = paragraph.split(/(\**.*?\**)/g).map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        return part;
      });
      return <p key={index} className="mb-6 leading-relaxed">{parts}</p>;
    });
  };

  if (isLoading) {
    return <div className="text-center py-20">Cargando artículo...</div>;
  }
  if (error) {
    return <p className="text-center text-red-500 py-20">{error}</p>;
  }
  if (!article) {
    return <p className="text-center text-gray-500 py-20">Artículo no encontrado.</p>;
  }

  return (
    <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <article className="prose max-w-none">
        <p className="text-sm text-gray-500 mb-2">{article.date}</p>
        <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-6">{article.title}</h1>
        <p className="text-xl font-semibold text-gray-800 mb-4">{article.bajada}</p>
        <p className="text-lg text-gray-700 italic mb-6">{article.lead}</p>
        <div className="text-gray-700 leading-relaxed">{renderBody(article.body)}</div>
      </article>
    </main>
  );
};

export default A_lo_TatoDetail;
