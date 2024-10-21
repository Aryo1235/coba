import Genre from "../components/Genre";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";

function GenrePages() {
  const location = useLocation();
  const genreId = new URLSearchParams(location.search).get("id");
  const genreName = location.state?.genreName || "Unknown Genre"; // Ambil genreName dari state atau set default

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="lg:ml-[250px] w-full p-5">
          <Navbar genreId={genreId} genreName={genreName} showSearch={true} />
          {/* Pass genreId and genreName as props */}
          <Genre genreId={genreId} genreName={genreName} />
        </div>
      </div>
    </>
  );
}

export default GenrePages;
