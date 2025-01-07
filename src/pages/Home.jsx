import { useLoaderData } from 'react-router-dom'
import { Button } from '../components/ui/Button';
import { MovieCard } from '../components/ui/MovieCard'
export const Home = () => {
	const data = useLoaderData() || []
	return (
		<div>
				<h1 className="text-[30.6px] mt-3 leading-[40px] font-bold text-center">
						Unlimited movies, TV shows, and more
				</h1>
				<div className="my-10 m-auto w-fit">
				<Button to="/genre" text={'Get Started'} />
			</div>
				<h3 className="text-2xl mb-5 font-bold">
				Trending:
				</h3>
				<div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2 lg:gap-4">
				{
					data.results.slice(0, 10).map((movie, index) => {
						return <MovieCard movie={movie} />
					})
				}
			</div>
			</div>
	)
}