import React, { useState } from 'react';
import { FiX, FiLink, FiTwitter, FiMail, FiFacebook } from 'react-icons/fi';

export default function ShareModal({ tool, onClose }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = window.location.href;
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  const shareToTwitter = () => {
    const text = `Check out this useful tool: ${tool.name} on Toolify`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank');
  };
  
  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank');
  };
  
  const shareByEmail = () => {
    const subject = `Check out this tool: ${tool.name}`;
    const body = `I found this useful tool called ${tool.name} on Toolify: ${shareUrl}`;
    const url = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold">Share "{tool.name}"</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 cursor-pointer"
          >
            <FiX size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <label htmlFor="share-url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tool Link
            </label>
            <div className="flex">
              <input
                id="share-url"
                type="text"
                value={shareUrl}
                readOnly
                className="input flex-grow rounded-r-none"
              />
              <button
                onClick={handleCopyLink}
                className={`px-4 py-2 rounded-r flex items-center justify-center ${
                  copied
                    ? 'bg-green-500 text-white'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={shareToTwitter}
              className="flex flex-col items-center justify-center p-3 rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              <FiTwitter size={24} className="mb-1 text-blue-400" />
              <span className="text-xs">Twitter</span>
            </button>
            
            <button
              onClick={shareToFacebook}
              className="flex flex-col items-center justify-center p-3 rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              <FiFacebook size={24} className="mb-1 text-blue-600" />
              <span className="text-xs">Facebook</span>
            </button>
            
            <button
              onClick={shareByEmail}
              className="flex flex-col items-center justify-center p-3 rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              <FiMail size={24} className="mb-1 text-red-500" />
              <span className="text-xs">Email</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}