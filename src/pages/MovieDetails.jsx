import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useLoaderData, useLocation, NavLink } from "react-router-dom";
import { H3 } from "../components/ui/H3";
import { Overlay } from "../components/ui/Overlay";
import { Toast } from "../components/ui/Toast";
import { FaStar } from "react-icons/fa";
import { MdReport } from "react-icons/md";

export const MovieDetails = () => {
  const loader = useLoaderData();
  const location = useLocation();
  const {
    id,
    title,
    poster_path,
    runtime,
    original_language,
    vote_average,
    overview,
    genres,
    vote_count,
    release_date,
    status,
    homepage,
    videos
  } = loader || {};

  if (!loader || !genres) {
    return (
      <div className="font-bold text-white text-center mt-[80%]">
        Something went wrong! Please try again later!
      </div>
    );
  }

  const genreList = genres.map((genre) => genre.name).join(", ");
  const language =
    new Intl.DisplayNames(["en"], { type: "language" }).of(original_language) ||
    "Unknown";
  const imgUrl = "https://image.tmdb.org/t/p/original";
  const [isFullscreen, setIsFullscreen] = useState(false);

  const watchlist = JSON.parse(localStorage.getItem("watchlist")) || {};
  const isInWatchlist = Object.hasOwn(watchlist, id);
  const [toast, setToast] = useState(null);
  const [watchStatus, setWatchStatus] = useState("");

  useEffect(() => {
    if (isInWatchlist) {
      setWatchStatus(watchlist[id].watchStatus || "");
    }
  }, [id, isInWatchlist]);

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleAddWatchlist = (e) => {
    if (!watchStatus) {
      showToast(
        "Please select a watch status before adding to the watchlist.",
        "error"
      );
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

  const trailer =
    videos?.results.find(
      (video) =>
        video.site === "YouTube" &&
        video.type === "Trailer" &&
        video.name.toLowerCase().includes("official")
    ) ||
    videos?.results.find(
      (video) => video.site === "YouTube" && video.type === "Trailer"
    ) || {};

  const searchOnlineUrl = `https://www.google.com/search?q=watch ${title}`;
  const releaseDate = new Date(release_date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <link rel="icon" type="image/jpeg" href={`${imgUrl}${poster_path}`} />
        <meta name="description" content={overview?.substring(0, 150) || "Movie details"} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={overview?.substring(0, 150)} />
        <meta property="og:image" content={`${imgUrl}${poster_path}`} />
        <meta name="keywords" content={`${title}, watch ${title}, what is ${title}, stream ${title}, about ${title}, details ${title}, ${title} details`} />
      </Helmet>

      <div className="mt-5 max-w-[650px] mx-auto grid grid-cols-1 gap-3 md:gap-5 xs:grid-cols-2 mb-10">
        <img
          onClick={() => setIsFullscreen((p) => !p)}
          className="rounded-2xl"
          src={`${imgUrl}${poster_path}`}
          alt={title}
          onError={(e) => (e.target.src = "https://i.imgur.com/sYhwMdk.jpeg")}
        />
        <div className="flex flex-col justify-center">
          <h2 className="text-[130%] md:text-2xl font-bold mb-2">{title}</h2>
          <H3 label="Runtime" value={runtime} />
          <H3 label="Lang" value={language} />
          <h3 className="text-[18px] font-bold flex gap-1 items-center">
            Rating: <span className="font-normal">{vote_average?.toFixed(1)}</span>
            <FaStar className="text-yellow-400" />
          </h3>
          <p className="font-bold mt-2 hidden md:block">{overview}</p>
          <H3 label="Genre" value={genreList} cls="hidden md:block" />
        </div>

        {isFullscreen && (
          <div onClick={() => setIsFullscreen((p) => !p)} className="fixed left-0 top-0 right-0 bottom-0 z-[90] flex items-center justify-center px-3 xs:px-5 lg:px-10">
            <img className="h-auto w-auto rounded-2xl" src={`${imgUrl}${poster_path}`} />
          </div>
        )}
        <Overlay onClick={() => setIsFullscreen((p) => !p)} isVisible={isFullscreen} />
      </div>

      {/* Watchlist Controls */}
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
          onClick={(e) => handleAddWatchlist(e)}
          className="w-full my-5 bg-theme font-bold py-2 rounded"
        >
          {isInWatchlist ? "Remove" : "Add to watchlist"}
        </button>
      </div>

      {/* Extra Info */}
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

      {genreList && <H3 label="Genres" cls="mt-5 md:hidden" />}
      <p className="md:hidden">{genreList}</p>

      {/* Trailer */}
      {trailer?.key && (
        <>
          <H3 label={trailer.name} cls="my-5" />
          <div className="relative w-full pb-[56.25%]">
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title="Trailer"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full rounded-2xl"
            />
          </div>
        </>
      )}

      {/* External Links */}
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

      {/* Report Button */}
      <div className="group w-fit right-[5%] bottom-[5%] fixed">
        <div className="group relative text-2xl p-2 bg-white text-theme rounded-full hover:scale-90 transition duration-300 shadow-3xl ease-in">
          <NavLink to="/contact">
            <MdReport className="text-2xl" />
          </NavLink>
          <div className="absolute font-bold top-1/2 right-full mr-2 transform -translate-y-1/2 scale-0 group-hover:scale-100 transition duration-300 bg-white text-black w-auto whitespace-nowrap delay-200 text-sm px-2 py-1 rounded-md shadow-lg">
            Report a problem
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </>
  );
};