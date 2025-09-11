
import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selectedCategory, onSelectCategory }) => {
  const allCategories = ['Todas', ...categories];

  return (
    <nav className="border-b border-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-14 space-x-6 md:space-x-10 overflow-x-auto">
          {allCategories.map((category) => (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`uppercase text-xs md:text-sm tracking-wider font-semibold whitespace-nowrap transition-colors duration-200 ease-in-out
                ${selectedCategory === category
                  ? 'text-black'
                  : 'text-secondary hover:text-black'
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default CategoryFilter;