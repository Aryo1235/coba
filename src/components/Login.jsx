import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "./api";
import { FavoritesContext } from "../context/FavoritesContext";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Notification from "./Notification";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { loginUser } = useContext(FavoritesContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setNotification({ message: "", type: "" });
    setIsLoading(true);

    try {
      const response = await login(username, password);
      if (response.success) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("userId", response.userId);
        localStorage.setItem("username", response.username);

        loginUser(response.userId);
        navigate("/");
      } else {
        showNotification(response.message, "error");
      }
    } catch (error) {
      showNotification(error, "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to show notifications
  const showNotification = (message, type) => {
    setNotification({ message, type });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-900">
      <div className="w-80">
        <form
          onSubmit={handleLogin}
          className="bg-slate-500 bg-opacity-20 backdrop-blur p-6 rounded shadow-md  "
        >
          <h2 className="text-xl font-bold text-white mb-4 text-center">
            Login
          </h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-white">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-white">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 bottom-0 transform -translate-y-1/2 text-slate-600"
            >
              {showPassword ? (
                <AiFillEyeInvisible size={20} />
              ) : (
                <AiFillEye size={20} />
              )}
            </button>
          </div>
          <button
            type="submit"
            className="bg-yellow-500 text-white py-2 px-4 rounded w-full flex justify-center items-center hover:bg-yellow-600"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
            ) : (
              "Login"
            )}
          </button>
          <span className="text-white flex mt-2">
            Belum Punya Akun?
            <Link to="/register" className="text-yellow-400 ml-1">
              Register
            </Link>
          </span>
        </form>
        <Notification
          message={notification.message}
          type={notification.type}
          clearMessage={() => setNotification({ message: "", type: "" })}
        />
      </div>
    </div>
  );
};

export default Login;
