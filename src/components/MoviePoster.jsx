const MoviePoster = ({ movie }) => {
  return (
    <img
      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
      alt={movie.title}
      className="w-full md:w-2/5 lg:w-1/3 text-center rounded-lg shadow-lg"
    />
  );
};

export default MoviePoster;
