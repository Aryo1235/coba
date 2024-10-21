import { useEffect, useState } from "react";
import { getMovieReviews } from "./api"; // Ganti dengan path ke file API Anda
import ReviewForm from "./ReviewForm"; // Impor komponen ReviewForm

const MovieReviews = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getMovieReviews(movieId);
        setReviews(data.results); // Data TMDB ada dalam property 'results'
      } catch (error) {
        setError("Failed to fetch reviews");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  const handleAddReview = (newReview) => {
    setReviews((prevReviews) => [newReview, ...prevReviews]); // Tambah review baru di awal
  };

  if (loading) return <div className="text-center">Loading reviews...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-yellow-500">Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-yellow-400">No reviews available.</p>
      ) : (
        <div className="flex overflow-x-auto space-x-4 mb-4">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-yellow-400 rounded-lg shadow-md p-4 mb-6 min-w-[16rem] max-w-[16rem] lg:min-w-[21rem] lg:max-w-[21rem] h-auto"
              style={{ wordWrap: "break-word", whiteSpace: "normal" }}
            >
              <h3 className="font-semibold text-black text-lg">
                {review.author}
              </h3>
              <p className="text-slate-700 my-2 line-clamp-4 lg:line-clamp-6">
                {review.content}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Pindahkan form review ke bawah daftar review */}
      <ReviewForm onAddReview={handleAddReview} />
    </div>
  );
};

export default MovieReviews;
