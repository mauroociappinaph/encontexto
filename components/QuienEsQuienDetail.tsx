import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { QuienEsQuienProfile } from '../types';
import { fetchQuienEsQuienProfiles } from '../services/quienessosService';

const QuienEsQuienDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<QuienEsQuienProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProfile = async () => {
      try {
        setIsLoading(true);
        const data = await fetchQuienEsQuienProfiles();
        const foundProfile = data.find(p => p.id === id);
        if (foundProfile) {
          setProfile(foundProfile);
        } else {
          setError('Perfil no encontrado.');
        }
      } catch (err) {
        setError('No se pudo cargar el perfil.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    getProfile();
  }, [id]);

  if (isLoading) {
    return <div className="text-center py-20">Cargando perfil...</div>;
  }
  if (error) {
    return <p className="text-center text-red-500 py-20">{error}</p>;
  }
  if (!profile) {
    return <p className="text-center text-gray-500 py-20">Perfil no encontrado.</p>;
  }

  return (
    <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <article className="prose max-w-none">
        {profile.imageUrl && (
          <img src={profile.imageUrl} alt={profile.name} className="w-full h-64 object-cover object-top mb-6 rounded-md" />
        )}
        <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-6">{profile.name}</h1>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Reseña</h2>
        <p className="text-gray-700 leading-relaxed mb-6">{profile.briefReview}</p>

        {profile.potentialImpact && (
          <>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Potencial Impacto</h2>
            <p className="text-gray-700 leading-relaxed mb-6">{profile.potentialImpact}</p>
          </>
        )}

        {profile.risksOpportunities && (
          <>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Riesgos y Oportunidades</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">{profile.risksOpportunities}</p>
          </>
        )}

        {profile.sources && profile.sources.length > 0 && (
          <>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Fuentes</h2>
            <ul className="list-disc list-inside text-gray-700">
              {profile.sources.map((source, index) => (
                <li key={index} className="mb-1">
                  <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                    {source.description}
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
      </article>
    </main>
  );
};

export default QuienEsQuienDetail;
