import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { QuienEsQuienProfile } from '../types';
import { fetchQuienEsQuienProfiles } from '../services/quienessosService';
import DolarRates from './DolarRates';
import Pagination from './Pagination'; // Import the Pagination component

const QuienEsQuienList: React.FC = () => {
  const [profiles, setProfiles] = useState<QuienEsQuienProfile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [profilesPerPage] = useState<number>(6); // Number of profiles per page

  useEffect(() => {
    const getProfiles = async () => {
      try {
        setIsLoading(true);
        const data = await fetchQuienEsQuienProfiles();
        setProfiles(data);
      } catch (err) {
        setError('No se pudieron cargar los perfiles de ¿Quién es Quién?.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    getProfiles();
  }, []);

  // Get current profiles
  const indexOfLastProfile = currentPage * profilesPerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
  const currentProfiles = profiles.slice(indexOfFirstProfile, indexOfLastProfile);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const renderContent = () => {
    if (isLoading) {
      return <div className="text-center py-20">Cargando perfiles...</div>;
    }
    if (error) {
      return <p className="text-center text-red-500 py-20">{error}</p>;
    }
    if (profiles.length === 0) {
      return <p className="text-center text-gray-500 py-20">No se encontraron perfiles.</p>;
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentProfiles.map((profile) => (
          <Link to={`/quienessos/${profile.id}`} key={profile.id} className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {profile.imageUrl && (
              <img src={profile.imageUrl} alt={profile.name} className="w-full h-48 object-cover rounded-t-lg" />
            )}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{profile.name}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">{profile.briefReview}</p>
              <p className="text-blue-600 hover:text-blue-800 font-semibold">Ver perfil &rarr;</p>
            </div>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <DolarRates />
      <div className="border-b border-gray-200 mb-8 pb-4">

      </div>
      {renderContent()}
      <Pagination
        newsPerPage={profilesPerPage}
        totalNews={profiles.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </main>
  );
};

export default QuienEsQuienList;
