import tvShowGenres from '../api/tvShowGenre.json'
import movieGenres from '../api/movieGenre.json'
import { Button } from '../components/ui/Button'
export const Genre = () => {
	return (
		<div className="mb-5">
		<h1 className="text-3xl text-center mt-14 mb-5 font-bold">
		What do you want to watch today?
		</h1>
		<FilterGenre subHead="Movies" arr={movieGenres} />
		<FilterGenre subHead="TV Shows" arr={tvShowGenres} />
		</div>
	)
}
const FilterGenre = ({arr, subHead}) => {
	return (
		<div>
		<h2 className="my-5 font-bold text-2xl text-center">
		{subHead}
		</h2>
	<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-5 gap-x-2 lg:gap-x-3 lg:gap-y-6 ">
		{
		arr.map((genre) => {
	const { id, name } = genre;
	return <Button to={`/movies/${id}/1`} text={name} addition="rounded-2xl text-[80%] md:text-[85%] xl:text-[100%] text-center flex items-center justify-center" />
	})
	}
	</div>
	</div>
	)
}