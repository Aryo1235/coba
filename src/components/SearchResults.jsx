import { useEffect, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchMovies } from "./api";
import MovieListSearch from "./MovieListSearch";
import { PaginationContext } from "./PaginationContext"; // Import context
import Pagination from "./Pagination";
import { ClipLoader } from "react-spinners";

const SearchResultsPages = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  // Menggunakan state global dari PaginationContext
  const { currentPage, setCurrentPage, setTotalPages } =
    useContext(PaginationContext);

  // Menangkap query sebelumnya untuk mendeteksi perubahan query
  const [prevQuery, setPrevQuery] = useState(query);

  // Reset halaman ke 1 jika query berubah
  useEffect(() => {
    if (query !== prevQuery) {
      setCurrentPage(1); // Set halaman ke 1 ketika query berubah
      setPrevQuery(query); // Update prevQuery dengan query terbaru
    }
  }, [query, prevQuery, setCurrentPage]);

  useEffect(() => {
    const fetchSearchResults = async (page) => {
      if (query && query.trim().length >= 3) {
        setLoading(true);
        try {
          const data = await searchMovies(query, page); // Pass currentPage ke API
          if (data.results && data.results.length > 0) {
            setResults(data.results);
            setTotalPages(data.total_pages); // Set total pages secara global
            setError(null);
          } else {
            setError("No results found");
            setResults([]);
          }
        } catch (error) {
          console.error("Error fetching search results:", error);
          setError("Error fetching search results");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchSearchResults(currentPage); // Panggil fungsi dengan currentPage
  }, [query, currentPage, setTotalPages]);

  return (
    <div className="container mt-24 mx-auto ">
      <h1 className="text-2xl font-bold text-yellow-500 mb-6">
        Search Results for: {query}
      </h1>

      {error && <p>{error}</p>}
      {loading ? (
        <div className="flex justify-center items-center ">
          <ClipLoader color="#FBBF24" loading={true} size={70} />
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-6">
          {results.map((movie) => (
            <MovieListSearch key={movie.id} movie={movie} loading={loading} />
          ))}
        </div>
      )}

      {/* Add Pagination Controls */}
      <Pagination />
    </div>
  );
};

export default SearchResultsPages;
