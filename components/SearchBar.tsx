import React, { useState } from 'react';

interface SearchBarProps {
  onSearchChange: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchChange }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearchChange(newQuery);
  };

  return (
    <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Buscar Noticias</h2>
        <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3" aria-hidden="true">
                <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </span>
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Buscar por palabra clave..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Buscar noticias"
            />
        </div>
    </div>
  );
};

export default SearchBar;
