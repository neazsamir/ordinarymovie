import { useNavigate } from 'react-router-dom';
import { FaStar, FaBookmark } from "react-icons/fa";

export const MovieCard = ({ movie, onClick }) => {
  const { poster_path, id, vote_average, title } = movie;
  const watchlistLS = JSON.parse(localStorage.getItem('watchlist') || '{}');
  const isInWatchlist = watchlistLS.hasOwnProperty(id)
  const watchStatus = watchlistLS[id]?.watchStatus;
 


  return (

      <div onClick={onClick} className="relative z-0 bg-white text-black rounded-2xl p-2 ">
      <div className="h-full flex flex-col justify-between">
        <img
          className="w-full mb-2 rounded-2xl"
          src={`https://image.tmdb.org/t/p/original${poster_path}`}
          onError={(e) => (e.target.src = 'https://i.imgur.com/sYhwMdk.jpeg')}
          alt={title}
        />
        <h3 className="font-bold justify-center flex items-center gap-1 text-[22px]">
          {vote_average && vote_average.toFixed(1) || "0"} <FaStar className="text-yellow-400" />
        </h3>
        </div>
        {isInWatchlist && (
          <div className={`${watchStatus === "Watching" ? "bg-green-500" : watchStatus === "Watched" ? "bg-theme" : "bg-yellow-500"} rounded-full px-2 font-bold py-1 text-white text-[10px] flex justify-center items-center gap-1 absolute right-0 top-0`}>
            <FaBookmark /> {watchStatus}
          </div>
        )}
      </div>

  );
};