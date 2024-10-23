import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

function GeminiAi() {
  const [prompt, setPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState([]); // State untuk menyimpan history chat
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(""); // Reset error sebelum API call

    try {
      const genAI = new GoogleGenerativeAI(
        "AIzaSyAAmeNonOeqDm27E0_modFLcqHOesCmce4" // Gunakan API key yang benar
      );
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompt);

      // Debugging: Log full response
      console.log("Full API Response:", result);

      // Cek apakah respons adalah fungsi dan panggil text()
      if (result && typeof result.response.text === "function") {
        const aiResponse = result.response.text(); // Ambil teks dari fungsi
        console.log("AI Response Text:", aiResponse); // Debug: Lihat teks dari AI

        // Update chatHistory dengan pesan baru dari pengguna dan balasan AI
        setChatHistory((prevChatHistory) => [
          ...prevChatHistory,
          { userMessage: prompt, aiResponse }, // Tambahkan pesan dan balasan AI ke history
        ]);
        setPrompt(""); // Kosongkan input setelah submit
      } else {
        setError("No valid response received");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while generating content."); // Set error message
    } finally {
      setLoading(false); // Set loading ke false setelah API call
    }
  };

  const handleRefresh = () => {
    setChatHistory([]); // Reset chat history
    setError(""); // Reset error
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-yellow-500">
          Gemini AI Chat
        </h1>

        {/* Chat Window */}
        <div className="flex flex-col space-y-4 h-60 overflow-y-auto border border-gray-300 rounded-lg p-4 mb-4">
          {chatHistory.length === 0 && !loading ? (
            <p className="text-center text-gray-500">No messages yet.</p>
          ) : (
            chatHistory.map((chat, index) => (
              <div key={index}>
                <div className="text-right text-gray-700 whitespace-pre-wrap mb-2">
                  <p className="bg-blue-100 p-2 rounded-lg inline-block">
                    {chat.userMessage}
                  </p>
                </div>
                <div className="text-left text-gray-700 whitespace-pre-wrap">
                  <p className="bg-green-100 p-2 rounded-lg inline-block">
                    {chat.aiResponse}
                  </p>
                </div>
              </div>
            ))
          )}

          {loading && (
            <div className="text-center text-gray-500">
              Generating response...
            </div>
          )}
        </div>

        {/* Error Display */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Form for Input */}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)} // Update prompt saat mengetik
            placeholder="Enter your prompt here"
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <button
            type="submit"
            disabled={loading}
            className={`bg-yellow-500 text-white py-2 px-4 rounded-lg w-full hover:bg-yellow-600 transition-all duration-300 ease-in-out ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </form>

        {/* Refresh Button */}
        <button
          onClick={handleRefresh}
          className="bg-red-500 text-white py-2 px-4 rounded-lg w-full mt-4 hover:bg-red-600 transition-all duration-300 ease-in-out"
        >
          Refresh Chat
        </button>
      </div>
    </div>
  );
}

export default GeminiAi;
