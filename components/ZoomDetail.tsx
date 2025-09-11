import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { NewsArticle, ContentBlock } from '../types';
import {fetchZoomArticleById } from '../services/zoomService';

const ZoomDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getArticle = async () => {
      try {
        setIsLoading(true);
        console.log("ZoomDetail: id recibido:", id);
        const fetchedArticle = await fetchZoomArticleById(id!);
        console.log("ZoomDetail: resultado de fetchZoomArticleById:", fetchedArticle);
        if (fetchedArticle) {
          setArticle(fetchedArticle);
          console.log("ZoomDetail: article seteado:", fetchedArticle);
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

  const renderBody = (body: ContentBlock[]) => {
    if (!body) {
      return null;
    }
    return body.map((block, index) => {
      switch (block.type) {
        case 'paragraph':
          return <p key={index} className="mb-4 text-lg leading-relaxed">{block.text}</p>;
        case 'heading':
          return <h2 key={index} className="text-2xl font-bold mb-4">{block.text}</h2>;
        // Add more cases for other block types if needed
        default:
          return null;
      }
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
        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-6">{article.titular}</h1>
        {/* Eliminar Modo de Análisis: {article.mode} */}
        <div className="text-gray-700 leading-relaxed">{renderBody(article.cuerpo)}</div>
      </article>
    </main>
  );
};

export default ZoomDetail;
