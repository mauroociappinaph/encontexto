import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Analysis } from '../types';
import { fetchAnalyses } from '../services/analysisService';

const AnalysisDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getAnalysis = async () => {
      try {
        setIsLoading(true);
        const analysesData = await fetchAnalyses();
        const foundAnalysis = analysesData.find(a => a.id === id);
        if (foundAnalysis) {
          setAnalysis(foundAnalysis);
        } else {
          setError('Análisis no encontrado.');
        }
      } catch (err) {
        setError('No se pudo cargar el análisis.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    getAnalysis();
  }, [id]);

  const renderBody = (body: string) => {
    return body.split('\n').map((paragraph, index) => {
      if (paragraph.trim() === '') return <br key={index} />;

      // Handle bold text
      const parts = paragraph.split(/(\*\*.*\*\*)/g).map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      // Check for list items
      if (paragraph.trim().startsWith('* ') || paragraph.trim().match(/^\d+\./)) {
        return <p key={index} className="mb-2 ml-4">{parts}</p>;
      }

      return <p key={index} className="mb-4">{parts}</p>;
    });
  };

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

  if (!analysis) {
    return <p className="text-center text-gray-500 py-20">Análisis no encontrado.</p>;
  }

  return (
    <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <article className="prose max-w-none">
        <p className="text-sm text-gray-500 mb-2">{analysis.date}</p>
        <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-6">{analysis.title}</h1>
        <div className="text-gray-700 leading-relaxed">{renderBody(analysis.body)}</div>
      </article>
    </main>
  );
};

export default AnalysisDetail;
