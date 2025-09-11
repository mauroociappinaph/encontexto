import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Analysis } from '../types';
import { fetchAnalyses } from '../services/analysisService';

const AnalysisList: React.FC = () => {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getAnalyses = async () => {
      try {
        setIsLoading(true);
        const analysisData = await fetchAnalyses();
        const sortedAnalyses = analysisData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setAnalyses(sortedAnalyses);
      } catch (err) {
        setError('No se pudieron cargar los análisis.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    getAnalyses();
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
    
    if (analyses.length === 0 && !isLoading) {
        return <p className="text-center text-gray-500 py-20">No se encontraron análisis.</p>;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {analyses.map((analysis) => (
          <Link to={`/analisis/${analysis.id}`} key={analysis.id} className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="p-6">
              <p className="text-sm text-gray-500 mb-2">{analysis.date}</p>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{analysis.title}</h3>
              <p className="text-blue-600 hover:text-blue-800 font-semibold">Leer más &rarr;</p>
            </div>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="border-b border-gray-200 mb-8 pb-4">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Análisis</h2>
      </div>
      {renderContent()}
    </main>
  );
};

export default AnalysisList;
