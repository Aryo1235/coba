import { useNavigate } from "react-router-dom";

const MovieListSearch = ({ movie }) => {
  const navigate = useNavigate();

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`); // Navigasi ke halaman detail film
  };

  return (
    <div
      className="bg-gray-900 p-5 rounded-lg shadow-lg cursor-pointer transition transform hover:scale-105 hover:bg-gray-800 duration-300 w-full sm:w-96 md:w-80 mx-2"
      onClick={() => handleMovieClick(movie.id)}
    >
      {/* Poster Movie */}
      <div className="relative overflow-hidden rounded-lg mb-5">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-auto rounded-lg object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Judul dan Tanggal Rilis + Rating */}
      <div className="text-center">
        <h2 className="text-xl font-semibold text-yellow-400 truncate">
          {movie.title}
        </h2>
        <div className="flex justify-center items-center text-gray-500 mt-2">
          <p className="text-sm">{movie.release_date}</p>
          <span className="mx-2">|</span>
          <p className="text-sm">⭐ {movie.vote_average.toFixed(1)}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieListSearch;
