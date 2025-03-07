import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiShare2, FiStar, FiInfo } from 'react-icons/fi';
import { getToolById } from '../data/tools';
import ToolNotFound from '../components/tools/ToolNotFound';
import { useRecentTools } from '../contexts/RecentToolsContext';
import { useFavorites } from '../contexts/FavoritesContext';
import ShareModal from '../components/ui/ShareModal';

export default function ToolPage() {
  const { toolId } = useParams();
  const navigate = useNavigate();
  const { addRecentTool } = useRecentTools();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [tool, setTool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  
  useEffect(() => {
    // Get tool and update recent tools
    const foundTool = getToolById(toolId);
    setTool(foundTool);
    setLoading(false);
    
    if (foundTool) {
      addRecentTool(foundTool.id);
      document.title = `${foundTool.name} - Toolify`;
    } else {
      document.title = "Tool Not Found - Toolify";
    }
    
    return () => {
      document.title = "Toolify - Useful Web Tools";
    };
  }, [toolId, addRecentTool]);
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading tool...</p>
      </div>
    );
  }
  
  if (!tool) {
    return <ToolNotFound />;
  }
  
  // Dynamically import the tool component
  const ToolComponent = React.lazy(() => import(`../components/tools/${tool.component}`));
  
  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="flex items-center mb-6">
        <Link to="/" className="flex items-center text-blue-600 dark:text-blue-400 hover:underline">
          <FiArrowLeft className="mr-2" />
          Back to Tools
        </Link>
      </nav>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">{tool.name}</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">{tool.description}</p>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowInstructions(!showInstructions)}
                className="btn btn-ghost text-sm flex items-center"
                aria-label="Show instructions"
              >
                <FiInfo className="mr-1" />
                Help
              </button>
              
              <button
                onClick={() => toggleFavorite(tool.id)}
                className={`btn btn-ghost text-sm flex items-center ${
                  isFavorite(tool.id) ? 'text-yellow-500' : ''
                }`}
                aria-label={isFavorite(tool.id) ? "Remove from favorites" : "Add to favorites"}
              >
                <FiStar className="mr-1" />
                {isFavorite(tool.id) ? 'Favorited' : 'Favorite'}
              </button>
              
              <button
                onClick={() => setShowShareModal(true)}
                className="btn btn-ghost text-sm flex items-center"
                aria-label="Share tool"
              >
                <FiShare2 className="mr-1" />
                Share
              </button>
            </div>
          </div>
          
          {showInstructions && (
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md">
              <h3 className="font-semibold mb-2">How to use:</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">{tool.instructions}</p>
            </div>
          )}
        </div>
        
        <div className="p-6">
          <React.Suspense fallback={
            <div className="flex justify-center items-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
            </div>
          }>
            <ToolComponent />
          </React.Suspense>
        </div>
      </div>
      
      {showShareModal && (
        <ShareModal
          tool={tool}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </div>
  );
}