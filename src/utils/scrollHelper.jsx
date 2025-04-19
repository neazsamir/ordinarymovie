
export const handleMovieCardClick = (movieId, navigate) => {
  sessionStorage.setItem("scroll", window.scrollY);
  navigate(`/details/${movieId}`);
};