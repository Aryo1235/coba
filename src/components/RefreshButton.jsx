function RefreshButton({ handleRefresh }) {
  return (
    <button
      onClick={handleRefresh}
      className="bg-red-500 text-white py-2 px-4 rounded-lg w-full mt-4 hover:bg-red-600 transition-all duration-300 ease-in-out"
    >
      Refresh Chat
    </button>
  );
}

export default RefreshButton;
