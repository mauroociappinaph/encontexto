import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  onSearchClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearchClick }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu

  const getSectionTitle = (pathname: string) => {
    switch (pathname) {
      case '/analisis':
        return 'ANÁLISIS';
      case '/george':
        return 'GEORGE';
      case '/alotato':
        return 'A LO TATO';
      case '/redes':
        return 'REDES';
      case '/quienessos':
        return 'QUIÉN ES QUIÉN';
      case '/zoom':
        return 'ZOOM';
      default:
        return 'NOTICIAS';
    }
  };

  const sectionTitle = getSectionTitle(location.pathname);

  return (
    <header className="border-b border-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex justify-between items-center h-16">
          <div className="text-xl font-semibold tracking-widest uppercase">
            <Link to="/">En Contexto</Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium tracking-wider uppercase">
            <Link to="/" className="font-serif hover:text-secondary transition-colors">Noticias</Link>
            <Link to="/analisis" className="font-serif hover:text-secondary transition-colors">Análisis</Link>
            <Link to="/george" className="font-serif hover:text-secondary transition-colors">George</Link>
            <Link to="/alotato" className="font-serif hover:text-secondary transition-colors">A lo Tato</Link>
            <Link to="/redes" className="font-serif hover:text-secondary transition-colors">Redes</Link>
            <Link to="/quienessos" className="font-serif hover:text-secondary transition-colors">QUIÉN ES QUIÉN</Link>
            <Link to="/zoom" className="font-serif hover:text-secondary transition-colors">Zoom</Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-black focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-white z-50 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
        <div className="flex justify-end p-4">
          <button onClick={() => setIsOpen(false)} className="text-black focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <nav className="flex flex-col items-center space-y-6 text-lg font-medium tracking-wider uppercase mt-8">
          <Link to="/" className="font-serif hover:text-secondary transition-colors" onClick={() => setIsOpen(false)}>Noticias</Link>
          <Link to="/analisis" className="font-serif hover:text-secondary transition-colors" onClick={() => setIsOpen(false)}>Análisis</Link>
          <Link to="/george" className="font-serif hover:text-secondary transition-colors" onClick={() => setIsOpen(false)}>George</Link>
          <Link to="/alotato" className="font-serif hover:text-secondary transition-colors" onClick={() => setIsOpen(false)}>A lo Tato</Link>
          <Link to="/redes" className="font-serif hover:text-secondary transition-colors" onClick={() => setIsOpen(false)}>Redes</Link>
          <Link to="/quienessos" className="font-serif hover:text-secondary transition-colors" onClick={() => setIsOpen(false)}>QUIÉN ES QUIÉN</Link>
          <Link to="/zoom" className="font-serif hover:text-secondary transition-colors" onClick={() => setIsOpen(false)}>Zoom</Link>
        </nav>
      </div>
      
      {/* Main title */}
      <div className="py-12 md:py-16 text-center border-t border-primary">
        <h1 className="font-serif text-7xl sm:text-8xl md:text-9xl tracking-tighter font-bold">
          {sectionTitle}
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-black font-medium italic">
          ¡No te quedes solo con el título, el análisis es lo que te empodera!
        </p>
      </div>
    </header>
  );
};

export default Header;