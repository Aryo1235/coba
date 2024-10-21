import { useState, useRef, useEffect } from "react";
import { getChat } from "../utils/ChatUtils";
import Navbar from "./Navbar";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import SidebarAi from "./SidebarAi";

const ChatBot = () => {
  const [data, setData] = useState([]); // State untuk menyimpan percakapan saat ini
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]); // State untuk menyimpan history chat
  const [sidebarOpen, setSidebarOpen] = useState(false); // State untuk mengontrol tampilan sidebar
  const [activeHistoryIndex, setActiveHistoryIndex] = useState(null); // Melacak index dari history yang sedang aktif
  const inputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      const aiResponse = await getChat(input);
      const newChat = [
        ...data,
        { type: "user", text: input },
        { type: "ai", text: aiResponse },
      ];

      setData(newChat);
      // Update percakapan pada history yang sedang aktif, jangan buat history baru
      if (activeHistoryIndex !== null) {
        const updatedHistory = [...history];
        updatedHistory[activeHistoryIndex] = newChat; // Update percakapan pada index aktif
        setHistory(updatedHistory); // Simpan history terbaru
      }

      setInput(""); // Bersihkan input setelah kirim pesan
      adjustTextareaHeight(); // Reset tinggi textarea
    }
  };

  const handleNewChat = () => {
    // Hanya tambahkan ke history jika ada percakapan sebelumnya
    // dan percakapan tidak berasal dari history yang sudah ada
    if (data.length > 0 && activeHistoryIndex === null) {
      setHistory([...history, data]); // Tambahkan percakapan saat ini ke dalam history
    }

    // Bersihkan percakapan untuk memulai sesi baru
    setData([]); // Kosongkan percakapan saat ini
    setInput(""); // Kosongkan input
    setActiveHistoryIndex(null); // Reset active history
  };

  // Fungsi untuk mendeteksi apakah balasan dari AI adalah kode
  const isCode = (text) => {
    return text.includes("```");
  };

  // Fungsi untuk mengatur tinggi textarea secara otomatis
  const adjustTextareaHeight = () => {
    const textarea = inputRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset height dulu
      textarea.style.height = `${Math.min(textarea.scrollHeight, 130)}px`; // Set tinggi maksimum hingga 130px
    }
  };

  useEffect(() => {
    adjustTextareaHeight(); // Jalankan ketika input berubah
  }, [input]);

  // Fungsi untuk memuat riwayat percakapan tertentu
  const loadChatFromHistory = (chat, index) => {
    // Simpan percakapan aktif saat ini ke history jika belum berasal dari history
    if (data.length > 0 && activeHistoryIndex === null) {
      setHistory([...history, data]);
    } else if (data.length > 0 && activeHistoryIndex !== null) {
      // Update percakapan di history jika sedang mengedit yang ada
      const updatedHistory = [...history];
      updatedHistory[activeHistoryIndex] = data;
      setHistory(updatedHistory);
    }

    // Setelah menyimpan, muat percakapan baru dari history
    setData(chat); // Muat percakapan dari riwayat
    setInput(""); // Kosongkan input
    setActiveHistoryIndex(index); // Simpan index percakapan yang sedang aktif
  };

  // Fungsi untuk toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 overflow-hidden">
        <Navbar showSearch={false} />

        <div className="flex flex-col-reverse w-full h-[89vh] mt-20 md:flex-row overflow-y-hidden">
          {/* Sidebar untuk menyimpan history */}
          <SidebarAi
            history={history}
            loadChatFromHistory={loadChatFromHistory}
            sidebarOpen={sidebarOpen}
            toggleSidebar={toggleSidebar}
          />

          {/* Chat Area */}
          <div className="bg-white w-full md:w-3/4 p-6 rounded-lg shadow-lg flex flex-col">
            <h1 className="text-4xl mb-4 text-center text-yellow-500">
              Groq ChatBot
            </h1>

            {/* Tombol "New Chat" */}
            <div className="flex justify-end mb-4">
              <button
                onClick={handleNewChat} // Panggil fungsi handleNewChat
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
              >
                New Chat
              </button>
            </div>

            {/* Chat Box */}
            <div className="flex-grow p-4 border border-gray-300 rounded-lg mb-4 overflow-y-auto max-h-[60vh]">
              {data.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  } mb-2`}
                >
                  <div
                    className={`max-w-xs md:max-w-2xl rounded-lg px-4 py-2 break-words ${
                      message.type === "user"
                        ? "bg-yellow-500 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    {message.type === "ai" && isCode(message.text) ? (
                      <SyntaxHighlighter language="swift">
                        {message.text.replace(/```/g, "")}
                      </SyntaxHighlighter>
                    ) : (
                      message.text.replace(/```/g, "")
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Input & Send Button */}
            <div className="flex flex-col justify-center items-center w-full">
              <form onSubmit={handleSubmit} className="w-full max-w-3xl">
                <textarea
                  ref={inputRef}
                  className="w-full border-2 border-gray-300 p-2 rounded-lg resize-none overflow-auto"
                  placeholder="Ketik disini"
                  value={input}
                  rows={1}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg mt-2 w-full"
                >
                  Kirim
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
