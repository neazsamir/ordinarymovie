import { MovieCard } from '../components/ui/MovieCard'

export const Watchlist = () => {
	const watchlist = Object.values(JSON.parse(localStorage.getItem("watchlist")) || []);
	
	return (
		<div className="my-7">
			{!watchlist.length ? (
				<div className="font-bold text-white text-center mt-[80%]">
					No movie yet!
				</div>
			) : (
				<div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2 lg:gap-4">
					{watchlist.map(movie => (
						<MovieCard key={movie.id} movie={movie} />
					))}
				</div>
			)}
		</div>
	)
}