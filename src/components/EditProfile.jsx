import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUserProfile } from "./api"; // Import the utility function
import Notification from "./Notification"; // Import the Notification component

const EditProfile = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      showNotification("Kata sandi tidak cocok.", "error");
      return;
    }

    try {
      const userId = localStorage.getItem("userId"); // Get user ID from localStorage
      const updatedUser = await updateUserProfile(userId, username, password); // Call the utility function

      // Optionally update localStorage with the new username
      localStorage.setItem("username", updatedUser.username);

      showNotification("Profil berhasil diperbarui!", "success");
      setTimeout(() => {
        navigate("/"); // Redirect after successful update
      }, 2000);
    } catch (error) {
      showNotification("Gagal memperbarui profil. Silakan coba lagi.", "error");
      console.error(error);
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Edit Profil</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Update Profile
        </button>
      </form>

      {/* Notification component to display success or error messages */}
      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          clearMessage={() => setNotification({ message: "", type: "" })}
        />
      )}
    </div>
  );
};

export default EditProfile;
