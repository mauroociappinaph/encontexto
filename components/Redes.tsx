import React, { useState, useEffect } from 'react';
import { RedesData, RedesTrend } from '../types';
import { fetchRedesData } from '../services/redesService';
import DolarRates from './DolarRates';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { FaSmile, FaFrown, FaMeh } from 'react-icons/fa'; // Importar iconos de sentimiento

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Redes: React.FC = () => {
  const [data, setData] = useState<RedesData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("useEffect: Iniciando carga de datos de Redes...");
    const getRedesData = async () => {
      try {
        setIsLoading(true);
        const fetchedData = await fetchRedesData();
        console.log("useEffect: Datos obtenidos de fetchRedesData:", fetchedData);
        if (fetchedData && fetchedData.length > 0) {
          setData(fetchedData[0]);
          console.log("useEffect: Datos establecidos en el estado:", fetchedData[0]);
        } else {
          setError('No se encontraron datos de Redes.');
          console.log("useEffect: Error: No se encontraron datos de Redes.");
        }
      } catch (err) {
        setError('No se pudieron cargar los datos de Redes.');
        console.error("useEffect: Error al cargar datos de Redes:", err);
      } finally {
        setIsLoading(false);
        console.log("useEffect: Carga de datos finalizada. isLoading:", false);
      }
    };
    getRedesData();
  }, []);

  const getSentimentIcon = (sentiment: 'positive' | 'neutral' | 'negative') => {
    switch (sentiment) {
      case 'positive':
        return <span className="text-green-500"><FaSmile /></span>;
      case 'negative':
        return <span className="text-red-500"><FaFrown /></span>;
      case 'neutral':
        return <span className="text-gray-500"><FaMeh /></span>;
      default:
        return null;
    }
  };

  // Adaptar el tooltip para Chart.js
  const getOrCreateTooltip = (chart: any) => {
    let tooltipEl = chart.canvas.parentNode.querySelector('.chartjs-tooltip');

    if (!tooltipEl) {
      tooltipEl = document.createElement('div');
      tooltipEl.classList.add('chartjs-tooltip');
      tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
      tooltipEl.style.borderRadius = '3px';
      tooltipEl.style.color = 'white';
      tooltipEl.style.opacity = 1;
      tooltipEl.style.pointerEvents = 'none';
      tooltipEl.style.position = 'absolute';
      tooltipEl.style.transform = 'translate(-50%, 0)';
      tooltipEl.style.transition = 'all .1s ease';

      const table = document.createElement('table');
      table.style.margin = '0px';

      tooltipEl.appendChild(table);
      chart.canvas.parentNode.appendChild(tooltipEl);
    }

    return tooltipEl;
  };

  const externalTooltipHandler = (context: any) => {
    // Tooltip Element
    const { chart, tooltip } = context;
    const tooltipEl = getOrCreateTooltip(chart);

    // Hide if no tooltip
    if (tooltip.opacity === 0) {
      tooltipEl.style.opacity = 0;
      return;
    }

    // Set Text
    if (tooltip.body) {
      const titleLines = tooltip.title || [];
      const bodyLines = tooltip.body.map((b: any) => b.lines);

      const tableHead = document.createElement('thead');
      titleLines.forEach((title: string) => {
        const tr = document.createElement('tr');
        tr.style.borderWidth = '0';
        const th = document.createElement('th');
        th.style.borderWidth = '0';
        const text = document.createTextNode(title);
        th.appendChild(text);
        tr.appendChild(th);
        tableHead.appendChild(tr);
      });

      const tableBody = document.createElement('tbody');
      bodyLines.forEach((body: any, i: number) => {
        const colors = tooltip.labelColors[i];

        const span = document.createElement('span');
        span.style.background = colors.backgroundColor;
        span.style.borderColor = colors.borderColor;
        span.style.borderWidth = '2px';
        span.style.marginRight = '10px';
        span.style.height = '10px';
        span.style.width = '10px';
        span.style.display = 'inline-block';

        const tr = document.createElement('tr');
        tr.style.backgroundColor = 'inherit';
        tr.style.borderWidth = '0';

        const td = document.createElement('td');
        td.style.borderWidth = '0';
        td.appendChild(span);
        td.appendChild(document.createTextNode(body));
        tr.appendChild(td);
        tableBody.appendChild(tr);
      });

      const tableRoot = tooltipEl.querySelector('table');

      // Remove old children
      while (tableRoot.firstChild) {
        tableRoot.firstChild.remove();
      }

      // Add new children
      tableRoot.appendChild(tableHead);
      tableRoot.appendChild(tableBody);
    }

    const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

    // Display, position, and set styles for font
    tooltipEl.style.opacity = 1;
    tooltipEl.style.left = positionX + tooltip.caretX + 'px';
    tooltipEl.style.top = positionY + tooltip.caretY + 'px';
    tooltipEl.style.font = tooltip.options.bodyFont.string;
    tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
  };

  const renderTrends = (trends: RedesTrend[]) => {
    console.log("renderTrends: Renderizando tendencias con datos:", trends);

    const chartData = {
      labels: trends.map(trend => `#${trend.hashtag}`),
      datasets: [
        {
          label: 'Menciones',
          data: trends.map(trend => trend.mentions),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: true,
          text: 'Tendencias Principales',
        },
        tooltip: {
          enabled: false, // Deshabilitar el tooltip predeterminado
          position: 'nearest' as const,
          external: externalTooltipHandler,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    const chartJsx = (
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Tendencias Principales</h3>
        <div style={{ width: '100%', height: '300px' }}>
          <Bar data={chartData} options={options} />
        </div>
      </div>
    );
    console.log("renderTrends: JSX del gráfico generado:", chartJsx);
    return chartJsx;
  };

  console.log("Render principal: isLoading:", isLoading, ", error:", error, ", data:", data);
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
      <DolarRates />
      <div className="border-b border-gray-200 mb-8 pb-4">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Redes</h2>
        <p className="text-gray-600 mt-2">{data.summary}</p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-sm text-gray-500 mb-4">Última actualización: {data.date}</p>
        {renderTrends(data.trends)}
      </div>
    </main>
  );
};

export default Redes;
