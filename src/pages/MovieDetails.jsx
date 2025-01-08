import { useLoaderData } from 'react-router-dom';
import { MovieDetailsA } from '../components/ui/MovieDetailsA'
import { MovieDetailsB } from '../components/ui/MovieDetailsB'
export const MovieDetails = () => {
   const {genres} = useLoaderData();
  const genreList = genres.map(genre => genre.name).join(', ');
  return (
    <div className="mb-10">
    <MovieDetailsA loader={useLoaderData} genreList={genreList} />
    <MovieDetailsB loader={useLoaderData} genreList={genreList} />
    </div>
  );
};