import React from 'react';
import { Link } from 'react-router-dom';
import { FiStar } from 'react-icons/fi';
import { useFavorites } from '../../contexts/FavoritesContext';
import { getToolById } from '../../data/tools';

export default function FavoriteTools() {
  const { favorites } = useFavorites();
  
  // Get full tool objects from IDs
  const favoriteToolsData = favorites
    .map(id => getToolById(id))
    .filter(tool => tool !== undefined);
  
  if (favoriteToolsData.length === 0) {
    return null;
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center mb-3">
        <h2 className="text-lg font-semibold flex items-center">
          <FiStar className="mr-2 text-yellow-500" />
          Favorite Tools
        </h2>
      </div>
      
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {favoriteToolsData.map(tool => (
          <li key={tool.id}>
            <Link
              to={`/tool/${tool.id}`}
              className="block py-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded px-2 -mx-2"
            >
              <div className="text-sm font-medium">{tool.name}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {tool.description}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}