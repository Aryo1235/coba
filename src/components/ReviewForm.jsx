import { useState } from "react";
import { useNavigate } from "react-router-dom";
const ReviewForm = ({ onAddReview }) => {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const isAuth = localStorage.getItem("token") ? true : false; // Cek apakah user sudah login
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    if (!isAuth) {
      alert("Anda Harus Login Terlebih dahulu Untuk Review.");
      navigate("/login");
    }
    e.preventDefault();

    if (author.length <= 3) {
      setError("Author name must be more than 3 characters.");
      return;
    }

    if (content.length <= 4) {
      setError("Review content must be more than 4 characters.");
      return;
    }

    if (author && content) {
      const newReview = {
        id: Date.now(),
        author,
        content,
      };

      onAddReview(newReview);

      setAuthor("");
      setContent("");
      setError(""); // Clear error message after successful submission
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="lg:my-16 bg-gray-800 p-4 rounded-lg max-w-lg mx-auto"
    >
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <div className="mb-2">
        <label className="block text-yellow-500 mb-1">Author</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded focus:outline-none focus:border-yellow-500"
          placeholder="Enter your name"
        />
      </div>
      <div className="mb-2">
        <label className="block text-yellow-500 mb-1">Review</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded focus:outline-none focus:border-yellow-500"
          placeholder="Write your review here"
        />
      </div>
      <button
        type="submit"
        className="bg-yellow-500 text-white p-2 w-full rounded hover:bg-yellow-600"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
