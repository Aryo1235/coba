import Navbar from "../components/Navbar";
import MoviePoster from "../components/MoviePoster";
import MovieInfo from "../components/MovieInfo";
import MovieReviews from "../components/MovieReview";
import MovieSuggest from "../components/MovieSuggest";
import VideoTrailer from "../components/VideoTrailer";
import MovieCredits from "../components/MovieCredits";
import FavoriteButton from "../components/FavoriteButton";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetail } from "../components/api";
import InputRating from "../components/InputRating"; // Import komponen modal

function DetailPages() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false); // State untuk modal

  useEffect(() => {
    setLoading(true);
    getMovieDetail(id)
      .then((data) => {
        setMovie(data);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [id]);

  const handleRatingSubmit = (rating) => {
    console.log("Submitted Rating:", rating);
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="bg-gray-900 text-slate-400 py-10">
      <Navbar showSearch={false} />
      <div className="container mx-auto px-4 mt-40">
        {/* Gabungan Poster dan Info */}
        <h1 className="text-3xl font-bold text-center text-yellow-500 mb-8">
          {movie.title}
        </h1>
        <div className="flex flex-col mt-8 md:flex-col lg:flex-row items-center md:items-start lg:space-x-10">
          <MoviePoster movie={movie} />
          <div className="mt-4 lg:mt-0 lg:w-2/3">
            <MovieInfo movie={movie} />
            <MovieCredits movieId={id} />
            {/* Video Trailer */}
            <VideoTrailer movieId={id} />
            <div className="flex flex-row space-x-4">
              <FavoriteButton movie={movie} />
              <button
                onClick={() => setModalOpen(true)} // Buka modal saat tombol diklik
                className="mt-8 px-4 py-1 bg-yellow-500 text-gray-900 rounded text-sm"
              >
                Rate this Movie
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Movie Reviews */}
      <MovieReviews movieId={id} />

      {/* Movie Suggestions */}
      <MovieSuggest movieId={id} />
      {/* Tambahkan komponen RatingModal di bawah */}
      <InputRating
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)} // Tutup modal saat onClose dipanggil
        onRatingSubmit={handleRatingSubmit} // Kirim rating ke fungsi yang sesuai
      />
    </div>
  );
}

export default DetailPages;
