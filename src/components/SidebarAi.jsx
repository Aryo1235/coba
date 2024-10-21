import React from "react";

const SidebarAi = ({
  history,
  loadChatFromHistory,
  sidebarOpen,
  toggleSidebar,
}) => {
  console.log("History dalam SidebarAi:", history);
  return (
    <>
      {/* Tombol untuk membuka/tutup sidebar (tampil hanya di mobile) */}
      <button
        className="md:hidden absolute top-4 left-4 bg-yellow-500 text-white p-2 mt-20  rounded-lg"
        onClick={toggleSidebar}
      >
        {sidebarOpen ? "Tutup Sidebar" : "Lihat Riwayat"}
      </button>

      <div
        className={`fixed inset-y-0 left-0 mt-20 lg:mt-0 bg-gray-800 text-white p-4 overflow-y-auto md:w-1/4 transition-transform transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:static md:translate-x-0 md:max-h-full`}
      >
        <h2 className="text-2xl mb-4">Riwayat Chat</h2>
        {history.length === 0 ? (
          <p className="text-gray-400">Belum ada riwayat percakapan.</p>
        ) : (
          history.map((session, index) => (
            <div
              key={index}
              className="mb-4 p-2 border border-yellow-500 rounded-lg cursor-pointer"
              onClick={() => loadChatFromHistory(session, index)} // Kirim juga index riwayat yang dipilih
            >
              {/* Batasi panjang teks dengan elipsis jika lebih dari 50 karakter */}
              <p>
                {session[0]?.text.length > 50
                  ? `${session[0]?.text.substring(0, 40)}...`
                  : session[0]?.text}
              </p>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default SidebarAi;
