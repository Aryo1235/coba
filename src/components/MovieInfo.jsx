const MovieInfo = ({ movie, userRating }) => {
  const finalRating = userRating
    ? ((Number(movie.vote_average) + Number(userRating)) / 2).toFixed(1)
    : movie.vote_average.toFixed(1);
  return (
    <>
      <p className="text-lg mb-4">{movie.overview}</p>
      <p className="text-lg mb-2">
        <span className="font-semibold">Rating:</span> {finalRating}
      </p>
      <p className="text-lg">
        <span className="font-semibold">Release Date:</span>{" "}
        {movie.release_date}
      </p>
    </>
  );
};

export default MovieInfo;
