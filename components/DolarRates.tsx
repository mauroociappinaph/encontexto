import { useState, useEffect } from 'react';
import { getDolarRates } from '../services/dolarService';
import { DolarRate } from '../types';

const DolarRates = () => {
  const [rates, setRates] = useState<DolarRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRates = async () => {
    try {
      // No establecer loading a true aquí para evitar parpadeo en las actualizaciones
      const fetchedRates = await getDolarRates();
      setRates(fetchedRates);
      setError(null);
    } catch (err) {
      setError('No se pudieron cargar las cotizaciones.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, []);

  if (loading && rates.length === 0) {
    return <div className="text-center p-4 text-white">Cargando cotizaciones...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  const formatCurrency = (value: number) => {
    if (value === 0) return "N/A";
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('es-AR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 text-white">
        {rates.map((rate) => (
          <div key={rate.casa} className="bg-gray-800/60 backdrop-blur-sm rounded-lg p-3 text-center border border-gray-700 transform transition-transform hover:scale-105 hover:bg-gray-700/80">
            <p className="text-sm font-bold truncate" title={rate.nombre}>{rate.nombre.replace('Dólar', '').trim()}</p>
            <div className="text-xs mt-2">
              <span className="text-gray-400">Compra</span>
              <p className="font-semibold text-base text-green-400">{formatCurrency(rate.compra)}</p>
            </div>
            <div className="text-xs mt-1">
              <span className="text-gray-400">Venta</span>
              <p className="font-semibold text-base text-green-400">{formatCurrency(rate.venta)}</p>
            </div>
            <p className="text-[10px] text-gray-500 mt-2">Act. {formatDate(rate.fechaActualizacion)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DolarRates;
