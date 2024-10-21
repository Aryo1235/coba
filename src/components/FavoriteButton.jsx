import { useContext } from "react";
import { FavoritesContext } from "./FavoritesContext";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

const FavoriteButton = ({ movie }) => {
  const { favorites, addToFavorites, removeFromFavorites } =
    useContext(FavoritesContext);

  // Cek apakah film ini sudah ada di daftar favorit pengguna yang sedang login
  const isFavorite = favorites.some((fav) => fav.id === movie.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <>
      <div className="flex justify-center lg:justify-start items-center mt-8">
        <button
          onClick={toggleFavorite}
          className="flex items-center text-yellow-500 border-2 border-yellow-500 rounded-lg p-2 hover:bg-yellow-600 transition-colors duration-300"
        >
          {isFavorite ? (
            <>
              <FaBookmark size={32} className="hover:text-white" />
              <span className="ml-2 text-base pl-2">Hapus dari Favorit</span>
            </>
          ) : (
            <>
              <FaRegBookmark size={32} className="hover:text-gray-300" />
              <span className="ml-2 text-base pl-2">Tambah ke Favorit</span>
            </>
          )}
        </button>
      </div>
    </>
  );
};

export default FavoriteButton;
