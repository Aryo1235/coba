// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getUpcomingMovies, getPopularMovies, getTopRatedMovies } from "./api";
// import { useNavigate } from "react-router-dom";

// const MovieListByCategory = () => {
//   const { category } = useParams();
//   const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchMovies = async () => {
//       setLoading(true);
//       try {
//         let data;
//         if (category === "upcoming") {
//           data = await getUpcomingMovies();
//         } else if (category === "popular") {
//           data = await getPopularMovies();
//         } else if (category === "top-rated") {
//           data = await getTopRatedMovies();
//         }
//         setMovies(data.results);
//       } catch (error) {
//         setError(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMovies();
//   }, [category]);

//   const handleMovieClick = (movieId) => {
//     navigate(`/movie/${movieId}`);
//   };

//   if (loading) return <p className="text-white">Loading movies...</p>;
//   if (error) return <p className="text-red-500">Error: {error.message}</p>;

//   return (
//     <div className="max-w-7xl mx-auto">
//       <h1 className="text-3xl text-yellow-500 font-bold pt-10 mt-16 ml-16 mb-5 lg:mb-10">
//         {category.charAt(0).toUpperCase() + category.slice(1)} Movies
//       </h1>
//       <div className="flex flex-wrap justify-center">
//         {movies.map((movie) => (
//           <div
//             className="mx-2 my-4"
//             key={movie.id}
//             onClick={() => handleMovieClick(movie.id)}
//           >
//             <div className="bg-gray-900 p-5 rounded-lg shadow-lg cursor-pointer transition transform hover:scale-105 hover:bg-gray-800 duration-300 w-full sm:w-80 md:w-64">
//               {/* Poster Movie */}
//               <div className="relative overflow-hidden rounded-lg mb-5">
//                 <img
//                   src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//                   alt={movie.title}
//                   className="w-full h-auto rounded-lg object-cover transition-transform duration-300 hover:scale-105"
//                 />
//               </div>

//               {/* Judul dan Tanggal Rilis + Rating */}
//               <div className="text-center">
//                 <h2 className="text-xl font-semibold text-yellow-400 truncate">
//                   {movie.title}
//                 </h2>
//                 <div className="flex justify-center items-center text-gray-500 mt-2">
//                   <p className="text-sm">{movie.release_date}</p>
//                   <span className="mx-2">|</span>
//                   <p className="text-sm">⭐ {movie.vote_average.toFixed(1)}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MovieListByCategory;
