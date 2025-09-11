import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Analysis } from '../types';
import { fetchAnalyses } from '../services/analysisService';
import DolarRates from './DolarRates';
import NewsCard from './NewsCard';
import Pagination from './Pagination'; // Import the Pagination component

const AnalysisList: React.FC = () => {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [analysesPerPage] = useState<number>(6); // Number of analyses per page

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

  // Get current analyses
  const indexOfLastAnalysis = currentPage * analysesPerPage;
  const indexOfFirstAnalysis = indexOfLastAnalysis - analysesPerPage;
  const currentAnalyses = analyses.slice(indexOfFirstAnalysis, indexOfLastAnalysis);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
        {currentAnalyses.map((analysis) => (
          <NewsCard key={analysis.id} article={analysis} basePath="/analisis" />
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
        newsPerPage={analysesPerPage}
        totalNews={analyses.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </main>
  );
};

export default AnalysisList;
