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
        const foundAnalysis = analysesData.find(a => a.id === Number(id));
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

  if (!analysis) {
    return <p className="text-center text-gray-500 py-20">Análisis no encontrado.</p>;
  }

  return (
    <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <article className="prose max-w-none">
        <p className="text-sm text-gray-500 mb-2">{analysis.date}</p>
        <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-6">{analysis.titular}</h1>
        <p className="text-xl font-semibold text-gray-800 mb-4">{analysis.bajada}</p>
        <p className="text-lg text-gray-700 italic mb-6">{analysis.lead}</p>
        <div className="text-gray-700 leading-relaxed">
          {analysis.cuerpo.map((block, index) => (
            <p key={index} className="mb-6 leading-relaxed">{block.text}</p>
          ))}
        </div>
        <p className="text-lg text-gray-700 italic mt-6">{analysis.cierre}</p>
      </article>
    </main>
  );
};

export default AnalysisDetail;
