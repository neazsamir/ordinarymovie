import { SearchAPI } from '../api/SearchAPI'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Loader } from '../components/ui/Loader';
import { MovieCard } from '../components/ui/MovieCard'

export const SearchResult = () => {
	const { query } = useParams()
	const [searchQuery, setSearchQuery] = useState(query || '')
	const [data, setData] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const navigate = useNavigate()
	const correctName = `https://www.google.com/search?q=${query} movie`;
	const [history, setHistory] = useState(JSON.parse(localStorage.getItem("searchHistory")) || [])
	// Fetch data
	const fetch = async () => {
		if (!searchQuery) return
		setIsLoading(true)
		try {
			const res = await SearchAPI(searchQuery.trim())
			setData(res)
			console.log(res)
			if (!history.includes(query)) localStorage.setItem("searchHistory", JSON.stringify([query.trim(), ...history]))
		} catch (e) {
			console.log(e)
		} finally {
			setIsLoading(false)
		}
	}

	// Effect to trigger the fetch when query changes
	useEffect(() => {
		if (query) {
			setSearchQuery(query.replace('+', ' '))
			fetch()
		}
	}, [query])

	// Handle search form submission
	const handleSubmit = (e) => {
		e.preventDefault()
		navigate(`/s/${searchQuery.replace(' ', '+')}`)
	}

	return (
		<>
			<div className="my-5">
				<form onSubmit={handleSubmit}>
					<div className="flex items-center justify-center">
						<div className="flex items-center bg-gray-300 rounded-md max-w-[450px] w-full px-3">
							<input
								required
								type="search"
								className="bg-transparent outline-none flex-grow py-2 text-black"
								placeholder="Search..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
							<button
								className="text-gray-600 hover:text-gray-800"
								type="submit"
							>
								<FaMagnifyingGlass size={20} />
							</button>
						</div>
					</div>
				</form>
				<div>
				{data && data.total_results > 0 ? <h3 className="font-bold text-center text-2xl mt-5" >{data.total_results} Movie(s) found</h3> : <div className="font-bold text-white text-center mt-[80%]">
          No movie found! please <a className="text-theme" href={correctName} target="_blank">check the correct name</a> and try again.
        </div>}
				<div className="mt-3 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2 lg:gap-4">
					{
						data && data.results && data.results.map(movie => (
							<MovieCard key={movie.id} movie={movie} />
						))
					}
				</div>
				</div>
			</div>
			{isLoading && <Loader />}
		</>
	)
}