import { H3 } from './H3'
export const MovieDetailsB = ({loader, genreList}) => {
	const { overview, genres, videos, title } = loader()
	const trailer = videos.results.find(video =>
    video.site === 'YouTube' &&
    video.type === 'Trailer' &&
    video.name.toLowerCase().includes('official')
  ) || videos.results.find(video =>
    video.site === 'YouTube' &&
    video.type === 'Trailer'
  ) || [];
	const searchOnlineUrl = `https://www.google.com/search?q=watch ${title}`;
	return (
		<>
		     <div className="w-fit m-auto">
        <button className="px-5 py-3 my-5 bg-theme font-bold">
          Add to watchlist
        </button>
      </div>

      <H3 label="Overview" cls="mt-5 md:hidden" />
      <p className="md:hidden">{overview}</p>
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

      <div className="flex justify-center mt-14">
        <a href={searchOnlineUrl} target="_blank" className="px-5 py-2 bg-green-600 font-bold">
          Watch now
        </a>
      </div>
      </>
	)
}