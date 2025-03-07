import React from 'react';
import { Link } from 'react-router-dom';
import { FiStar } from 'react-icons/fi';
import { getCategoryById } from '../../data/categories';
import { useFavorites } from '../../contexts/FavoritesContext';

export default function ToolCard({ tool }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const category = getCategoryById(tool.category);
  
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(tool.id);
  };
  
  return (
    <Link 
      to={`/tool/${tool.id}`} 
      className="block bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform transition duration-200 hover:scale-[1.02] hover:shadow-lg"
    >
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold mb-1">{tool.name}</h3>
            <span className="inline-block px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 mb-2">
              {category?.name || 'Uncategorized'}
            </span>
          </div>
          
          <button
            onClick={handleFavoriteClick}
            className={`p-1.5 rounded-full transition-colors ${
              isFavorite(tool.id)
                ? 'text-yellow-500 hover:bg-yellow-100 dark:hover:bg-yellow-900/20'
                : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            aria-label={isFavorite(tool.id) ? "Remove from favorites" : "Add to favorites"}
          >
            <FiStar size={18} className={isFavorite(tool.id) ? "fill-current" : ""} />
          </button>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {tool.description}
        </p>
      </div>
    </Link>
  );
}