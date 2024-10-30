import { useState } from "react";
import { deleteUser } from "./api";
import { useNavigate } from "react-router-dom";

const DeleteUser = ({ showNotification }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const userId = localStorage.getItem("userId");
      await deleteUser(userId);
      localStorage.removeItem("username");
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      localStorage.removeItem(`favorites_${userId}`);
      showNotification("User berhasil dihapus!", "success");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      showNotification("Gagal menghapus user. Silakan coba lagi.", "error");
      console.error(error);
    }
  };

  return (
    <div
      onClick={handleDelete}
      className="block px-4 py-3 mb-3 text-white hover:bg-yellow-500 rounded-md hover:text-gray-900 transition duration-300 cursor-pointer"
    >
      Hapus User
    </div>
  );
};

export default DeleteUser;
