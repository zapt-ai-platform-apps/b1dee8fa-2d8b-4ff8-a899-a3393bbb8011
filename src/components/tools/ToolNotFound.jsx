import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';

export default function ToolNotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-2xl font-bold mb-4">Tool Not Found</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
        Sorry, we couldn't find the tool you're looking for. It might have been removed or had its name changed.
      </p>
      <Link to="/" className="btn btn-primary inline-flex items-center">
        <FiHome className="mr-2" />
        Back to Tools
      </Link>
    </div>
  );
}