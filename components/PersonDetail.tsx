import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { fetchPeople } from '../services/personService';

const PersonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [person, setPerson] = useState<Person | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getPerson = async () => {
      try {
        setIsLoading(true);
        const peopleData = await fetchPeople();
        const foundPerson = peopleData.find(p => p.id === id);
        if (foundPerson) {
          setPerson(foundPerson);
        } else {
          setError('Persona no encontrada.');
        }
      } catch (err) {
        setError('No se pudo cargar la información de la persona.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    getPerson();
  }, [id]);

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

  if (!person) {
    return <p className="text-center text-gray-500 py-20">Persona no encontrada.</p>;
  }

  return (
    <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="bg-white rounded-lg shadow-md overflow-hidden p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start mb-6">
          {person.imageUrl && (
            <img 
              src={person.imageUrl} 
              alt={person.name} 
              className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover mr-0 md:mr-8 mb-6 md:mb-0 shadow-lg"
            />
          )}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{person.name}</h1>
            <p className="text-gray-700 text-lg leading-relaxed">{person.description}</p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Relevancia en las Noticias</h2>
          <p className="text-gray-700 leading-relaxed">{person.newsContext}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Fuentes</h2>
          <ul className="list-disc list-inside text-gray-700">
            {person.sources.map((source, index) => (
              <li key={index} className="mb-1">
                <a 
                  href={source.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  {source.description}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default PersonDetail;
