import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Noticias } from '../types';
import { fetchNoticias } from '../services/noticiasService';

const NoticiasDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [noticias, setNoticias] = useState<Noticias | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getNoticias = async () => {
      try {
        setIsLoading(true);
        const noticiasData = await fetchNoticias();
        const foundNoticias = noticiasData.find(n => n.id === Number(id));
        if (foundNoticias) {
          setNoticias(foundNoticias);
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
    getNoticias();
  }, [id]);

  if (!noticias) {
    return <p className="text-center text-gray-500 py-20">Noticia no encontrada.</p>;
  }

  return (
    <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <article className="prose max-w-none">
        <p className="text-sm text-gray-500 mb-2">{noticias.date}</p>
        <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-6">{noticias.titular}</h1>
        <p className="text-xl font-semibold text-gray-800 mb-4">{noticias.bajada}</p>
        <p className="text-lg text-gray-700 italic mb-6">{noticias.lead}</p>
        <div className="text-gray-700 leading-relaxed">
          {noticias.cuerpo.map((block, index) => (
            <p key={index} className="mb-6 leading-relaxed">{block.text}</p>
          ))}
        </div>
        <p className="text-lg text-gray-700 italic mt-6">{noticias.cierre}</p>
      </article>
    </main>
  );
};

export default NoticiasDetail;