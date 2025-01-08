import { MovieCard } from '../components/ui/MovieCard';
import { fetchMovies } from '../api/FetchMovies';
import { Loader } from '../components/ui/Loader';
import { Modal } from '../components/ui/Modal';
import { useMovies } from '../context/MoviesContext';  // Import context hook
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

export const Movies = () => {
  const { filter, setFilter, data, setData, loading, setLoading } = useMovies();
  const { genre, page } = useParams();

  // Create a key based on genre, page, and filter for caching purposes
  const cacheKey = `${genre}-${page || 1}-${JSON.stringify(filter)}`;

  // Check if data is already available for the current genre, page, and filter
  const isDataAvailable = data[cacheKey];

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await fetchMovies(genre, page || 1, filter);
      setData(prevData => ({ ...prevData, [cacheKey]: res.data.results })); // Cache the results
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only fetch if there's no data cached for this genre, page, and filter combination
    if (!isDataAvailable) {
      fetch();
    }
  }, [genre, page, filter, isDataAvailable]);  // Only trigger fetch when necessary

  return (
    <div className="mt-10">
      <Modal filter={filter} setFilter={setFilter} isLoading={loading} />
      {loading || !isDataAvailable ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2 lg:gap-4">
          {isDataAvailable && isDataAvailable.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};