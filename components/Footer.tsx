
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-primary mt-12">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-black text-sm">
        <p>&copy; {new Date().getFullYear()} En Contexto. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;