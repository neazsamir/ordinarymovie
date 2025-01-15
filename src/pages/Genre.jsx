import movieGenres from '../api/movieGenre.json'
import { Button } from '../components/ui/Button'
import { useState, useEffect } from 'react'
import { FaMagnifyingGlass } from "react-icons/fa6";
import { NavLink } from 'react-router-dom'
import { useMovies } from '../context/MoviesContext'
export const Genre = () => {
  const [selectedGenre, setSelectedGenre] = useState([])
  const [excludeGenre, setExcludeGenre] = useState([])
	const { setFilter, filter } = useMovies()
	useEffect(() => {
		setFilter({})
	console.log(setFilter, filter)
	}, [])
  const handleSelect = (id) => {
    // If the genre is excluded, return early to avoid selecting it
    if (excludeGenre.includes(id)) return
    setSelectedGenre((p) =>
      p.includes(id) ? p.filter((genreId) => genreId !== id) : [...p, id]
    )
  }

  const handleExclude = (id) => {
    // Exclude the genre
    setExcludeGenre((p) =>
      p.includes(id) ? p.filter((genreId) => genreId !== id) : [...p, id]
    )
    // Also remove it from selected genres if it's excluded
    setSelectedGenre((p) => p.filter((genreId) => genreId !== id))
  }

  return (
    <div className="mb-5">
      <h1 className="text-3xl text-center my-5 font-bold">
        What do you want to watch today?
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-5 gap-x-2 lg:gap-x-3 lg:gap-y-6">
        {movieGenres.map((genre) => {
          const { id, name } = genre
          const isSelected = selectedGenre.includes(id)
          const isExcluded = excludeGenre.includes(id)

          return (
            <button
              key={id}
              onDoubleClick={() => handleExclude(id)}
              onClick={() => handleSelect(id)}
              className={`rounded-2xl text-[80%] md:text-[85%] xl:text-[100%] text-center flex items-center justify-center font-bold px-5 py-2  active:scale-95 transition duration-300 ease-in ${
                isExcluded ? 'bg-gray-600' : isSelected ? 'bg-blue-500' : 'bg-theme'
              }`}
            >
              {name}
            </button>
          )
        })}
      </div>
      <div className="flex justify-center mt-5">
        {selectedGenre.length > 0 && (
          <NavLink className="font-bold rounded flex justify-center lg:hover:scale-95 transition duration-300 ease-in active:scale-95 gap-2 items-center bg-pink-500 py-2 px-5 shadow-3xl"
          to={`/movies/${selectedGenre.join(',')}/1`}
          	state={excludeGenre.join(',') || ''}
          ><FaMagnifyingGlass /> Proceed</NavLink>
        )}
    </div>
    </div>
  )
}