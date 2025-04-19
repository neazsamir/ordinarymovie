export const fullDetails = async ({params}) => {
	const api = `https://api.themoviedb.org/3/movie/${params.movieID}?api_key=${import.meta.env.VITE_API_KEY}&append_to_response=videos`;
	try {
		const response = await fetch(api)
	const data = await response.json()
	return data
	} catch (e) {
		console.log(e)
	}
}