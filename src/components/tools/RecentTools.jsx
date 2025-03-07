import React from 'react';
import { Link } from 'react-router-dom';
import { FiClock, FiX } from 'react-icons/fi';
import { useRecentTools } from '../../contexts/RecentToolsContext';
import { getToolById } from '../../data/tools';

export default function RecentTools() {
  const { recentTools, clearRecentTools } = useRecentTools();
  
  // Get full tool objects from IDs
  const recentToolsData = recentTools
    .map(id => getToolById(id))
    .filter(tool => tool !== undefined);
  
  if (recentToolsData.length === 0) {
    return null;
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold flex items-center">
          <FiClock className="mr-2" />
          Recently Used
        </h2>
        
        <button
          onClick={clearRecentTools}
          className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 cursor-pointer"
          aria-label="Clear recent tools"
        >
          <FiX size={16} />
        </button>
      </div>
      
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {recentToolsData.map(tool => (
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