export const trendingMovies = async () => {
	const api = `https://api.themoviedb.org/3/trending/movie/day?api_key=${import.meta.env.VITE_API_KEY}&page=1`;
	try {
		const response = await fetch(api)
	const data = await response.json()
	return data
	} catch (e) {
		console.log(e)
	}
}