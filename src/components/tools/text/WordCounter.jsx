import React, { useState, useEffect } from 'react';

export default function WordCounter() {
  const [text, setText] = useState('');
  const [stats, setStats] = useState({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0
  });
  
  // Calculate statistics when text changes
  useEffect(() => {
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    const sentences = text.trim() === '' ? 0 : (text.match(/[.!?]+/g) || []).length;
    const paragraphs = text.trim() === '' ? 0 : text.split(/\n+/).filter(p => p.trim() !== '').length;
    
    // Average reading speed is about 225 words per minute
    const readingTime = Math.ceil(words / 225);
    
    setStats({
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      readingTime
    });
  }, [text]);
  
  const handleTextChange = (e) => {
    setText(e.target.value);
  };
  
  const handleClear = () => {
    setText('');
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <label htmlFor="word-counter-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Enter or paste your text
          </label>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {stats.characters} characters
          </div>
        </div>
        
        <textarea
          id="word-counter-input"
          value={text}
          onChange={handleTextChange}
          className="input min-h-40 h-60"
          placeholder="Type or paste your text here..."
        ></textarea>
        
        <div className="flex justify-end space-x-2 mt-2">
          <button onClick={handleClear} className="btn btn-ghost text-sm">
            Clear
          </button>
          <button onClick={handleCopy} className="btn btn-ghost text-sm">
            Copy
          </button>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Text Statistics</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400">Words</div>
            <div className="text-2xl font-bold">{stats.words}</div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400">Characters</div>
            <div className="text-2xl font-bold">{stats.characters}</div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400">Characters (no spaces)</div>
            <div className="text-2xl font-bold">{stats.charactersNoSpaces}</div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400">Sentences</div>
            <div className="text-2xl font-bold">{stats.sentences}</div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400">Paragraphs</div>
            <div className="text-2xl font-bold">{stats.paragraphs}</div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400">Reading Time</div>
            <div className="text-2xl font-bold">{stats.readingTime} min</div>
          </div>
        </div>
      </div>
    </div>
  );
}