import React, { createContext, useState, useEffect, useContext } from 'react';

const RecentToolsContext = createContext();
const MAX_RECENT_TOOLS = 10;

export function RecentToolsProvider({ children }) {
  const [recentTools, setRecentTools] = useState(() => {
    const saved = localStorage.getItem('recentTools');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('recentTools', JSON.stringify(recentTools));
  }, [recentTools]);

  const addRecentTool = (toolId) => {
    setRecentTools(prev => {
      const filtered = prev.filter(id => id !== toolId);
      return [toolId, ...filtered].slice(0, MAX_RECENT_TOOLS);
    });
  };

  const clearRecentTools = () => {
    setRecentTools([]);
  };

  return (
    <RecentToolsContext.Provider value={{ recentTools, addRecentTool, clearRecentTools }}>
      {children}
    </RecentToolsContext.Provider>
  );
}

export function useRecentTools() {
  return useContext(RecentToolsContext);
}