import { useState, useEffect } from "react";
import { Toast } from "./Toast";
import { FaStar } from "react-icons/fa";
import { MdReport } from "react-icons/md";
import { H3 } from "./H3";
import { NavLink } from 'react-router-dom'
export const MovieDetailsB = ({ loader, genreList }) => {
  const { overview, genres, vote_average, poster_path, release_date, vote_count, status, homepage, id, videos, title } = loader();

  const watchlist = JSON.parse(localStorage.getItem("watchlist")) || {};
  const [toast, setToast] = useState(null);
  const [watchStatus, setWatchStatus] = useState("");
  const isInWatchlist = Object.hasOwn(watchlist, id);

  const trailer =
    videos.results.find(
      (video) =>
        video.site === "YouTube" &&
        video.type === "Trailer" &&
        video.name.toLowerCase().includes("official")
    ) ||
    videos.results.find(
      (video) => video.site === "YouTube" && video.type === "Trailer"
    ) || [];

  const searchOnlineUrl = `https://www.google.com/search?q=watch ${title}`;
  const releaseDate = new Date(release_date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    if (isInWatchlist) {
      setWatchStatus(watchlist[id].watchStatus || "");
    }
  }, [id, isInWatchlist]);

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000); // Automatically dismiss the toast after 4 seconds
  };

  const handleAddwatchlist = (e) => {
    if (!watchStatus) {
      showToast("Please select a watch status before adding to the watchlist.", "error");
      return;
    }

    if (isInWatchlist) {
      delete watchlist[id];
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
      e.target.innerText = "Add to watchlist";
      showToast("Removed from watchlist", "success");
    } else {
      watchlist[id] = { id, vote_average, poster_path, watchStatus };
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
      e.target.innerText = "Remove";
      showToast("Added to watchlist", "success");
    }
  };

  const handleWatchStatusChange = (e) => {
    const newStatus = e.target.value;
    setWatchStatus(newStatus);

    if (isInWatchlist) {
      watchlist[id].watchStatus = newStatus;
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
      showToast("Watchlist updated!", "success");
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 justify-center items-center gap-3 max-w-sm mx-auto text-[14px]">
        <select
          className="bg-white text-center text-black font-bold outline-none py-2 rounded"
          onChange={handleWatchStatusChange}
          value={watchStatus}
        >
          <option value="" disabled>
            Watch status
          </option>
          <option value="Interested">Interested</option>
          <option value="Watching">Watching</option>
          <option value="Watched">Watched</option>
        </select>
        <button
          onClick={(e) => handleAddwatchlist(e)}
          className="w-full my-5 bg-theme font-bold py-2 rounded"
        >
          {isInWatchlist ? "Remove" : "Add to watchlist"}
        </button>
      </div>

      <H3 label="Overview" cls="mt-5 md:hidden" />
      <p className="md:hidden">{overview}</p>
      <H3 label="Release status" cls="mt-5" />
      <p
        className={`${
          status === "Released"
            ? "bg-green-500"
            : status === "Upcoming"
            ? "bg-white text-black"
            : status === "Cancelled"
            ? "bg-red-500"
            : "bg-yellow-500"
        } px-3 py-1 inline-block font-bold rounded-full text-[13px]`}
      >
        {status}
      </p>
      <H3 label="Release date" cls="mt-5" />
      <p>{releaseDate}</p>
      <H3 label="Vote count" cls="mt-5" />
      <p className="flex items-center gap-1">
        {vote_count} <FaStar className="text-yellow-400" />
      </p>
      {
      	genreList && <H3 label="Genres" cls="mt-5 md:hidden" />
      }
      <p className="md:hidden">{genreList}</p>

          <H3 label={trailer.name} cls="my-5" />
          <div className="relative w-full pb-[56.25%]">
            {
            	trailer && <iframe
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title="Trailer"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full rounded-2xl"
            />
            }
          </div>


      <div className="flex justify-center gap-3 mt-14">
        <a
          href={searchOnlineUrl}
          target="_blank"
          className="px-5 py-2 bg-green-600 font-bold"
        >
          Watch now
        </a>
        <a
          href={homepage}
          target="_blank"
          className="px-5 py-2 bg-blue-500 font-bold"
        >
          Home Page
        </a>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} />}
      <div className="group w-fit right-[5%] bottom-[5%] fixed">
  <div className="group relative text-2xl p-2 bg-white text-theme rounded-full hover:scale-90 transition duration-300 shadow-3xl ease-in">
  <NavLink to="/contact">
    <MdReport className="text-2xl" />
  </NavLink>
  {/* Left Tooltip */}
  <div className="absolute font-bold top-1/2 right-full mr-2 transform -translate-y-1/2 scale-0 group-hover:scale-100 transition duration-300 bg-white text-black w-auto whitespace-nowrap delay-200 text-sm px-2 py-1 rounded-md shadow-lg">
    Report a problem
  </div>
</div>
</div>
    </>
  );
};