import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ToolCard from '../components/tools/ToolCard';
import CategoryFilter from '../components/filters/CategoryFilter';
import RecentTools from '../components/tools/RecentTools';
import FavoriteTools from '../components/tools/FavoriteTools';
import { getAllTools } from '../data/tools';
import { getCategories } from '../data/categories';

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const [tools, setTools] = useState([]);
  const [filteredTools, setFilteredTools] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Initialize tools
  useEffect(() => {
    const allTools = getAllTools();
    setTools(allTools);
    setFilteredTools(allTools);
  }, []);
  
  // Handle URL parameters
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');
    
    if (categoryParam) {
      setActiveCategory(categoryParam);
    } else {
      setActiveCategory('all');
    }
    
    if (searchParam) {
      setSearchQuery(searchParam);
    } else {
      setSearchQuery('');
    }
  }, [searchParams]);
  
  // Filter tools based on active category and search query
  useEffect(() => {
    let filtered = [...tools];
    
    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(tool => tool.category === activeCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(tool => 
        tool.name.toLowerCase().includes(query) || 
        tool.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredTools(filtered);
  }, [tools, activeCategory, searchQuery]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Useful Web Tools for Everyday Tasks
      </h1>
      
      <div className="mb-8">
        <CategoryFilter 
          activeCategory={activeCategory}
          categories={getCategories()}
        />
      </div>
      
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
        <div className="md:col-span-9">
          {searchQuery && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">
                Search Results for "{searchQuery}"
              </h2>
              {filteredTools.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400">
                  No tools found matching your search. Try a different query.
                </p>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">
                  Found {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''}
                </p>
              )}
            </div>
          )}
          
          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map(tool => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          ) : (
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center">
              <h3 className="text-xl font-semibold mb-2">No Tools Found</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try a different category or search term.
              </p>
            </div>
          )}
        </div>
        
        <div className="md:col-span-3">
          <div className="sticky top-6">
            <FavoriteTools />
            <RecentTools />
          </div>
        </div>
      </div>
    </div>
  );
}