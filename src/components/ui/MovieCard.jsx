import { NavLink } from 'react-router-dom'
import { FaStar } from "react-icons/fa";
export const MovieCard = ({movie}) => {
	const { poster_path, id, vote_average, title } = movie;
	return (
		<NavLink key={id} to={`/details/${id}`}>
		<div className="bg-white text-black rounded-2xl p-2 ">
			<img className="w-full mb-2 rounded-2xl" src={`https://image.tmdb.org/t/p/original${poster_path}.jpg`} alt={title} />
			<h3 className="font-bold justify-center flex items-center gap-1 text-[22px]">
				{vote_average.toFixed(1)} <FaStar className="text-yellow-400" />
			</h3>
		</div>
		</NavLink>
	)
}