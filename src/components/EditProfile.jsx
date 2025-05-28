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
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900">
      <h1 className="text-2xl font-bold mb-4 text-yellow-500">Edit Profil</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 text-white p-8 rounded-2xl shadow-lg
        w-96 h-96 max-w-full flex flex-col justify-center
        transition-shadow duration-500 ease-in-out
      
        hover:shadow-yellow-500/60
        hover:shadow-[0_0_20px_5px_rgba(250,204,21,0.5)]"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium ">Username</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium ">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium ">Confirm Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-2 px-4 rounded-md mt-2 hover:bg-yellow-600"
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
