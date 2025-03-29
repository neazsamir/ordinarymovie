export const SearchAPI = async (q) => {
	const api = `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_API_KEY}&query=${q}&language=bn`
	try {
		const res = await fetch(api)
		return await res.json()
	} catch (e) {
		console.log(e)
	}
}