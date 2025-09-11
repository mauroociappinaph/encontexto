import React, { useState, useEffect } from 'react';
import { RedesData, RedesTrend } from '../types';
import { fetchRedesData } from '../services/redesService';

const Redes: React.FC = () => {
  const [data, setData] = useState<RedesData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getRedesData = async () => {
      try {
        setIsLoading(true);
        const fetchedData = await fetchRedesData();
        // Assuming redes_data.json will contain an array, and we want the latest one
        if (fetchedData && fetchedData.length > 0) {
          setData(fetchedData[0]); // Get the most recent data
        } else {
          setError('No se encontraron datos de Redes.');
        }
      } catch (err) {
        setError('No se pudieron cargar los datos de Redes.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    getRedesData();
  }, []);

  const renderTrends = (trends: RedesTrend[]) => {
    return (
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Tendencias Principales</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trends.map((trend) => (
            <div key={trend.hashtag} className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="font-bold text-lg text-blue-600">#{trend.hashtag}</p>
              <p className="text-sm text-gray-600">Rank: {trend.rank}</p>
              <p className="text-sm text-gray-600">Menciones: {trend.mentions.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Sentimiento: <span className={`font-bold ${
                trend.sentiment === 'positive' ? 'text-green-600' :
                trend.sentiment === 'negative' ? 'text-red-600' : 'text-gray-600'
              }`}>{
                trend.sentiment
              }</span></p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (isLoading) {
    return <div className="text-center py-20">Cargando datos de Redes...</div>;
  }
  if (error) {
    return <p className="text-center text-red-500 py-20">{error}</p>;
  }
  if (!data) {
    return <p className="text-center text-gray-500 py-20">No hay datos de Redes disponibles.</p>;
  }

  return (
    <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="border-b border-gray-200 mb-8 pb-4">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Redes</h2>
        <p className="text-gray-600 mt-2">{data.summary}</p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-sm text-gray-500 mb-4">Última actualización: {data.date}</p>
        {renderTrends(data.trends)}
        {/* Placeholder for dynamic chart */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg text-blue-800 border border-blue-200">
          <p className="font-semibold">Aquí iría un gráfico dinámico de tendencias.</p>
          <p className="text-sm">La implementación de gráficos requiere librerías adicionales o un desarrollo más complejo de visualización con HTML/CSS/SVG.</p>
        </div>
      </div>
    </main>
  );
};

export default Redes;
