import { useLoaderData } from 'react-router-dom';
import { MovieDetailsA } from '../components/ui/MovieDetailsA';
import { MovieDetailsB } from '../components/ui/MovieDetailsB';

export const MovieDetails = () => {
  const loader = useLoaderData();
  const { genres } = loader || {};
  if (!loader || !genres) {
    return (
      <div className="font-bold text-white text-center mt-[80%]">
        Something went wrong! please try again later!
      </div>
    );
  }

  const genreList = genres.map(genre => genre.name).join(', ');
  return (
    <div className="mb-10">
      <MovieDetailsA loader={useLoaderData} genreList={genreList} />
      <MovieDetailsB loader={useLoaderData} genreList={genreList} />
    </div>
  );
};