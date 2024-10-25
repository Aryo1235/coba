// Notification.js
import { useEffect } from "react";

const Notification = ({ message, type, clearMessage }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        clearMessage();
      }, 2500); // Notifikasi hilang otomatis dalam 3 detik
      return () => clearTimeout(timer);
    }
  }, [message, clearMessage]);

  if (!message) return null;

  return (
    <div
      className={`  px-4 py-2 rounded shadow-lg text-white ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {message}
    </div>
  );
};

export default Notification;
