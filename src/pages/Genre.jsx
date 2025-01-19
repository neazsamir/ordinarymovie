import movieGenres from '../api/movieGenre.json'
import { Button } from '../components/ui/Button'
import { useState, useEffect } from 'react'
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaQuestion } from "react-icons/fa";
import { NavLink } from 'react-router-dom'
import { useMovies } from '../context/MoviesContext'
import { useGenres } from '../context/GenresContext'
export const Genre = () => {
  const { excludeGenre, setExcludeGenre, selectedGenre, setSelectedGenre } = useGenres()
	const { setFilter } = useMovies()
	useEffect(() => {
		setFilter({})
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
  
  const [isTutorialShown, setIsTutorialShown] = useState(
  JSON.parse(localStorage.getItem("isTutorialShown")) || false
);

const handleTutorial = () => {
	alert(
      "Feature Tutorial:\n" +
      "• Click on a genre to select.\n" +
      "• Double-click on a genre to exclude.\n" +
      "# You can select/exclude one or more.\n" +
      "• Finally, click on proceed to get started."
    );
    gtag('event', 'button_click', {
  'event_category': 'User Interaction',
  'event_label': 'Genre help'
});
}

useEffect(() => {
  if (!isTutorialShown) {
  	setTimeout(() => {
    handleTutorial()
    setIsTutorialShown(true);
    localStorage.setItem("isTutorialShown", JSON.stringify(true));
  	}, 500)
  }
}, []);
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
    <button onClick={handleTutorial} className="text-2xl p-2 bg-white text-theme rounded-full hover:scale-90 transition duration-300 fixed right-[5%] bottom-[5%] shadow-3xl ease-in">
    <FaQuestion />
    </button >
    </div>
  )
}