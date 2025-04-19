import { useLoaderData, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { MovieCard } from '../components/ui/MovieCard';
import { Overlay } from '../components/ui/Overlay';
import { useGenres } from '../context/GenresContext'
import useScrollRestore from '../hooks/useScrollRestore';
import { handleMovieCardClick as saveAndNavigate } from '../utils/scrollHelper';
export const Home = () => {
	const { setExcludeGenre, setSelectedGenre } = useGenres()
	const resetGenres = () => {
		setExcludeGenre([])
		setSelectedGenre([])
	}
	const navigate = useNavigate()
    const [isVisible, setIsVisible] = useState(() => {
        const storedValue = localStorage.getItem("privacyNotShown");
        return storedValue !== null ? JSON.parse(storedValue) : true; // Show popup only if not set
    });

    const handleClick = () => {
        setIsVisible(false); // Hide the popup
        localStorage.setItem("privacyNotShown", JSON.stringify(false)); // Save preference to localStorage
    };

    const data = useLoaderData() || [];
    
    
    useScrollRestore(data?.results);
    
    
    
    return (
        <div>
            <h1 className="text-[30px] mt-3 leading-[40px] font-bold text-center">
                Find the best movie by genre
            </h1>
            <div className="my-10 m-auto w-fit">
                <Button onClick={resetGenres} to="/genre" text={'Get Started'} />
            </div>
            <h3 className="text-2xl mb-5 font-bold">Trending:</h3>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2 lg:gap-4">
                {data.results &&
                    data.results.map((movie, index) => {
                        return <MovieCard
              key={movie.id}
              movie={movie}
              onClick={() => saveAndNavigate(movie.id, navigate)}
              />
                    })}
            </div>

            {/* Popup */}
            <Overlay isVisible={isVisible} />
            {isVisible && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-lg px-4 py-2 w-[90%] max-w-sm max-h-[400px] z-30 text-[14px]">
                    <h2 className="text-2xl text-black font-bold mb-2">Privacy & Policy</h2>
                    <hr />
                    <p className="text-gray-700 font-semibold text-[12px] my-1">
                        By confirming, <br /> you are accepting our{" "}
                        <a
                            className="text-theme underline"
                            href="https://www.termsfeed.com/live/1bcbf453-8994-45dc-aeba-d180356d0f4b"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            privacy & policy
                        </a>.
                    </p>
                    <hr />
                    <div className="flex justify-end gap-3 mt-2">
                        <button
                            onClick={handleClick}
                            className="px-3 py-2 rounded bg-transparent text-theme font-semibold"
                        >
                            Reject
                        </button>
                        <button
                            onClick={handleClick}
                            className="font-bold bg-blue-500 rounded hover:scale-95 transition-all duration-300 ease-in text-white py-2 px-3"
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};