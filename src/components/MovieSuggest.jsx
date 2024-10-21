import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMoviesSuggestions, imageBaseURL } from "./api";

const MovieSuggest = ({ movieId }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getMoviesSuggestions(movieId)
      .then((data) => {
        setSuggestions(data.results);
      })
      .finally(() => setLoading(false));
  }, [movieId]);

  // handle movie click
  const handleSuggestClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  if (loading) return <p className="text-white">Loading movies...</p>;

  return (
    <div className="mt-14 mx-2 pb-4">
      <h2 className="text-2xl text-yellow-500 font-bold mb-6">
        You May Also Like This
      </h2>
      <div className="overflow-x-auto">
        <div className="flex space-x-4">
          {suggestions.map((movie) => (
            <div
              className="movie-item flex-none w-52 cursor-pointer"
              key={movie.id}
              onClick={() => handleSuggestClick(movie.id)} // call onClick properly
            >
              <img
                className="w-full h-[300px] object-cover rounded-md"
                src={
                  movie.poster_path
                    ? `${imageBaseURL}/w200${movie.poster_path}`
                    : "fallback-image-url.jpg"
                }
                alt={movie.title}
              />
              <p className="text-1xl text-yellow-400 mt-2 text-center">
                {movie.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieSuggest;
