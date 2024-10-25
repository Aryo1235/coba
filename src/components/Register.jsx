import { useState } from "react";
import { registerUser } from "./api";
import { Link } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Notification from "./Notification"; // Import Notification

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State untuk confirm password
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);

  const showNotification = (message, type) => {
    setNotification({ message, type });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value.includes(" ")) {
      showNotification("Tidak boleh ada spasi.", "error");
      return;
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      showNotification("Kata sandi tidak cocok.", "error");
      return;
    }

    setIsLoading(true);

    try {
      const data = await registerUser(formData.username, formData.password);
      showNotification(
        `User ${data.username} berhasil didaftarkan.`,
        "success"
      );
      setFormData({ username: "", password: "", confirmPassword: "" });
    } catch (error) {
      console.error("Error registering user:", error);
      showNotification("Gagal mendaftarkan user. Silakan coba lagi.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-900">
      <div className="w-80">
        <form
          onSubmit={handleSubmit}
          className="bg-slate-500 bg-opacity-20 backdrop-blur p-6 rounded shadow-md"
        >
          <h2 className="text-xl font-bold mb-4 text-white text-center">
            Form Registrasi
          </h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">
              Username
            </label>
            <input
              type="text"
              name="username"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-white">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={formData.password}
              onChange={handleChange}
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
          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-white">
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"} // Gunakan showConfirmPassword untuk confirm password
              name="confirmPassword"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle showConfirmPassword
              className="absolute right-2 bottom-0 transform -translate-y-1/2 text-slate-600"
            >
              {showConfirmPassword ? (
                <AiFillEyeInvisible size={20} />
              ) : (
                <AiFillEye size={20} />
              )}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 flex justify-center items-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
            ) : (
              "Register"
            )}
          </button>
          <span className="flex mt-2 text-white">
            Sudah Punya Akun?
            <Link to="/login" className="text-yellow-400 ml-1">
              Login
            </Link>
          </span>
        </form>

        {/* Komponen Notification untuk pesan sukses atau error */}
        {notification.message && (
          <div className="mt-3">
            <Notification
              message={notification.message}
              type={notification.type}
              clearMessage={() => setNotification({ message: "", type: "" })}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterForm;
