export const trendingMovies = async () => {
	const api = "https://api.themoviedb.org/3/trending/movie/day?api_key=ff41e03a28fcfd6e6fa3fbf1da8961f2&page=1";
	try {
		const response = await fetch(api)
	const data = await response.json()
	return data
	} catch (e) {
		console.log(e)
	}
}