import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchModal from './components/SearchModal';
import Home from './components/Home'; // Importar el nuevo componente Home
import AboutUs from './components/AboutUs'; // Importar el nuevo componente AboutUs
import NewsDetail from './components/NewsDetail';
import AnalysisList from './components/AnalysisList';
import AnalysisDetail from './components/AnalysisDetail';
// Importar nuevos componentes de sección
import GeorgeList from './components/GeorgeList';
import GeorgeDetail from './components/GeorgeDetail';
import A_lo_TatoList from './components/A_lo_TatoList';
import A_lo_TatoDetail from './components/A_lo_TatoDetail';
import QuienEsQuienList from './components/QuienEsQuienList';
import QuienEsQuienDetail from './components/QuienEsQuienDetail';
import Redes from './components/Redes';
import ZoomList from './components/ZoomList';
import ZoomDetail from './components/ZoomDetail';

import { fetchNews } from './services/newsService';
import { NewsArticle } from './types';

const App: React.FC = () => {
  const [allNews, setAllNews] = useState<NewsArticle[]>([]);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  useEffect(() => {
    const getNews = async () => {
      try {
        const newsData = await fetchNews();
        setAllNews(newsData);
      } catch (err) {
        console.error('No se pudieron cargar las noticias en App.tsx', err);
      }
    };
    getNews();
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-white">
        <Header /* onSearchClick={() => setIsSearchModalOpen(true)} */ />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/analisis" element={<AnalysisList />} />
          <Route path="/analisis/:id" element={<AnalysisDetail />} />
          {/* Nuevas rutas de sección */}
          <Route path="/george" element={<GeorgeList />} />
          <Route path="/george/:id" element={<GeorgeDetail />} />
          <Route path="/alotato" element={<A_lo_TatoList />} />
          <Route path="/alotato/:id" element={<A_lo_TatoDetail />} />
          <Route path="/quienessos" element={<QuienEsQuienList />} />
          <Route path="/quienessos/:id" element={<QuienEsQuienDetail />} />
          <Route path="/redes" element={<Redes />} />
          <Route path="/zoom" element={<ZoomList />} />
          <Route path="/zoom/:id" element={<ZoomDetail />} />
          {/* Rutas existentes */}
          <Route path="/noticias/:id" element={<NewsDetail />} />
        </Routes>
        <Footer />
        {/* <SearchModal 
          isOpen={isSearchModalOpen}
          onClose={() => setIsSearchModalOpen(false)}
          news={allNews}
        /> */}
      </div>
    </BrowserRouter>
  );
};

export default App;