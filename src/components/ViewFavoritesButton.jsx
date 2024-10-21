import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FavoritesContext } from "./FavoritesContext"; // Mengambil context dari FavoritesContext
import { FaRegBookmark } from "react-icons/fa";
import { useContext } from "react";

const ViewFavoritesButton = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { favorites, removeFromFavorites } = useContext(FavoritesContext); // Mengambil daftar favorit dan fungsi hapus
  const navigate = useNavigate();

  const openSheet = () => {
    setIsSheetOpen(true);
  };

  const closeSheet = () => {
    setIsSheetOpen(false);
  };

  return (
    <div>
      <button
        onClick={openSheet}
        className="text-white cursor-pointer flex items-center border-solid sm:border-2 border-yellow-500 md:px-3 py-1 mr-3 rounded-md hover:bg-yellow-500 hover:text-gray-900 transition duration-300"
      >
        <FaRegBookmark size={20} />
        <span className=" hidden sm:inline ml-1 text-base pl-1 ">
          Lihat Favorit
        </span>
      </button>

      {/* Menampilkan komponen Sheet ketika isSheetOpen true */}
      <div
        className={`fixed top-0 right-0 h-full bg-gray-900 text-yellow-500 shadow-md transition-transform transform duration-500 ease-in-out ${
          isSheetOpen ? "translate-x-0" : "translate-x-full"
        } z-50 w-full sm:w-[400px]`}
      >
        <div className="sheet-content p-4 overflow-y-auto h-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Daftar Film Favorit</h2>
            <button
              onClick={closeSheet}
              className="text-white bg-yellow-500 hover:bg-yellow-400 px-3 py-1 rounded-lg"
            >
              Tutup
            </button>
          </div>

          {/* Menampilkan daftar film favorit */}
          <ul className="mt-4">
            {Array.isArray(favorites) && favorites.length > 0 ? (
              favorites.map((fav) => (
                <li
                  key={fav.id}
                  className="favorite-item flex items-center mb-4"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w200${fav.poster_path}`}
                    alt={fav.title}
                    className="favorite-poster w-16 h-24 object-cover mr-4"
                  />
                  <div className="favorite-details flex-1">
                    <h3 className="text-lg">{fav.title}</h3>
                    <div className="flex space-x-2 mt-2">
                      <button
                        onClick={() => removeFromFavorites(fav.id)} // Hapus dari daftar favorit
                        className="text-white bg-red-500 hover:bg-red-400 px-2 py-1 rounded-lg"
                      >
                        Hapus
                      </button>
                      <button
                        onClick={() => {
                          closeSheet(); // Tutup sheet sebelum navigasi
                          navigate(`/movie/${fav.id}`);
                        }}
                        className="text-white bg-blue-500 hover:bg-blue-400 px-2 py-1 rounded-lg"
                      >
                        Lihat Detail
                      </button>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className="text-center text-white">
                Tidak ada film favorit.
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ViewFavoritesButton;
