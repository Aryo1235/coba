import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FavoritesContext } from "./FavoritesContext";
import DeleteUser from "./Delete";
import Notification from "./Notification";

const DropdownUser = () => {
  const [username, setUsername] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { token } = useContext(FavoritesContext);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const handleLogout = () => navigate("/logout");
  const handleMouseLeave = () => setDropdownOpen(false);

  // Fungsi untuk mengatur notifikasi
  const showNotification = (message, type) => {
    setNotification({ message, type });
  };

  //Fungsi Clear Message
  const clearMessage = () => {
    setNotification({ message: "", type: "" });
  };

  return (
    <>
      <Notification
        message={notification.message}
        type={notification.type}
        clearMessage={clearMessage}
      />
      <div className="flex items-center space-x-4 sm:mx-4">
        {token ? (
          <div className="relative" onMouseLeave={handleMouseLeave}>
            <span
              onClick={toggleDropdown}
              className="text-white cursor-pointer my-2 flex items-center md:border-solid sm:border-2 border-yellow-500 px-1 md:px-3 py-1 rounded-md hover:bg-yellow-500 hover:text-gray-900 transition duration-300"
            >
              <FaUser className="mx-1" />
              <span className="hidden sm:inline">{username}</span>
            </span>
            {dropdownOpen && (
              <div className="absolute right-0 w-32 bg-gray-800 shadow-lg rounded-md z-20">
                <Link
                  to="/edit-profile"
                  className="block px-4 py-3 mt-3 text-white hover:bg-yellow-500 rounded-md hover:text-gray-900 transition duration-300 cursor-pointer"
                  onClick={() => setDropdownOpen(false)}
                >
                  Edit Profile
                </Link>
                <div
                  onClick={handleLogout}
                  className="block px-4 py-3 text-white hover:bg-yellow-500 rounded-md hover:text-gray-900 transition duration-300 cursor-pointer"
                >
                  Logout
                </div>
                <DeleteUser showNotification={showNotification} />
              </div>
            )}
          </div>
        ) : (
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
