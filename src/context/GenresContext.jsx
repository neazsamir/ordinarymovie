import { createContext, useState, useContext } from 'react';

const GenresContext = createContext();

export const GenresProvider = ({ children }) => {
  const [excludeGenre, setExcludeGenre] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState([]);

  return (
    <GenresContext.Provider value={{ excludeGenre, setExcludeGenre, selectedGenre, setSelectedGenre }}>
      {children}
    </GenresContext.Provider>
  );
};

export const useGenres = () => useContext(GenresContext);