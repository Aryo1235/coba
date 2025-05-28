import { useEffect, useState } from "react";
import { getPopularMovies, imageBaseURL } from "./api";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HeroSection = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getPopularMovies()
      .then((data) => {
        setMovies(data.results);
        setCurrentIndex(0); // reset ke index awal
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching popular movies:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
        setIsAnimating(false);
      }, 1000);
    }, 9000);

    return () => clearInterval(interval);
  }, [movies]);

  if (loading) {
    // Render skeleton loading state
    return (
      <div className="h-[50vh] md:h-[80vh] bg-cover bg-center  mb-8 mt-28 rounded-xl relative">
        <Skeleton height="100%" />
      </div>
    );
  }

  if (movies.length === 0) {
    return <div>No movie data available</div>;
  }

  const handleHeroClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const movie = movies[currentIndex];
  if (!movie) {
    return <div>Loading movie data...</div>; // atau bisa juga return null
  }
  const { title, vote_average, release_date, backdrop_path, overview } = movie;

  return (
    <>
      <div
        className={`h-[50vh] md:h-[80vh] bg-cover bg-center mb-8 mt-28 rounded-xl transition-transform duration-1000 ease-in-out 
          ${
            isAnimating
              ? "opacity-100 translate-x-[120%]"
              : "opacity-100 translate-x-0"
          }`}
        style={{
          backgroundImage: `url(${imageBaseURL}/w1280${backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50 rounded-xl"></div>
        <div className="relative p-4 text-white flex flex-col items-center justify-center h-full">
          <h1 className="text-2xl md:text-4xl font-bold text-center">
            {title}
          </h1>
          <p className="text-sm md:text-lg text-center">{overview}</p>
          <div className="mt-2 flex flex-col items-center">
            <span className="mr-4">Rating: {vote_average.toFixed(1)}</span>
            <span>Released: {release_date.split("-")[0]}</span>
          </div>
          <button
            onClick={handleHeroClick}
            className="mt-4 inline-block bg-yellow-500 text-black py-2 px-4 rounded hover:bg-yellow-400 transition duration-300"
          >
            View Details
          </button>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
