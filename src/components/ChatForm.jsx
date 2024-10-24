function ChatForm({ prompt, setPrompt, handleSubmit, loading }) {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ketik Pesan Anda disni"
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
  );
}

export default ChatForm;
