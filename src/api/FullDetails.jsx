export const fullDetails = async ({params}) => {
	const api = `https://api.themoviedb.org/3/movie/${params.movieID}?api_key=ff41e03a28fcfd6e6fa3fbf1da8961f2&append_to_response=videos`;
	try {
		const response = await fetch(api)
	const data = await response.json()
	console.log(data)
	return data
	} catch (e) {
		console.log(e)
	}
}