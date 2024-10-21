import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Create context
export const FavoritesContext = createContext();

// Provider to supply context to all components
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Ambil token dari localStorage

  useEffect(() => {
    // Ambil userId dari localStorage ketika aplikasi pertama kali dibuka
    const storedUserId = localStorage.getItem("userId");
    setCurrentUserId(storedUserId);
  }, []);

  useEffect(() => {
    // Reset favorites ketika user login berubah
    if (currentUserId) {
      // Retrieve user's specific favorites list from localStorage
      const storedFavorites = localStorage.getItem(
        `favorites_${currentUserId}`
      );
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      } else {
        setFavorites([]); // Set favorites kosong jika tidak ada
      }
    } else {
      setFavorites([]); // Reset favorites jika tidak ada userId
    }
  }, [currentUserId]);

  // Fungsi untuk login user dan set currentUserId baru
  const loginUser = (userId) => {
    localStorage.setItem("userId", userId);
    setCurrentUserId(userId);
  };

  // Add movie to user's favorites list
  const addToFavorites = (movie) => {
    console.log(movie);
    if (!token) {
      alert("Anda harus login terlebih dahulu untuk menambahkan favorit.");
      navigate("/login");
      return; // Hentikan fungsi jika user belum login
    }

    const updatedFavorites = [...favorites, movie];
    setFavorites(updatedFavorites);

    // Simpan ke localStorage untuk user yang sedang login
    const currentUserId = localStorage.getItem("userId");
    localStorage.setItem(
      `favorites_${currentUserId}`,
      JSON.stringify(updatedFavorites)
    );
  };

  // Remove movie from user's favorites list
  const removeFromFavorites = (movieId) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== movieId);
    setFavorites(updatedFavorites);
    localStorage.setItem(
      `favorites_${currentUserId}`,
      JSON.stringify(updatedFavorites)
    );
  };

  // Provide values to components using the context
  const value = {
    token,
    favorites,
    addToFavorites,
    removeFromFavorites,
    loginUser, // Tambahkan fungsi login user
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
