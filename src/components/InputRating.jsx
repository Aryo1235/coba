import { useState } from "react";
import { FaStar } from "react-icons/fa";

const RatingModal = ({ isOpen, onClose, onRatingSubmit }) => {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onRatingSubmit(rating);
    setRating(0); // Reset rating setelah submit
    onClose(); // Tutup modal setelah submit
  };

  if (!isOpen) return null; // Jika modal tidak terbuka, jangan render apa-apa

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg text-yellow-500 mb-2">Rate this movie:</h2>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="flex space-x-2 mb-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
              <button
                key={star}
                type="button"
                className={`text-2xl ${
                  star <= rating ? "text-yellow-500" : "text-gray-400"
                }`}
                onClick={() => handleRatingChange(star)}
              >
                <FaStar />
              </button>
            ))}
          </div>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-yellow-500 text-gray-900 rounded"
          >
            Submit Rating
          </button>
          <button
            type="button"
            onClick={onClose}
            className="mt-2 px-4 py-2 bg-gray-300 text-gray-900 rounded"
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default RatingModal;
