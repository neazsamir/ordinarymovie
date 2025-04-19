import React, { useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useMovies } from '../context/MoviesContext';
import { FetchMovies } from '../api/FetchMovies';
import { MovieCard } from '../components/ui/MovieCard';
import { Loader } from '../components/ui/Loader';
import { Modal } from '../components/ui/Modal';
import { Pagination } from '../components/ui/Pagination';
import useScrollRestore from '../hooks/useScrollRestore';
import { handleMovieCardClick as saveAndNavigate } from '../utils/scrollHelper';

export const MoviesComponent = () => {
  const { filter, setFilter, data, setData, loading, setLoading } = useMovies();
  const { genre, page } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const cacheKey = `${genre}-${page || 1}-${JSON.stringify(filter)}`;
  const isDataAvailable = data[cacheKey];

  useScrollRestore(isDataAvailable);

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await FetchMovies(genre, location.state, page || 1, filter);
      setData(p => ({ ...p, [cacheKey]: res.data.results }));
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isDataAvailable) {
      fetch();
    }
  }, [genre, location.state, page, filter, isDataAvailable]);

  return (
    <div className="my-7">
      <Modal filter={filter} setFilter={setFilter} isLoading={loading} />
      {loading || !isDataAvailable ? (
        <Loader />
      ) : isDataAvailable.length <= 0 ? (
        <div className="font-bold text-white text-center mt-[80%]">
          Request failed! Please adjust your filter or genre.
        </div>
      ) : (
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2 lg:gap-4">
          {isDataAvailable.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={() => saveAndNavigate(movie.id, navigate)}
            />
          ))}
        </div>
      )}
      <Pagination isLoading={loading} />
    </div>
  );
};

export const Movies = React.memo(MoviesComponent);