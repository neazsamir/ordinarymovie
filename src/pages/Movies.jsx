import { MovieCard } from '../components/ui/MovieCard'
import { fetchMovies } from '../api/FetchMovies'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Loader } from '../components/ui/Loader'
import { Modal } from '../components/ui/Modal'
export const Movies = () => {
	const [filter, setFilter] = useState({})
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(true)
	const { page, genre } = useParams()

	const fetch = async () => {
		setLoading(true)
		try {
			console.log(filter)
			const res = await fetchMovies(genre, page || 1, filter)
			setData(res.data.results)
		} catch (e) {
			console.log(e)
		} finally {
			setLoading(false)
		}
	}
	useEffect(() => {
		fetch()
		console.log(filter)
	}, [genre, page, filter])
	return (
		<div className="mt-10">
		<Modal setFilter={setFilter} isLoading={loading} />
			{loading ? (
				<Loader />
			) : (
				<div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2 lg:gap-4">
					{data.map(movie => (
						<MovieCard key={movie.id} movie={movie} />
					))}
				</div>
			)}
		</div>
	)
}