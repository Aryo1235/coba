import { useState } from "react";
import { getPopularMovies, getTopRatedMovies, getUpcomingMovies } from "./api"; // Import API functions
import { GoogleGenerativeAI, HarmCategory } from "@google/generative-ai";
import ReactMarkdown from "react-markdown"; // Import react-markdown
import Navbar from "./Navbar";

function GeminiAi() {
  const [prompt, setPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!prompt.trim()) return; // Prevent submission if prompt is empty

    setLoading(true);
    setError(""); // Reset error before API call

    // Add user message to chat history
    setChatHistory((prevChatHistory) => [
      ...prevChatHistory,
      { role: "user", parts: [{ text: prompt }] },
    ]);

    try {
      const username = localStorage.getItem("username") || "Guest";
      const popularMovies = await getPopularMovies();
      const topRatedMovies = await getTopRatedMovies();
      const upcomingMovies = await getUpcomingMovies();

      const popularMoviesInfo = popularMovies.results
        .slice(0, 10)
        .map(
          (movie) =>
            `Title: ${movie.title}, Rating: ${movie.vote_average}, Sinopsis: ${movie.overview}, Popularitas: ${movie.popularity}, Tanggal Rilis: ${movie.release_date}`
        )
        .join("\n");

      const topRatedMoviesInfo = topRatedMovies.results
        .slice(0, 10)
        .map(
          (movie) =>
            `Title: ${movie.title}, Rating: ${movie.vote_average}, Sinopsis: ${movie.overview}, Popularitas: ${movie.popularity}, Tanggal Rilis: ${movie.release_date}`
        )
        .join("\n");

      const upcomingMoviesInfo = upcomingMovies.results
        .slice(0, 10)
        .map(
          (movie) =>
            `Title: ${movie.title}, Rating: ${movie.vote_average}, Sinopsis: ${movie.overview}, Popularitas: ${movie.popularity}, Tanggal Rilis: ${movie.release_date}`
        )
        .join("\n");

      const filmSpecificPrompt = `Anda adalah ChatBot AI FILMKU spesialisasi dalam film. Nama Pengguna: "${username}". Pertanyaan pengguna: "${prompt}". Berikut adalah beberapa film populer:\n${popularMoviesInfo}\nDan beberapa film dengan rating tinggi:\n${topRatedMoviesInfo}\nDan beberapa film yang akan datang atau sedang tayang:\n${upcomingMoviesInfo}`;

      const genAI = new GoogleGenerativeAI("YOUR_API_KEY"); // Replace with your API Key

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
      const chat = model.startChat({ history: chatHistory });
      const result = await chat.sendMessageStream(filmSpecificPrompt);

      let aiResponse = "";
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        aiResponse += chunkText;
      }
      if (aiResponse) {
        setChatHistory((prevChatHistory) => [
          ...prevChatHistory,
          { role: "model", parts: [{ text: aiResponse }] },
        ]);
      }

      setPrompt(""); // Reset prompt after streaming
    } catch (err) {
      console.error(err);
      setError("An error occurred while generating content.");
    } finally {
      setLoading(false); // Set loading to false after API call
    }
  };

  const handleRefresh = () => {
    setChatHistory([]); // Reset chat history
    setError(""); // Reset error
  };

  return (
    <>
      <Navbar showSearch={false} />
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-t from-slate-800 to-slate-900">
        <div className="bg-slate-900 bg-opacity-80 backdrop-blur-md rounded-lg shadow-lg p-6 w-full max-w-md">
          <h1 className="text-3xl font-bold mb-4 text-center text-yellow-400">
            ObrolFilm
          </h1>

          {/* Chat Window */}
          <div className="flex flex-col space-y-4 h-60 overflow-y-auto border border-gray-700 rounded-lg p-4 mb-4">
            {chatHistory.length === 0 && !loading ? (
              <p className="text-center text-gray-400">
                Silahkan kirim pertanyaan tentang film!
              </p>
            ) : (
              chatHistory.map((chat, index) => (
                <div key={index}>
                  {chat.role === "user" ? (
                    <div className="text-right mb-2">
                      <p className="bg-yellow-500 text-white p-2 rounded-lg inline-block max-w-full text-left break-words shadow-md">
                        {chat.parts[0].text}
                      </p>
                    </div>
                  ) : (
                    <div className="text-left">
                      <div className="bg-green-500 text-white p-2 rounded-lg inline-block shadow-md">
                        <ReactMarkdown>{chat.parts[0].text}</ReactMarkdown>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}

            {loading && (
              <div className="text-center text-gray-400">
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
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Tulis pertanyaan Anda"
              className="border border-gray-600 rounded-lg px-4 py-2 w-full bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className={`bg-yellow-500 text-white py-2 px-4 rounded-lg w-full hover:bg-yellow-600 transition-all duration-300 ease-in-out ${
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
    </>
  );
}

export default GeminiAi;
