import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onSearchClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearchClick }) => {
  return (
    <header className="border-b border-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex justify-between items-center h-16">
          <div className="text-xl font-semibold tracking-widest uppercase">
            <Link to="/">En Contexto</Link>
          </div>
          <nav className="flex items-center space-x-6 text-sm font-medium tracking-wider uppercase">
            <Link to="/" className="hover:text-secondary transition-colors">Noticias</Link>
            <Link to="/analisis" className="hover:text-secondary transition-colors">Análisis</Link>
            <Link to="/george" className="hover:text-secondary transition-colors">George</Link>
            <Link to="/alotato" className="hover:text-secondary transition-colors">A lo Tato</Link>
            <Link to="/redes" className="hover:text-secondary transition-colors">Redes</Link>
            <Link to="/quienessos" className="hover:text-secondary transition-colors">¿Y vos quién sos?</Link>
            <Link to="/zoom" className="hover:text-secondary transition-colors">Zoom</Link>
          </nav>
        </div>
      </div>
      
      {/* Main title */}
      <div className="py-12 md:py-16 text-center border-t border-primary">
        <h1 className="font-serif text-7xl sm:text-8xl md:text-9xl tracking-tighter font-bold">
          NOTICIAS
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-black font-medium italic">
          ¡No te quedes solo con el título, el análisis es lo que te empodera!
        </p>
      </div>
    </header>
  );
};

export default Header;