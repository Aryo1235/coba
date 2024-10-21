// ToggleButton.js
import React from "react";

const ToggleButton = ({ sidebarOpen, toggleSidebar }) => {
  return (
    <button
      className="md:hidden bg-yellow-500 text-white p-2 rounded-lg"
      onClick={toggleSidebar}
    >
      {sidebarOpen ? "Tutup Sidebar" : "Lihat Riwayat"}
    </button>
  );
};

export default ToggleButton;
