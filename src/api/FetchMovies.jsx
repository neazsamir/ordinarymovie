import axios from 'axios'

const api = axios.create({
	baseURL:'https://api.themoviedb.org/',
	params: {
		api_key: 
		'ff41e03a28fcfd6e6fa3fbf1da8961f2',
		include_adult: false,
	}
})

export const fetchMovies = async (genre, page, filter) => {
	try {
		const res = await api.get(	`3/discover/movie`, {
		params: {
		with_genres: genre,
		page,
		sort_by: filter.sortBy || 'popularity.desc',
		with_original_language: filter.language || '',
		}
	})
		console.log(filter.language)
	return res
	} catch (e) {
		console.log(e)
	}
}