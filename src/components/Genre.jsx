import { useEffect, useState, useContext } from "react";
import { getMoviesByGenre } from "./api";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import { PaginationContext } from "./PaginationContext";

const Genre = ({ genreId, genreName }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { currentPage, setCurrentPage, setTotalPages } =
    useContext(PaginationContext);

  useEffect(() => {
    setCurrentPage(1);
  }, [genreId, setCurrentPage]);

  useEffect(() => {
    if (genreId) {
      const fetchMovies = async (page = 1) => {
        setLoading(true);
        try {
          const response = await getMoviesByGenre(genreId, page);
          setMovies(response.results);
          setTotalPages(response.total_pages);
          setError(null);
        } catch (error) {
          setError("Failed to fetch movies for this genre.");
          console.error("Error fetching movies:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchMovies(currentPage);
    }
  }, [genreId, currentPage, setCurrentPage, setTotalPages]);

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="mb-40">
      <h1 className=" text-2xl md:text-3xl text-yellow-500 font-bold pt-10 mt-8 md:mt-16  ml-16 mb-2 lg:mb-10">
        Movies in {genreName}
      </h1>
      <div className="flex flex-wrap justify-center">
        {movies.map((movie) => (
          <div
            className="mx-2 my-4 w-full sm:w-52 md:w-52 lg:w-64"
            key={movie.id}
            onClick={() => handleMovieClick(movie.id)}
          >
            <div className="bg-gray-900 p-4 rounded-lg shadow-lg cursor-pointer transition transform hover:scale-105 hover:bg-gray-800 duration-300">
              {/* Poster Movie */}
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-auto rounded-lg object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Judul dan Tanggal Rilis + Rating */}
              <div className="text-center w-full">
                <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-yellow-400 truncate max-w-full">
                  {movie.title}
                </h2>

                <div className="flex justify-center items-center text-gray-500 mt-2">
                  <p className="text-xs sm:text-sm">{movie.release_date}</p>
                  <span className="mx-2">|</span>
                  <p className="text-xs sm:text-sm">
                    ⭐ {movie.vote_average.toFixed(1)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <Pagination />
    </div>
  );
};

export default Genre;
