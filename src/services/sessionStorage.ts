export interface SavedSession {
  id: string;
  title: string;
  date: string;
  duration: string;
  audioUrl: string;
}

const STORAGE_KEY = 'saved_sessions';

export const saveSession = (session: SavedSession): void => {
  const savedSessions = getSavedSessions();
  const existingIndex = savedSessions.findIndex(s => s.id === session.id);
  
  if (existingIndex >= 0) {
    savedSessions[existingIndex] = session;
  } else {
    savedSessions.push(session);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(savedSessions));
};

export const getSavedSessions = (): SavedSession[] => {
  const savedSessions = localStorage.getItem(STORAGE_KEY);
  return savedSessions ? JSON.parse(savedSessions) : [];
};

export const deleteSession = (sessionId: string): void => {
  const savedSessions = getSavedSessions();
  const filteredSessions = savedSessions.filter(session => session.id !== sessionId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredSessions));
}; 