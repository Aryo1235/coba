import { useEffect, useState } from "react";
import {
  getUpcomingMovies,
  getPopularWeeklyMovies,
  getTopRatedMovies,
} from "./api";
import { useNavigate } from "react-router-dom";
import MovieSection from "./MovieSection";

const MovieList = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [popularWeeklyMovies, setPopularWeeklyMovies] = useState([]);
  const [topRatingMovies, setTopRatingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  console.log(topRatingMovies);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [upcomingData, popularData, topRatedData] = await Promise.all([
          getUpcomingMovies(),
          getPopularWeeklyMovies(),
          getTopRatedMovies(),
        ]);

        setUpcomingMovies(upcomingData.results);
        setPopularWeeklyMovies(popularData.results);
        setTopRatingMovies(topRatedData.results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false); // Pastikan loading di-set ke false setelah fetch selesai
      }
    };

    fetchData();
  }, []);

  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="w-7xl">
      <MovieSection
        movies={upcomingMovies}
        title="Upcoming Movies"
        onMovieClick={(id) => navigate(`/movie/${id}`)}
        loading={loading} // Pass loading ke MovieSection
      />
      <MovieSection
        movies={popularWeeklyMovies}
        title="Weekly Popular Movies"
        onMovieClick={(id) => navigate(`/movie/${id}`)}
        loading={loading} // Pass loading ke MovieSection
      />
      <div className="mb-40 lg:mb-0">
        <MovieSection
          movies={topRatingMovies}
          title="Top Rating Movies"
          onMovieClick={(id) => navigate(`/movie/${id}`)}
          loading={loading} // Pass loading ke MovieSection
        />
      </div>
    </div>
  );
};

export default MovieList;
