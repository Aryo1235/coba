import ReactMarkdown from "react-markdown";

function ChatWindow({ chatHistory, loading }) {
  return (
    <div className="flex flex-col space-y-4 h-60 overflow-y-auto border border-gray-300 rounded-lg p-4 mb-4">
      {chatHistory.length === 0 && !loading ? (
        <p className="text-center text-gray-500">
          Silahkan Kirimkan Pesan Anda!!
        </p>
      ) : (
        chatHistory.map((chat, index) => (
          <div key={index}>
            <div className="text-right text-gray-700 whitespace-pre-wrap mb-2 break-words">
              <p className="bg-blue-100 p-2 rounded-lg inline-block max-w-full text-left break-words">
                {chat.userMessage}
              </p>
            </div>
            <div className="text-left text-gray-700 whitespace-pre-wrap">
              <div className="bg-green-100 p-2 rounded-lg inline-block">
                <ReactMarkdown>{chat.aiResponse}</ReactMarkdown>
              </div>
            </div>
          </div>
        ))
      )}
      {loading && (
        <div className="text-center text-gray-500">Generating response...</div>
      )}
    </div>
  );
}

export default ChatWindow;
