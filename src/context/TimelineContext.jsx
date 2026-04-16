import { createContext, useContext, useState } from 'react';

const TimelineContext = createContext();

export const TimelineProvider = ({ children }) => {
  const [entries, setEntries] = useState([]);

  // Add new timeline entry (Call, Text, or Video)
  const addEntry = (friendName, type) => {
    const newEntry = {
      id: Date.now(),
      friendName: friendName,
      type: type, // "Call", "Text", or "Video"
      date: new Date().toISOString(),
      title: `${type} with ${friendName}`,
    };
    setEntries([newEntry, ...entries]);
    return newEntry;
  };

  // Delete entry
  const deleteEntry = (id) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  return (
    <TimelineContext.Provider value={{ entries, addEntry, deleteEntry }}>
      {children}
    </TimelineContext.Provider>
  );
};

export const useTimeline = () => {
  const context = useContext(TimelineContext);
  if (!context) {
    throw new Error('useTimeline must be used within TimelineProvider');
  }
  return context;
};