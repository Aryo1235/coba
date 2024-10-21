import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { imageBaseURL } from "./api";

const MovieSection = ({ movies, title, onMovieClick, loading }) => {
  return (
    <div className="my-7">
      <h2 className="text-2xl text-yellow-500 font-bold mb-4">{title}</h2>
      <div className="overflow-x-auto">
        <div className="flex space-x-2 my-3">
          {loading
            ? Array(6) // Placeholder for 6 skeleton cards while loading
                .fill()
                .map((_, index) => (
                  <div className="flex-none w-52" key={index}>
                    <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
                      <Skeleton height={300} className="mb-2" />
                      <Skeleton
                        height={20}
                        width={`80%`}
                        className="mx-auto mb-2"
                      />
                      <Skeleton height={20} width={`60%`} className="mx-auto" />
                    </div>
                  </div>
                ))
            : movies.map((movie) => (
                <div
                  className="flex-none w-52 cursor-pointer"
                  key={movie.id}
                  onClick={() => onMovieClick(movie.id)}
                >
                  <div className="bg-gray-900 p-4 rounded-lg shadow-lg hover:bg-gray-800">
                    <img
                      className="w-full h-[300px] object-cover rounded-md mb-2"
                      src={
                        movie.poster_path
                          ? `${imageBaseURL}/w200${movie.poster_path}`
                          : "fallback-image-url.jpg"
                      }
                      alt={movie.title}
                    />
                    <p className="text-lg text-yellow-400 text-center truncate">
                      {movie.title}
                    </p>
                    <div className="flex justify-center items-center text-gray-500 mt-1">
                      <p className="text-sm">
                        {movie.release_date.split("-")[0]}
                      </p>
                      <span className="mx-2">|</span>
                      <p className="text-sm">
                        ⭐ {movie.vote_average.toFixed(1)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default MovieSection;
