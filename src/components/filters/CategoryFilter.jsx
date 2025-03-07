import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

export default function CategoryFilter({ activeCategory, categories }) {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  
  const buildUrl = (categoryId) => {
    const params = new URLSearchParams();
    if (categoryId !== 'all') {
      params.set('category', categoryId);
    }
    if (searchQuery) {
      params.set('search', searchQuery);
    }
    
    const query = params.toString();
    return query ? `/?${query}` : '/';
  };
  
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <Link
        to={buildUrl('all')}
        className={`px-4 py-2 rounded-full ${
          activeCategory === 'all'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
        }`}
      >
        All Tools
      </Link>
      
      {categories.map(category => (
        <Link
          key={category.id}
          to={buildUrl(category.id)}
          className={`px-4 py-2 rounded-full ${
            activeCategory === category.id
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
}