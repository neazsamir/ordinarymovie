import { H3 } from './H3'
import { FaStar } from "react-icons/fa";
export const MovieDetailsB = ({ loader, genreList }) => {
	const { overview, genres, vote_average, poster_path, release_date, vote_count, homepage, id, videos, title } = loader()
	const watchlist = Object.values(JSON.parse(localStorage.getItem('watchlist')) || {})
	const trailer = videos.results.find(video =>
    video.site === 'YouTube' &&
    video.type === 'Trailer' &&
    video.name.toLowerCase().includes('official')
  ) || videos.results.find(video =>
    video.site === 'YouTube' &&
    video.type === 'Trailer'
  ) || [];
	const searchOnlineUrl = `https://www.google.com/search?q=watch ${title}`;
	const releaseDate = new Date(release_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

	// Check if the movie is already in the watchlist
	const isInWatchlist = Object.hasOwn(JSON.parse(localStorage.getItem('watchlist')) || {}, id);

	const handleAddwatchlist = (e) => {
		let currentWatchlist = JSON.parse(localStorage.getItem('watchlist')) || {};
		if (Object.hasOwn(currentWatchlist, id)) {
			delete currentWatchlist[id];
			localStorage.setItem('watchlist', JSON.stringify(currentWatchlist));
			e.target.innerText = "Add to watchlist";
			return;
		}
		currentWatchlist[id] = {
			id, 
			vote_average,  
			poster_path,
		};
		localStorage.setItem('watchlist', JSON.stringify(currentWatchlist));
		e.target.innerText = "Remove from watchlist";
	}

	return (
		<>
			<div className="w-fit m-auto">
        <button onClick={(e) => handleAddwatchlist(e)} className="px-3 py-2 text-[15px] my-5 bg-theme font-bold">
          {isInWatchlist ? "Remove from watchlist" : "Add to watchlist"}
        </button>
      </div>

      <H3 label="Overview" cls="mt-5 md:hidden" />
      <p className="md:hidden">{overview}</p>
      <H3 label="Release date" cls="mt-5" />
      <p> {releaseDate} </p>
      <H3 label="Vote count" cls="mt-5" />
      <p className="flex items-center gap-1"> {vote_count} <FaStar className="text-yellow-400" /> </p>
      <H3 label="Genres" cls="mt-5 md:hidden" />
      <p className="md:hidden">{genreList}</p>

      {trailer ? (
        <>
          <H3 label={trailer.name} cls="my-5" />
          <div className="relative w-full pb-[56.25%]">
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title="Trailer"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full rounded-2xl"
            />
          </div>
        </>
      ) : (
        <h3 className="text-white text-center mt-5 text-2xl font-bold">Trailer not available!</h3>
      )}

      <div className="flex justify-center gap-3 mt-14">
        <a href={searchOnlineUrl} target="_blank" className="px-5 py-2 bg-green-600 font-bold">
          Watch now
        </a>
        <a href={homepage} target="_blank" className="px-5 py-2 bg-blue-500 font-bold">
          Home Page
        </a>
      </div>
		</>
	)
}