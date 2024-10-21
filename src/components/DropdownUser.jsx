import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FavoritesContext } from "./FavoritesContext";
import { useContext } from "react";
const DropdownUser = () => {
  const [username, setUsername] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { token } = useContext(FavoritesContext); // Ambil token dari context
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    navigate("/logout"); // Navigasi ke halaman logout
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };
  return (
    <>
      <div className="flex items-center space-x-4 sm:mx-4">
        {token && (
          <div
            className="relative"
            // Buka dropdown saat mouse masuk
            onMouseLeave={handleMouseLeave}
          >
            {/* Button User */}
            <span
              onClick={toggleDropdown}
              className="text-white cursor-pointer my-2 flex items-center md:border-solid sm:border-2 border-yellow-500 px-1 md:px-3 py-1 rounded-md hover:bg-yellow-500 hover:text-gray-900 transition duration-300"
            >
              {/* Tampilkan nama hanya di layar besar */}
              <FaUser className="mx-1" />
              <span className="hidden sm:inline">{username}</span>{" "}
              {/* Sembunyikan di mobile */}
            </span>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 w-32 bg-gray-800 shadow-lg rounded-md z-20 ">
                <Link
                  to="/edit-profile"
                  className="block px-4 py-3 mt-3 text-white hover:bg-yellow-500 rounded-md hover:text-gray-900 transition duration-300 cursor-pointer"
                  onClick={() => setDropdownOpen(false)} // Tutup dropdown setelah klik
                >
                  Edit Profile
                </Link>
                <div
                  onClick={handleLogout}
                  className="block px-4 py-3 mb-3 text-white hover:bg-yellow-500 rounded-md hover:text-gray-900 transition duration-300 cursor-pointer"
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        )}

        {/* Jika tidak ada username, tampilkan tombol login */}
        {!token && (
          <Link
            to="/login"
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Login
          </Link>
        )}
      </div>
    </>
  );
};

export default DropdownUser;
