const MovieInfo = ({ movie }) => {
  return (
    <>
      <p className="text-lg mb-4">{movie.overview}</p>
      <p className="text-lg mb-2">
        <span className="font-semibold">Rating:</span>{" "}
        {movie.vote_average.toFixed(1)}
      </p>
      <p className="text-lg">
        <span className="font-semibold">Release Date:</span>{" "}
        {movie.release_date}
      </p>
    </>
  );
};

export default MovieInfo;
