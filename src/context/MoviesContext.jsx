import { createContext, useState, useContext } from 'react';

// Create Movies Context
const MoviesContext = createContext();

// Provider Component
export const MoviesProvider = ({ children }) => {
  const [filter, setFilter] = useState({});
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <MoviesContext.Provider value={{ filter, setFilter, data, setData, loading, setLoading }}>
      {children}
    </MoviesContext.Provider>
  );
};

// Custom Hook to use Movies Context
export const useMovies = () => useContext(MoviesContext);