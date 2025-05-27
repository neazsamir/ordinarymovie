import { useInfiniteQuery } from '@tanstack/react-query'
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { SearchAPI } from '../api/SearchAPI'
import { FaMagnifyingGlass } from "react-icons/fa6"
import { Loader } from '../components/ui/Loader'
import { MovieCard } from '../components/ui/MovieCard'
import useScrollRestore from '../hooks/useScrollRestore';
import { handleMovieCardClick as saveAndNavigate } from '../utils/scrollHelper';


export const SearchResult = () => {
	const location = useLocation()
	const { query } = useParams()
	const [aiResponse, setAiResponse] = useState(null)
	const [aiLoading, setAiLoading] = useState(false)
	const [searchQuery, setSearchQuery] = useState('')
	const navigate = useNavigate()
	const loaderRef = useRef()
	const findCorrNameOnGGL = `https://www.google.com/search?q=${query} movie`;
	
	
	useEffect(() => {
	const getAiQuery = async () => {
		setAiLoading(true)
		try {
			const res = await fetch(`http://localhost:3000/api/v1/ai_query/${query}`)
			const data = await res.json() || null
			setAiResponse(data?.response || null)
			console.log(data)
		} catch (err) {
			setAiResponse(null)
		} finally {
			setAiLoading(false)
		}
	}
	setSearchQuery(query?.replaceAll('+', ' ') || '')
	getAiQuery()
	}, [query])
	
	useEffect(() => {
	  if (searchQuery === aiResponse) setAiResponse(null)
	}, [aiResponse, searchQuery])
	
	
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		status,
		isLoading,
	} = useInfiniteQuery({
		queryKey: ['search', query],
		queryFn: ({ pageParam = 1 }) => SearchAPI(query?.replaceAll('+', ' '), pageParam),
		enabled: !!query, // Only run when query param exists
		getNextPageParam: (lastPage) => {
			if (lastPage.page < lastPage.total_pages) return lastPage.page + 1
			return undefined
		}
	})
	// Load more on scroll
	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				if (entries[0].isIntersecting && hasNextPage) {
					fetchNextPage()
				}
			},
			{ threshold: 1 }
		)
		if (loaderRef.current) observer.observe(loaderRef.current)
		return () => loaderRef.current && observer.unobserve(loaderRef.current)
	}, [fetchNextPage, hasNextPage])


	
	

	// Form submit
	const handleSubmit = (e) => {
		e.preventDefault()
		if (!searchQuery.trim()) return
		navigate(`/s/${searchQuery?.trim()?.replaceAll(' ', '+')}`)
	}

	const totalResults = data?.pages?.[0]?.total_results || 0



useScrollRestore(status === 'success');


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
							<button className="text-gray-600 hover:text-gray-800" type="submit">
								<FaMagnifyingGlass size={20} />
							</button>
						</div>
					</div>
				</form>
		{ !aiLoading && aiResponse &&	<h2 className="mt-5 text-sm">Did you mean: <Link to={`/s/${aiResponse?.trim()?.replaceAll(' ', '+')}`} className="font-bold text-blue-300 text-[16px]">{aiResponse}</Link></h2>}
				{status === 'success' && !isLoading && !aiLoading && totalResults > 0 ? (
					<h3 className="font-bold text-center text-2xl mt-5">{totalResults} Movie(s) found</h3>
				) : !aiLoading && !isLoading ? (
					<div className="font-bold text-white text-center mt-[80%]">
						No movie found! please <a className="text-theme" href={findCorrNameOnGGL} target="_blank">check the correct name</a> and try again.
					</div>
				) : ''}

				<div className="mt-3 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2 lg:gap-4">
					{data?.pages.map(page =>
						page.results.map(movie => (
							<MovieCard key={movie.id}
              movie={movie}
              onClick={() => saveAndNavigate(movie.id, navigate)} />
						))
					)}
				</div>

				<div ref={loaderRef} className="flex justify-center my-5">
					{isFetchingNextPage && <Loader />}
				</div>
			</div>
			{isLoading || aiLoading && <Loader />}
		</>
	)
}