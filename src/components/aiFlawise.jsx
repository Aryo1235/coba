import { useState } from "react";

function AiQueryComponent() {
  const [question, setQuestion] = useState(""); // Untuk menyimpan pertanyaan
  const [response, setResponse] = useState(""); // Untuk menyimpan jawaban dari AI
  const [loading, setLoading] = useState(false); // Menangani loader

  // Fungsi untuk memanggil API
  const query = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/prediction/60c54684-eebb-4e6f-9e81-b020c8e35e27",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      // Cek apakah respons berhasil
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Result from API:", result); // Log hasil dari API
      setResponse(result.text || ""); // Sesuaikan dengan struktur respons yang benar
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setResponse("Error getting response from AI."); // Menangani error
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk meng-handle submit form
  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah reload halaman
    query({ question });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Ask AI</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
      >
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question"
          required
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 font-semibold rounded-md ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white transition duration-200`}
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
      <div className="mt-6 w-full max-w-md">
        <h2 className="text-xl font-semibold">AI Response:</h2>
        <p className="mt-2 p-4 bg-gray-50 border border-gray-200 rounded-md">
          {response}
        </p>
      </div>
    </div>
  );
}

export default AiQueryComponent;
