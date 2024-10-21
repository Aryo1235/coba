import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const SearchComponent = ({ genreId, genreName }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get("query");
  const [searchTerm, setSearchTerm] = useState(query || "");
  const [loading, setLoading] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  console.log(query);

  useEffect(() => {
    const debounceSearch = setTimeout(() => {
      if (searchTerm.trim().length >= 3) {
        setLoading(true);
        navigate(`/search?query=${searchTerm}`, {
          state: { genreId, genreName },
        });
        setLoading(false);
      } else if (searchTerm.trim().length === 0) {
        if (genreId) {
          navigate(`/genre?id=${genreId}`, {
            state: { genreName },
          });
        } else {
          navigate(`/`);
        }
      }
    }, 500);

    return () => clearTimeout(debounceSearch);
  }, [searchTerm, navigate, genreId, genreName]);

  // Function untuk menghandle klik di luar input

  return (
    <div className="relative w-full flex justify-end ">
      {/* Search Icon */}
      <button
        className={`p-2 rounded-md ${
          isSearchActive ? "hidden" : "flex"
        } md:hidden`}
        onClick={() => setIsSearchActive(true)}
      >
        <FaSearch className="text-white" size={18} />
      </button>

      {/* Overlay */}
      {isSearchActive && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setIsSearchActive(false)}
        ></div>
      )}

      {/* Search Input */}
      <div
        className={`fixed top-2 left-0 w-full z-20 p-2 transition-all duration-300 ${
          isSearchActive ? "flex" : "hidden"
        } md:flex md:relative md:top-auto md:left-auto md:right-auto md:z-auto`}
        // Menghubungkan referensi ke input
      >
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-4xl p-2 mx-auto rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-gray-700 placeholder-gray-500 pr-10"
          onBlur={() => setIsSearchActive(false)} // Hide input when focus is lost
        />
        {loading && (
          <div className="absolute inset-y-0 right-3 flex items-center">
            <div className="loader border-t-4 border-yellow-500 rounded-full w-6 h-6 animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
