import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FavoritesContext } from "./FavoritesContext"; // Impor context
import { FaComments } from "react-icons/fa";
const ButtonChat = () => {
  const navigate = useNavigate();
  const { token } = useContext(FavoritesContext); // Ambil token dari context

  const handleChatBotClick = () => {
    if (!token) {
      // Jika user belum login (tidak ada token)
      alert(
        "Anda harus login terlebih dahulu untuk menggunakan fitur ChatBot."
      );
      navigate("/login"); // Redirect ke halaman login
      return;
    } else {
      // Jika user sudah login, arahkan ke halaman ChatBot
      navigate("/chat");
    }
  };

  return (
    <button
      onClick={handleChatBotClick}
      className="text-white cursor-pointer flex items-center border-solid sm:border-2 border-yellow-500 md:px-3 py-1 rounded-md hover:bg-yellow-500 hover:text-gray-900 transition duration-300"
    >
      <FaComments size={20} />
      <span className=" hidden sm:inline ml-1 text-base pl-1 ">ChatBot</span>
    </button>
  );
};

export default ButtonChat;
