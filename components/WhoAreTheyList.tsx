import React, { useState, useEffect } from 'react';
import { Person } from '../types';
import { fetchPeople } from '../services/personService';
import { Link } from 'react-router-dom';

const WhoAreTheyList: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getPeople = async () => {
      try {
        setIsLoading(true);
        const peopleData = await fetchPeople();
        setPeople(peopleData);
      } catch (err) {
        setError('No se pudieron cargar las personas.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    getPeople();
  }, []);

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

    if (people.length === 0 && !isLoading) {
      return <p className="text-center text-gray-500 py-20">No se encontraron personas.</p>;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {people.map((person) => (
          <div key={person.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={person.imageUrl} alt={person.name} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{person.name}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{person.description}</p>
              <Link
                to={`/quienes-son/${person.id}`}
                className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full text-sm transition duration-300"
              >
                Ver más
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="border-b border-gray-200 mb-8 pb-4">
        <h2 className="text-xl font-semibold tracking-wider uppercase">En Quiénes Son</h2>
      </div>
      {renderContent()}
    </main>
  );
};

export default WhoAreTheyList;
