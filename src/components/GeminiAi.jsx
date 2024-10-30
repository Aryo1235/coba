import { useState } from "react";
import { getPopularMovies, getTopRatedMovies, getUpcomingMovies } from "./api"; // Import fungsi API
import { GoogleGenerativeAI, HarmCategory } from "@google/generative-ai";
import ReactMarkdown from "react-markdown"; // Import react-markdown

function GeminiAi() {
  const [prompt, setPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState([
    // Contoh chat history yang sudah ada di file lama
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!prompt.trim()) return; // Cegah pengiriman jika prompt kosong

    setLoading(true);
    setError(""); // Reset error sebelum API call

    // Tambahkan pesan pengguna terlebih dahulu sebelum respons AI
    setChatHistory((prevChatHistory) => [
      ...prevChatHistory,
      { role: "user", parts: [{ text: prompt }] }, // Input user ditambahkan ke chat history
    ]);

    try {
      const username = localStorage.getItem("username");
      // Ambil data film dari API sesuai dengan kebutuhan
      const popularMovies = await getPopularMovies();
      const topRatedMovies = await getTopRatedMovies();
      const upcomingMovies = await getUpcomingMovies();

      // Format data film ke dalam string
      const popularMoviesInfo = popularMovies.results
        .slice(0, 10)
        .map(
          (movie) =>
            `Title: ${movie.title}, Rating: ${movie.vote_average} Sinopsis: ${movie.overview} Popularitas: ${movie.popularity} Tanggal Rilis:${movie.release_date}` // Tambahkan popularitas
        )
        .join("\n");

      const topRatedMoviesInfo = topRatedMovies.results
        .slice(0, 10)
        .map(
          (movie) =>
            `Title: ${movie.title}, Rating: ${movie.vote_average} Sinopsis: ${movie.overview} Popularitas: ${movie.popularity} Tanggal Rilis:${movie.release_date}` // Tambahkan popularitas
        )
        .join("\n");

      const upcomingMoviesInfo = upcomingMovies.results
        .slice(0, 10)
        .map(
          (movie) =>
            `Title: ${movie.title}, Rating: ${movie.vote_average} Sinopsis: ${movie.overview} Popularitas: ${movie.popularity} Tanggal Rilis:${movie.release_date}` // Tambahkan popularitas
        )
        .join("\n");

      const filmSpecificPrompt = `Anda adalah ChatBot AI FILMKU spesialisasi dalam film.Nama Pengguna:"${username}" Pertanyaan pengguna: "${prompt}". Berikut adalah beberapa film populer:\n${popularMoviesInfo}\nDan beberapa film dengan rating tinggi:\n${topRatedMoviesInfo} \nDan beberapa film yang akan datang atau sedang tayang:\n${upcomingMoviesInfo}`;

      const genAI = new GoogleGenerativeAI(
        "AIzaSyAAmeNonOeqDm27E0_modFLcqHOesCmce4"
      ); // Ganti dengan API Key Anda

      const model = genAI.getGenerativeModel({
        model: "gemini-pro",
        temperature: 0.7,
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          },
        ],
        maxOutputTokens: 200,
      });
      const chat = model.startChat({ history: chatHistory }); // Mulai chat dengan model AI
      const result = await chat.sendMessageStream(filmSpecificPrompt);

      // Gunakan for await...of untuk membaca chunk streaming
      let aiResponse = ""; // String untuk menyimpan respons yang diterima bertahap
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        aiResponse += chunkText; // Tambahkan teks dari chunk ke aiResponse
      }
      if (aiResponse) {
        // Tambahkan respons AI ke chat history setelah respons penuh
        setChatHistory((prevChatHistory) => [
          ...prevChatHistory,
          { role: "model", parts: [{ text: aiResponse }] }, // Respons AI
        ]);
      }

      setPrompt(""); // Reset prompt setelah streaming selesai
    } catch (err) {
      console.error(err);
      setError("An error occurred while generating content.");
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
      <div className="bg-gray-100 rounded-lg shadow-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-500">
          AI Baruchat
        </h1>

        {/* Chat Window */}
        <div className="flex flex-col space-y-4 h-60 overflow-y-auto border border-gray-300 rounded-lg p-4 mb-4">
          {chatHistory.length === 0 && !loading ? (
            <p className="text-center text-gray-500">
              Silahkan kirim pertanyaan tentang film!
            </p>
          ) : (
            chatHistory.map((chat, index) => (
              <div key={index}>
                {chat.role === "user" ? (
                  <div className="text-right text-gray-700 whitespace-pre-wrap mb-2 break-words">
                    <p className="bg-blue-200 p-2 rounded-lg inline-block max-w-full text-left break-words">
                      {chat.parts[0].text}
                    </p>
                  </div>
                ) : (
                  <div className="text-left text-gray-700 whitespace-pre-wrap">
                    <div className="bg-green-200 p-2 rounded-lg inline-block">
                      <ReactMarkdown>{chat.parts[0].text}</ReactMarkdown>
                    </div>
                  </div>
                )}
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
            placeholder="Tulis pertanyaan Anda"
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading} // Disable input saat loading
          />
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-500 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-600 transition-all duration-300 ease-in-out ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Generating..." : "Submit"}
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
