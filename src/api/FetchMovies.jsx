import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/',
  params: {
    api_key: import.meta.env.VITE_API_KEY,
    include_adult: false,
  },
});

export const FetchMovies = async (genre, withoutGenre, page, filter) => {
  try {
    console.log(withoutGenre);
    const res = await api.get('3/discover/movie', {
      params: {
        with_genres: genre,
        page,
        sort_by: filter.sortBy || 'popularity.desc',
        with_original_language: filter.language || '',
        'vote_average.lte': filter.voteAvLte || 10,
        'vote_average.gte': filter.voteAvGte || 0,
        'release_date.gte': filter.releaseGte || '',
        without_genres: withoutGenre || 'animation',
      },
    });
    return res;
  } catch (e) {
    console.log(e);
  }
};