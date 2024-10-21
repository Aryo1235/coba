import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "./api";
import { FavoritesContext } from "./FavoritesContext"; // Import useFavorites untuk mengakses context
import { useContext } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State untuk loading
  const navigate = useNavigate();
  const { loginUser } = useContext(FavoritesContext); // Ambil fungsi loginUser dari FavoritesContext

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true); // Set loading menjadi true ketika tombol login diklik

    try {
      const response = await login(username, password);
      if (response.success) {
        // Simpan token atau userId ke local storage
        localStorage.setItem("token", response.token);
        localStorage.setItem("userId", response.userId);
        localStorage.setItem("username", response.username);

        // Panggil loginUser dari FavoritesContext untuk memperbarui currentUserId
        loginUser(response.userId);

        // Redirect ke homepage
        navigate("/");
      } else {
        setError(response.message); // Tampilkan pesan error
      }
    } catch (error) {
      setError("Terjadi kesalahan saat login");
    } finally {
      setIsLoading(false); // Set loading kembali ke false setelah selesai
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-xl mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <label className="block mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded w-full flex justify-center items-center"
          disabled={isLoading} // Disable tombol saat loading
        >
          {isLoading ? (
            // Spinner loading menggunakan Tailwind murni
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
